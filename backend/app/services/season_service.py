import requests, json
from fastapi import HTTPException
from services.redis_cache import get_cache, set_cache
import os

ACCESS_TOKEN = os.getenv("ACCESS_TOKEN")

async def get_season_data(year: int):
    cache_key = f"season:{year}"
    cached_data = await get_cache(cache_key)
    
    if cached_data:
        return json.loads(cached_data)
    
    headers = {'Authorization': f'Bearer {ACCESS_TOKEN}'}
    query_params = {'season': year}

    response = requests.get(
        'https://wire.telemetry.fm/ncaa/schedules/by-season/', params=query_params, headers=headers
    )

    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    
    data = response.json()
    
    await set_cache(cache_key, json.dumps(data))
    return data

async def pre_cache_seasons():
    for year in range(2018, 2025):
        await get_season_data(year)
