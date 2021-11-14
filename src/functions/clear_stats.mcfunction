scoreboard objectives remove deathcount
scoreboard objectives remove murdercount

scoreboard objectives remove is_moving
scoreboard objectives remove playtime_timer
scoreboard objectives remove afk_timer
scoreboard objectives remove playtime_award_m
scoreboard objectives remove playtime_award_b

scoreboard objectives remove is_afk
scoreboard objectives remove playtime_minutes
scoreboard objectives remove afk_minutes

scoreboard objectives remove hostiles_killed
scoreboard objectives remove peaceful_killed
scoreboard objectives remove blocks_broken 
scoreboard objectives remove blocks_placed 


scoreboard objectives add deathcount dummy Deaths
scoreboard objectives add murdercount dummy Murders

scoreboard objectives add is_moving dummy is_moving
scoreboard objectives add playtime_timer dummy playtime_timer
scoreboard objectives add afk_timer dummy afk_timer
scoreboard objectives add playtime_award_m dummy "Playtime Award Minutes"
scoreboard objectives add playtime_award_b dummy "Playtime Award Balance"

scoreboard objectives add is_afk dummy "Is AFK"
scoreboard objectives add playtime_minutes dummy "Active Time"
scoreboard objectives add afk_minutes dummy "AFK Time"

scoreboard objectives add hostiles_killed dummy "Hostile Mobs Killed"
scoreboard objectives add peaceful_killed dummy "Peaceful Mobs Killed"
scoreboard objectives add blocks_broken dummy "Blocks Broken"
scoreboard objectives add blocks_placed dummy "Blocks Placed"
