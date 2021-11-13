scoreboard players reset @s afk_timer
scoreboard players set @s is_afk 0

scoreboard objectives add playtime_minutes dummy "Active Time"
scoreboard objectives add playtime_timer dummy playtime_timer
scoreboard objectives add playtime_award_minutes dummy "Playtime Award Min"

scoreboard players add @s playtime_timer 1

execute @s[scores={playtime_timer=720}] ~~~ scoreboard players add @s playtime_award_minutes 1
execute @s[scores={playtime_award_minutes=30}] ~~~ give @s minecraft:diamond 1
execute @s[scores={playtime_award_minutes=30}] ~~~ scoreboard players set @s playtime_award_minutes 0

execute @s[scores={playtime_timer=720}] ~~~ scoreboard players add @s playtime_minutes 1
execute @s[scores={playtime_timer=720}] ~~~ scoreboard players set @s playtime_timer 0