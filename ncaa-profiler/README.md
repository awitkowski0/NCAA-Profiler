# NCAA Profiling

## Project Information

### Running the project

1) Build docker-image

    
        docker build -t ncaa/prod .

2) Run docker-image
   
         docker run --env-file .env -p 89:89 ncaa/prod

3) Visit site via:
    
        http://localhost:89

### MVP

- Save & Load User Login/Logout

- Call APIs for Player, Game, Play, Team Information

- Display previous said data in a dataframe

- Save & Load Notes on ID's (Games, Players, Teams)

### If I have enough time

1) Recently viewed Game, Player, Team Card
   
2) Add a search bar to search by Game Name, Player Name, Team Name

This will let you search by names, will need a custom API call of some sort that takes given data and saves it

## Notes

Found API endpoints for games, players, teams, and plays.

#### Player Lookup

https://wire.telemetry.fm/ncaa/players/?player_id=LEV77487

#### Game Lookup

https://wire.telemetry.fm/ncaa/plays/?game-id=23596

#### Team Lookup

https://wire.telemetry.fm/ncaa/teams/?team_id=kansas-st

#### Season Lookup

https://wire.telemetry.fm/ncaa/schedules/by-season/?season=2024