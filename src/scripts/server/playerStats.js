const system   = server.registerSystem(0, 0);
let globalVars = {};

//=====================================================================================
// Configuration Options
//=====================================================================================
globalVars.afkStartMins     = 5;
globalVars.playTimeAwardMin = 30;
globalVars.playTimeAwardId  = "minecraft:diamond";


//=====================================================================================
// Global Variables
//=====================================================================================
globalVars.tickNumber       = 0;
globalVars.hostileMobs      = createHostileMobArray();
globalVars.playersQuery     = null;


//=====================================================================================
// Server Initialization
//=====================================================================================
// the system will call this routine in order to initialize the script -- this is called prior
// to the world being ready and players joining
system.initialize = function() {
    this.listenForEvent("minecraft:entity_move"           , (eventData) => this.onEntityMoved(eventData));
    this.listenForEvent("minecraft:player_placed_block"   , (eventData) => this.onPlayerPlacedBlock(eventData));
    this.listenForEvent("minecraft:player_destroyed_block", (eventData) => this.onPlayerDestroyedBlock(eventData));
    this.listenForEvent("minecraft:entity_death"          , (eventData) => this.onEntityDeath(eventData));

    globalVars.playersQuery = this.registerQuery();
    this.addFilterToQuery(globalVars.playersQuery, "rogueproeliator:playerStats");

    this.registerComponent("rogueproeliator:playerStats", 
        { 
                blocksBroken      : 0
              , blocksPlaced      : 0
              , hostileMobsKilled : 0
              , gentleMobsKilled  : 0
              , lastMovement      : Date()
              , lastPlayTimeAward : Date()
              , initialized       : false
        });
};


//=====================================================================================
// Server Event Handlers
//=====================================================================================
// this update routine is called once per tick of game time in order to allow ad-hoc
// plugin execution that does not correspond to an event
system.update = function() {
    globalVars.tickNumber++;

    // update the players statistics from their player stats component every
    // 20 seconds to avoid overloading the system with updates
    if (globalVars.tickNumber === 720) {
        let onlinePlayers = this.getEntitiesFromQuery(globalVars.playersQuery);
        let playerCount   = onlinePlayers.length;

        for (let index = 0; index < playerCount; ++index) {
            let player      = onlinePlayers[index];
            let playerName  = this.getComponent(player, "minecraft:nameable").data.name;
            let playerStats = this.getPlayerStats(player);

            // update all of the temporary stats that we have saved in the player stats component
            if (playerStats.data.blocksBroken > 0) {
                this.executeCommand(`/scoreboard players add ${playerName} blocks_broken ${playerStats.data.blocksBroken}`, (commandData) => this.commandCallback(commandData));
                playerStats.data.blocksBroken = 0;
            }

            if (playerStats.data.blocksPlaced > 0) {
                this.executeCommand(`/scoreboard players add ${playerName} blocks_placed ${playerStats.data.blocksPlaced}`, (commandData) => this.commandCallback(commandData));
                playerStats.data.blocksPlaced = 0;
            }

            if (playerStats.data.hostileMobsKilled > 0) {
                this.executeCommand(`/scoreboard players add ${playerName} hostiles_killed ${playerStats.data.hostileMobsKilled}`, (commandData) => this.commandCallback(commandData));
                playerStats.data.hostileMobsKilled = 0;
            }

            if (playerStats.data.gentleMobsKilled > 0) {
                this.executeCommand(`/scoreboard players add ${playerName} peaceful_killed ${playerStats.data.gentleMobsKilled}`, (commandData) => this.commandCallback(commandData));
                playerStats.data.gentleMobsKilled = 0;
            }
            
            // update the playtime statistics for the player
            let isAFK = Math.floor(Math.abs(Date() - playerStats.data.lastMovement) / 60000) >= globalVars.afkStartMins;

            let afkScoreboardVal = isAFK ? 1 : 0;
            this.executeCommand(`/scoreboard players set ${playerName} is_afk ${afkScoreboardVal}`, (commandData) => this.commandCallback(commandData));

            let timeUpdateScoreboard = isAFK ? "afk_minutes" : "playtime_minutes";
            this.executeCommand(`/scoreboard players add ${playerName} ${timeUpdateScoreboard} 1`);

            let awardPlaytimeBonus = Math.floor(Math.abs(Date() - playerStats.data.lastPlayTimeAward) / 60000) >= globalVars.playTimeAwardMin;
            if (awardPlaytimeBonus) {
                this.executeCommand(`/give ${playerName} ${globalVars.playTimeAwardId} 1`);
                playerStats.data.lastPlayTimeAward = Date();
            }       

            // save the updates to the stats back to the player/component
            this.applyComponentChanges(player, playerStats);
        }

        globalVars.tickNumber = 0;
    }   
}

// this handler fires whenever an entity has moved within the world... if this is a
// player then we may update his/her stats (for AFK and time played calculations)
system.onEntityMoved = function(eventData) {
    if (eventData.data.entity.__identifier__ == "minecraft:player") {
        let playerStats = this.getPlayerStats(eventData.data.entity);
        playerStats.data.lastMovement = Date();
        this.applyComponentChanges(eventData.data.entity, playerStats);
    }
};

// handler that fires whenever any entity in the world has died; if the
// death is a player then record his/her death (and murderer, if applicable)
// immediately. For mob kills simply update the component for a delayed save
system.onEntityDeath = function(eventData) {
    if (eventData.data.entity.__identifier__ == "minecraft:player") {
        let playerName     = this.getComponent(eventData.data.entity, "minecraft:nameable").data.name;
        let position       = this.getComponent(eventData.data.entity, "minecraft:position");
        let positionCoords = `${Math.round(position.data.x)}, ${Math.round(position.data.y)}, ${Math.round(position.data.z)}`;
        
        // record the death in the death counter scoreboard
        this.executeCommand(`/scoreboard players add ${playerName} deathcount 1`, (commandData) => this.commandCallback(commandData));
        
        // if the killer was another player, record that now
        if (eventData.data.killer && eventData.data.killer.__identifier__ == "minecraft:player") {
            let murdererName = this.getComponent(eventData.data.killer, "minecraft:nameable").data.name;
            this.executeCommand(`/scoreboard players add ${murdererName} murdercount 1`, (commandData) => this.commandCallback(commandData));
        }

        // send the message to the chat window for all players
        this.logToChat(`RIP ${playerName} @ ${positionCoords}`);
    } else if (eventData.data.killer && eventData.data.killer.__identifier__ == "minecraft:player") {
        // the player killed a mob of some kind...
        let playerStats = this.getPlayerStats(eventData.data.killer);
        
        if (globalVars.hostileMobs[eventData.data.entity.__identifier__])
            playerStats.data.hostileMobsKilled += 1;
        else
            playerStats.data.gentleMobsKilled += 1;
        
        this.applyComponentChanges(eventData.data.killer, playerStats);
    }
};

// handler that fires whenever the user has placed a block down in the world
system.onPlayerPlacedBlock = function(eventData) {
    let playerStats = this.getPlayerStats(eventData.data.player);
    playerStats.data.blocksPlaced += 1;
    this.applyComponentChanges(eventData.data.player, playerStats);
}

// handler that fires whenever the player has broken a block... this may happen a bunch
// so should update just the component, not the scoreboard directly
system.onPlayerDestroyedBlock = function(eventData) {
    let playerStats = this.getPlayerStats(eventData.data.player);
    playerStats.data.blocksBroken += 1;
    this.applyComponentChanges(eventData.data.player, playerStats);
};


//=====================================================================================
// Utility Routines
//=====================================================================================
// retrieves the player stats component from the given entity, initializing a
// new component if this is the first access for the player
system.getPlayerStats = function(entity) {
    if (this.hasComponent(entity, "rogueproeliator:playerStats"))
        return this.getComponent(entity, "rogueproeliator:playerStats");
    else {
        // this is the first time that the player has been seen this go-around; create a new stats
        // component for the player
        let playerStats = this.createComponent(entity, "rogueproeliator:playerStats");

        // ensure that all of the scoreboards have been added for the player
        this.executeCommand("/scoreboard objectives add deathcount dummy Deaths"                     , (commandData) => this.commandCallback(commandData));
        this.executeCommand("/scoreboard objectives add murdercount dummy Murders"                   , (commandData) => this.commandCallback(commandData));

        this.executeCommand('/scoreboard objectives add is_afk dummy "Is AFK"'                       , (commandData) => this.commandCallback(commandData));
        this.executeCommand('/scoreboard objectives add playtime_minutes dummy "Active Time"'        , (commandData) => this.commandCallback(commandData));
        this.executeCommand('/scoreboard objectives add afk_minutes dummy "AFK Time"'                , (commandData) => this.commandCallback(commandData));

        this.executeCommand('/scoreboard objectives add hostiles_killed dummy "Hostile Mobs Killed"' , (commandData) => this.commandCallback(commandData));
        this.executeCommand('/scoreboard objectives add peaceful_killed dummy "Peaceful Mobs Killed"', (commandData) => this.commandCallback(commandData));
        this.executeCommand('/scoreboard objectives add blocks_broken dummy "Blocks Broken"'         , (commandData) => this.commandCallback(commandData));
        this.executeCommand('/scoreboard objectives add blocks_placed dummy "Blocks Placed"'         , (commandData) => this.commandCallback(commandData));

        return playerStats;
    }
};

// builds an array that stores the list of mobs considered hostile as keys into the
// array, to be used like a hash lookup
function createHostileMobArray() {
    hostileMobs = [];
    hostileMobs["minecraft:blaze"]                = true;
    hostileMobs["minecraft:cave_spider"]          = true;
    hostileMobs["minecraft:creeper"]              = true;
    hostileMobs["minecraft:drowned"]              = true;
    hostileMobs["minecraft:elder_guardian"]       = true;
    hostileMobs["minecraft:elder_guardian_ghost"] = true;
    hostileMobs["minecraft:ender_dragon"]         = true;
    hostileMobs["minecraft:enderman"]             = true;
    hostileMobs["minecraft:endermite"]            = true;
    hostileMobs["minecraft:evocation_illager"]    = true;
    hostileMobs["minecraft:ghast"]                = true;
    hostileMobs["minecraft:guardian"]             = true;
    hostileMobs["minecraft:hoglin"]               = true;
    hostileMobs["minecraft:husk"]                 = true;
    hostileMobs["minecraft:magma_cube"]           = true;
    hostileMobs["minecraft:phantom"]              = true;
    hostileMobs["minecraft:piglin"]               = true;
    hostileMobs["minecraft:piglin_brute"]         = true;
    hostileMobs["minecraft:pillager"]             = true;
    hostileMobs["minecraft:ravager"]              = true;
    hostileMobs["minecraft:shulker"]              = true;
    hostileMobs["minecraft:silverfish"]           = true;
    hostileMobs["minecraft:skeleton"]             = true;
    hostileMobs["minecraft:slime"]                = true;
    hostileMobs["minecraft:spider"]               = true;
    hostileMobs["minecraft:stray"]                = true;
    hostileMobs["minecraft:vex"]                  = true;
    hostileMobs["minecraft:vindicator"]           = true;
    hostileMobs["minecraft:witch"]                = true;
    hostileMobs["minecraft:wither"]               = true;
    hostileMobs["minecraft:wither_skeleton"]      = true;
    hostileMobs["minecraft:zoglin"]               = true;
    hostileMobs["minecraft:zombie"]               = true;
    hostileMobs["minecraft:zombie_pigman"]        = true;
    hostileMobs["minecraft:zombie_villager"]      = true;

    return hostileMobs;
}

// dummy function that may be used to debug command calls as necessary; in production
// should not do anything
system.commandCallback = function (commandData) {
    
};

// This is just a helper function that simplifies logging data to the console.
system.logToChat = function (...items) {
	// Convert every parameter into a legible string and collect them into an array.
	const toString = (item) => {
		switch (Object.prototype.toString.call(item)) {
			case '[object Undefined]':
				return 'undefined'
			case '[object Null]':
				return 'null'
			case '[object String]':
				return `"${item}"`
			case '[object Array]':
				const array = item.map(toString)
				return `[${array.join(', ')}]`
			case '[object Object]':
				const object = Object.keys(item).map(
					(key) => `${key}: ${toString(item[key])}`
				)
				return `{${object.join(', ')}}`
			case '[object Function]':
				return item.toString()
			default:
				return item
		}
	}

    // join the string array items into a single string and print it to the world's chat.
	const chatEvent        = this.createEventData('minecraft:display_chat_event')
	chatEvent.data.message = items.map(toString).join(' ')
	this.broadcastEvent('minecraft:display_chat_event', chatEvent)
};