import aioredis
import os
import logging
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

REDIS_URL = os.getenv("REDIS_URL", "redis://redis:6379")

# Initialize Redis
redis = aioredis.from_url(REDIS_URL, decode_responses=True)

async def get_cache(key: str):
    try:
        value = await redis.get(key)
        logger.info(f"Retrieved from cache: {key}")
        return value
    except Exception as e:
        logger.error(f"Failed to retrieve {key} from cache: {str(e)}")
        raise

async def set_cache(key: str, value: str):
    try:
        await redis.set(key, value)
        logger.info(f"Set cache: {key}")
    except Exception as e:
        logger.error(f"Failed to set {key} in cache: {str(e)}")
        raise
