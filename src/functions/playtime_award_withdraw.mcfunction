execute @s[scores={playtime_award_b=0}] ~~~ msg @s "You do not have any award balance remaining"

execute @s[scores={playtime_award_b=1..}] ~~~ give @s minecraft:diamond 1
execute @s[scores={playtime_award_b=1..}] ~~~ scoreboard players remove @s playtime_award_b 1

tellraw @s {"rawtext":[{"text":"Your award balance is "},{"score":{"name":"*","objective":"playtime_award_b"}},{"text":" diamonds"}]}
