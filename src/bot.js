require("dotenv/config");
const { Client, Collection, Events, GatewayIntentBits } = require("discord.js");
const { Player } = require("discord-player");

//client instance
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessageTyping,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildInvites,
    GatewayIntentBits.GuildModeration,
    GatewayIntentBits.GuildVoiceStates,
  ],
});

// Command handling
client.commands = new Collection();
//player instance
const player = new Player(client);

//load extractors
(async () => {
  await player.extractors.loadDefault();
})();

//loader Commands, Events, registering commands
require("./structs/commands")(client);
require("./structs/events")(client);
require("./deploy-commands");

client.login(process.env.TOKEN);
