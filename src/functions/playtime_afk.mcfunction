scoreboard objectives add afk_minutes dummy "AFK Time"
scoreboard objectives add afk_timer dummy afk_timer
scoreboard objectives add is_afk dummy "Is AFK"

scoreboard players add @s afk_timer 1

execute @s[scores={afk_timer=4320}] ~~~ scoreboard players set @s is_afk 1
execute @s[scores={afk_timer=4320}] ~~~ scoreboard players add @s afk_minutes 1
execute @s[scores={afk_timer=4320}] ~~~ scoreboard players set @s afk_timer 3600

execute @s[scores={is_afk=0}] ~~~ scoreboard players add @s playtime_timer 1
execute @s[scores={playtime_timer=720}] ~~~ scoreboard players add @s playtime_minutes 1
execute @s[scores={playtime_timer=720}] ~~~ scoreboard players set @s playtime_timer 0