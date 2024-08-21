# NCAA Profiling

## Project Information

### Running the project

1) Create your .env file

    
        nano .env

2) Run docker-compose
   
        docker compose --env-file .env up --build

3) Visit site via:
    
        http://localhost:8080

### MVP

- ~~Save & Load User Login/Logout~~

- ~~Front-End for Login/Logout~~

- ~~Call APIs for Player, Game, Play, Team Information~~

- ~~Display previous said data in a dataframe~~

- ~~Save & Load Notes on ID's (Games, Players, Teams)~~

### If I have enough time

1) Recently viewed Game, Player, Team Card
   
2) Add a search bar to search by Game Name, Player Name, Team Name


## Notes

Found API endpoints for games, players, teams, and plays.

#### Game Lookup

https://wire.telemetry.fm/ncaa/plays/?game-id=23596

#### Team Lookup

https://wire.telemetry.fm/ncaa/teams/?team_id=kansas-st

#### Season Lookup

https://wire.telemetry.fm/ncaa/schedules/by-season/?season=2024