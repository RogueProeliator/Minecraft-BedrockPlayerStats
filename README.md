# Bedrock Player Statistics Add-On
This Minecraft Bedrock behavior pack add-on allows you to track and act upon various statistics for players in your Minecraft world. Tracked statistics are stored in standard Minecraft scoreboards, while transient statistics - such as the coordinates of a players death - are written to the chat log.

# Tracked Statistics
## Transient Data
These data points are written to the chat log but not stored by the system for later retrieval.

### Death Coordinates
When a player dies, his/her coordinates are written to the chat log ... making it easier to retrieve your stuff, get help from your fellow players in retrieving your stuff, or maybe helping your father find his way back to where he was!

## Scoreboard Statistics
These data points are written to Minecraft scoreboards which are stored with the world, allowing for long-term statistics tracking.

### Deaths
**Scoreboard:** *deathcount*
Tracks the total number of deaths for each person (includes all death types/manners)

### Murders
**Scoreboard:** *murdercount*
Tracks the total number of PvP kills by each player

### Is AFK
**Scoreboard:** *is_afk*
**Configuration:** *globalVars.afkStartMins*
Tracks whether or not the player is currently Away From Keyboard; this is determined by the player's movement, or lack thereof. The amount of time that the player must be still before being registered as AFK is configurable.

### Playtime Minutes
**Scoreboard:** *playtime_minutes*
Tracks the total number of non-AFK minutes played by each player.

### AFK Minutes
**Scoreboard:** *afk_minutes*
Tracks the total number of AFK minutes (as defined by the Is AFK tracking above) by each player.

### Hostile Mobs Killed
**Scoreboard:** *hostiles_killed*
Tracks the number of hostile mobs killed; the list of mobs considered hostile may be found in the source file (search for *createHostileMobArray*).

### Peaceful Mobs Killed
**Scoreboard:** *peaceful_killed*
Tracks the number of peaceful mobs killed, which are classified as all mobs NOT included in the hostile mob list above.

### Blocks Broken
**Scoreboard:** *blocks_broken*
Tracks the total number of blocks that are manually broken by the player in survival mode.

### Blocks Placed
**Scoreboard:** *blocks_placed*
Tracks the total number of blocks that are manually placed (in survival or creative mode); note that blocks placed via commands are not included in the count.

# Installation
## Single Player (or LAN Multi-Player) Worlds
If you are playing in a single player world or hosting a server simply by opening your existing world to others, installation is super easy! Simply double-click the .mcaddon file and it will be loaded and installed by Minecraft. Once installed, click Edit on your world, scroll down to Behavior Packs and enable the Bedrock Player Stats pack.  That's it!

## Bedrock Dedicated Server
If you are hosting your world by using the Bedrock Dedicated Server (BDS), the installation is a bit more manual:
1. 

## Configuring Your World
This pack utilizes the advanced modding capabilities coming to Bedrock and which are currently gated behind the "Experimental Features" flag in the game. In order to enable the pack, open your world properties and turn on *Additional Modding Capabilities* under the *Experiments* heading.

**!Important Note!** Enabling experimental features will turn off achievements in your world and you will not be able to re-enable them!