import asyncio
import aioredis
import os
import logging
from aioredis.exceptions import BusyLoadingError
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

REDIS_URL = os.getenv("REDIS_URL", "redis://redis:6379")

# Initialize Redis
redis = aioredis.from_url(REDIS_URL, decode_responses=True)

async def get_cache(key: str, retries: int = 5, delay: int = 2):
    for attempt in range(retries):
        try:
            value = await redis.get(key)
            if value:
                return value
            break  # Exit the loop if the value is successfully retrieved
        except BusyLoadingError as e:
            if attempt < retries - 1:
                logger.warning(f"Redis is busy loading the dataset. Retrying in {delay} seconds... (Attempt {attempt + 1}/{retries})")
                await asyncio.sleep(delay)
            else:
                logger.error(f"Failed to retrieve {key} from cache after {retries} attempts: {e}")
                raise
        except Exception as e:
            logger.error(f"An unexpected error occurred while retrieving {key} from cache: {e}")
            raise

    return None

#Default to expire data in 5 years
async def set_cache(key: str, value: str, expiry: int = 157784760):
    try:
        await redis.set(key, value, expiry)
    except Exception as e:
        logger.error(f"Failed to set {key} in cache: {str(e)}")
        raise


async def clear_all_cache():
    await redis.flushdb()