scoreboard players operation @s temp = @s cur_level

execute @s[scores={temp=24791..}] ~ ~ ~ xp 24791L @s
scoreboard players remove @s[scores={temp=24791..}] temp 24791

execute @s[scores={temp=16384..}] ~ ~ ~ xp 16384L @s
scoreboard players remove @s[scores={temp=16384..}] temp 16384

execute @s[scores={temp=8192..}] ~ ~ ~ xp 8192L @s
scoreboard players remove @s[scores={temp=8192..}] temp 8192

execute @s[scores={temp=4096..}] ~ ~ ~ xp 4096L @s
scoreboard players remove @s[scores={temp=4096..}] temp 4096

execute @s[scores={temp=2048..}] ~ ~ ~ xp 2048L @s
scoreboard players remove @s[scores={temp=2048..}] temp 2048

execute @s[scores={temp=1024..}] ~ ~ ~ xp 1024L @s
scoreboard players remove @s[scores={temp=1024..}] temp 1024

execute @s[scores={temp=512..}] ~ ~ ~ xp 512L @s
scoreboard players remove @s[scores={temp=512..}] temp 512

execute @s[scores={temp=256..}] ~ ~ ~ xp 256L @s
scoreboard players remove @s[scores={temp=256..}] temp 256

execute @s[scores={temp=128..}] ~ ~ ~ xp 128L @s
scoreboard players remove @s[scores={temp=128..}] temp 128

execute @s[scores={temp=64..}] ~ ~ ~ xp 64L @s
scoreboard players remove @s[scores={temp=64..}] temp 64

execute @s[scores={temp=32..}] ~ ~ ~ xp 32L @s
scoreboard players remove @s[scores={temp=32..}] temp 32

execute @s[scores={temp=16..}] ~ ~ ~ xp 16L @s
scoreboard players remove @s[scores={temp=16..}] temp 16

execute @s[scores={temp=8..}] ~ ~ ~ xp 8L @s
scoreboard players remove @s[scores={temp=8..}] temp 8

execute @s[scores={temp=4..}] ~ ~ ~ xp 4L @s
scoreboard players remove @s[scores={temp=4..}] temp 4

execute @s[scores={temp=2..}] ~ ~ ~ xp 2L @s
scoreboard players remove @s[scores={temp=2..}] temp 2

execute @s[scores={temp=1..}] ~ ~ ~ xp 1L @s
scoreboard players remove @s[scores={temp=1..}] temp 1

# Negative

execute @s[scores={temp=..-24791}] ~ ~ ~ xp -24791L @s
scoreboard players add @s[scores={temp=..-24791}] temp 24791

execute @s[scores={temp=..-16384}] ~ ~ ~ xp -16384L @s
scoreboard players add @s[scores={temp=..-16384}] temp 16384

execute @s[scores={temp=..-8192}] ~ ~ ~ xp -8192L @s
scoreboard players add @s[scores={temp=..-8192}] temp 8192

execute @s[scores={temp=..-4096}] ~ ~ ~ xp -4096L @s
scoreboard players add @s[scores={temp=..-4096}] temp 4096

execute @s[scores={temp=..-2048}] ~ ~ ~ xp -2048L @s
scoreboard players add @s[scores={temp=..-2048}] temp 2048

execute @s[scores={temp=..-1024}] ~ ~ ~ xp -1024L @s
scoreboard players add @s[scores={temp=..-1024}] temp 1024

execute @s[scores={temp=..-512}] ~ ~ ~ xp -512L @s
scoreboard players add @s[scores={temp=..-512}] temp 512

execute @s[scores={temp=..-256}] ~ ~ ~ xp -256L @s
scoreboard players add @s[scores={temp=..-256}] temp 256

execute @s[scores={temp=..-128}] ~ ~ ~ xp -128L @s
scoreboard players add @s[scores={temp=..-128}] temp 128

execute @s[scores={temp=..-64}] ~ ~ ~ xp -64L @s
scoreboard players add @s[scores={temp=..-64}] temp 64

execute @s[scores={temp=..-32}] ~ ~ ~ xp -32L @s
scoreboard players add @s[scores={temp=..-32}] temp 32

execute @s[scores={temp=..-16}] ~ ~ ~ xp -16L @s
scoreboard players add @s[scores={temp=..-16}] temp 16

execute @s[scores={temp=..-8}] ~ ~ ~ xp -8L @s
scoreboard players add @s[scores={temp=..-8}] temp 8

execute @s[scores={temp=..-4}] ~ ~ ~ xp -4L @s
scoreboard players add @s[scores={temp=..-4}] temp 4

execute @s[scores={temp=..-2}] ~ ~ ~ xp -2L @s
scoreboard players add @s[scores={temp=..-2}] temp 2

execute @s[scores={temp=..-1}] ~ ~ ~ xp -1L @s
scoreboard players add @s[scores={temp=..-1}] temp 1

stopsound @s random.levelup