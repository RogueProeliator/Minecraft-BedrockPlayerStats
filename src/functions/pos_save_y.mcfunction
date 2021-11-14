summon armor_stand ~ ~ ~ a scoreapi_save
tag @e[name=scoreapi_save,c=1] add scoreapi_save
execute @e[tag=scoreapi_save,c=1] ~ ~ ~ function pos_save_y_pvt
scoreboard players operation @s position_y = @e[tag=scoreapi_save,c=1] position_y
tp @e[tag=scoreapi_save,c=1] ~ -100 ~
kill @e[tag=scoreapi_save,c=1]