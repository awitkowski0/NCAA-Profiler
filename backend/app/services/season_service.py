from io import BytesIO
import logging
import requests, json
from models.season import SeasonElement, season_to_dict, season_from_dict
from models.game import GameElement, game_from_dict, game_to_dict
from fastapi import HTTPException
from services.redis_cache import get_cache, set_cache, clear_all_cache
import os
from typing import List


ACCESS_TOKEN = os.getenv("ACCESS_TOKEN")

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

import json
import requests
from io import BytesIO

async def get_team_data(team_id: str):
    cache_key = f"team:{team_id}"
    cached_data = await get_cache(cache_key)
    
    if cached_data and cached_data != None:
        try:
            return json.loads(cached_data)
        except json.JSONDecodeError as json_exc:
            logger.warning(f"JSONDecodeError while decoding cached data for team ID: {team_id}. Proceeding to fetch fresh data.")
    
    headers = {'Authorization': f'Bearer {ACCESS_TOKEN}'}
    query_params = {'team_id': team_id}
    stream = BytesIO()
    chunk_size = 1024 * 5  # 5KB

    try:
        with requests.get(
            'https://wire.telemetry.fm/ncaa/teams/', 
            params=query_params, 
            headers=headers, 
            stream=True
        ) as response:
            if response.status_code != 200:
                raise HTTPException(status_code=response.status_code, detail=response.text)

            for chunk in response.iter_content(chunk_size=chunk_size):
                stream.write(chunk)

        stream.seek(0)
        data = json.load(stream)
        await set_cache(cache_key, json.dumps(data))
        return data

    except requests.exceptions.RequestException as req_exc:
        logger.error(f"RequestException: {req_exc}")
        raise HTTPException(status_code=500, detail=str(req_exc))
    except json.JSONDecodeError as json_exc:
        logger.error(f"JSONDecodeError: {json_exc}\nFailed content: {stream.getvalue()[:100]}...")
        raise HTTPException(status_code=500, detail=str(json_exc))
    except Exception as exc:
        logger.error(f"Unexpected error: {exc}")
        raise HTTPException(status_code=500, detail=str(exc))

async def get_game_data(game_id: str):
    cache_key = f"game:{game_id}"
    
    # Check for cached data
    cached_data = await get_cache(cache_key)

    if cached_data and cached_data != None:
        try:
            return json.loads(cached_data)
        except json.JSONDecodeError as json_exc:
            logger.warning(f"JSONDecodeError while decoding cached data for team ID: {game_id}. Proceeding to fetch fresh data.")
    
    # If cache miss, fetch data from the API
    headers = {'Authorization': f'Bearer {ACCESS_TOKEN}'}
    query_params = {'game_id': game_id}
    stream = BytesIO()
    chunk_size = 1024 * 5  # 5KB
    
    with requests.get(
        'https://wire.telemetry.fm/ncaa/plays/game-id', 
        params=query_params, 
        headers=headers, 
        stream=True
    ) as response:
        for chunk in response.iter_content(chunk_size=chunk_size):
            stream.write(chunk)
    
    stream.seek(0)
    data = json.load(stream)
    
    # Cache the data as a JSON string
    await set_cache(cache_key, str(data))
    
    return data


async def get_player_data(player_id: str):
    cache_key = f"player:{player_id}"
    cached_data = await get_cache(cache_key)
    
    if cached_data:
        return json.loads(cached_data)
    
    headers = {'Authorization': f'Bearer {ACCESS_TOKEN}'}
    query_params = {'player_id': player_id}

    response = requests.get('https://wire.telemetry.fm/ncaa/players/', params=query_params, headers=headers)
    if response.status_code != 200:
        raise HTTPException(status_code=response.status_code, detail=response.text)
    
    player_data = response.json()
    await set_cache(cache_key, json.dumps(player_data))
    return player_data

async def get_season_data(year: int) -> List[SeasonElement]:
    cache_key = f"season:{year}"
    cached_data = await get_cache(cache_key)
    
    if cached_data:
        season_data = season_from_dict(json.loads(cached_data))
    else:
        headers = {'Authorization': f'Bearer {ACCESS_TOKEN}'}
        query_params = {'season': year}
        response = requests.get('https://wire.telemetry.fm/ncaa/schedules/by-season/', params=query_params, headers=headers)
        
        if response.status_code != 200:
            raise HTTPException(status_code=response.status_code, detail=response.text)
        
        season_data = season_from_dict(response.json())
        await set_cache(cache_key, json.dumps(season_to_dict(season_data)), 86400 if year == 2024 else None)  # Cache with conditional duration for day data in 2024, if games are being updated

    # Fetch and embed team details within each game
    for team in season_data:
        team.details = await get_team_data(team.team)

        for game in team.games:
            game.home_team_details = await get_team_data(game.home_team)
            game.visitor_team_details = await get_team_data(game.visitor_team)

    return season_data

async def pre_cache_seasons():
    #await clear_all_cache()
    for year in range(2018, 2025):
        await get_season_data(year)