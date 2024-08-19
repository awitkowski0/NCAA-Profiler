import requests, json
from fastapi import HTTPException
from services.redis_cache import get_cache, set_cache
import os

ACCESS_TOKEN = os.getenv("ACCESS_TOKEN")

async def get_team_data(team_id: str):
    cache_key = f"team:{team_id}"
    cached_data = await get_cache(cache_key)
    
    if cached_data:
        return json.loads(cached_data)
    
    headers = {'Authorization': f'Bearer {ACCESS_TOKEN}'}
    query_params = {'team_id': team_id}

    response = requests.get(
        'https://wire.telemetry.fm/ncaa/teams/', params=query_params, headers=headers
    )

    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    
    data = response.json()
    
    await set_cache(cache_key, json.dumps(data))
    return data
