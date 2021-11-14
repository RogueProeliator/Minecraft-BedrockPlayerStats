summon armor_stand ~ ~ ~ a scoreapi_save
tag @e[name=scoreapi_save,c=1] add scoreapi_save
execute @e[tag=scoreapi_save,c=1] ~ ~ ~ function pos_save_x_pvt
scoreboard players operation @s position_x = @e[tag=scoreapi_save,c=1] position_x
tp @e[tag=scoreapi_save,c=1] ~ -100 ~
kill @e[tag=scoreapi_save,c=1]