execute @s[scores={is_moving=1}] ~~~ scoreboard players reset @s afk_timer
execute @s[scores={is_moving=1}] ~~~ scoreboard players set @s is_afk 0

execute @s[scores={is_afk=0}] ~~~ scoreboard players add @s playtime_timer 1
execute @s[scores={is_moving=0}] ~~~ scoreboard players add @s afk_timer 1

execute @s[scores={playtime_timer=60}] ~~~ scoreboard players add @s playtime_award_m 1
execute @s[scores={playtime_award_m=30}] ~~~ scoreboard players add @s playtime_award_b 1
execute @s[scores={playtime_award_m=30}] ~~~ msg @s "You have been awarded a diamond for playtime; retrieve via the ATM at spawn"
execute @s[scores={playtime_award_m=30}] ~~~ scoreboard players set @s playtime_award_m 0

execute @s[scores={playtime_timer=60}] ~~~ scoreboard players add @s playtime_minutes 1
execute @s[scores={playtime_timer=60}] ~~~ scoreboard players set @s playtime_timer 0

execute @s[scores={afk_timer=300}] ~~~ scoreboard players set @s is_afk 1
execute @s[scores={afk_timer=360}] ~~~ scoreboard players add @s afk_minutes 1
execute @s[scores={afk_timer=360}] ~~~ scoreboard players set @s afk_timer 300