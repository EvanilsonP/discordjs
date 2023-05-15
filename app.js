require('dotenv').config();
const { Client } = require('discord.js');

const client = new Client({ intents: ['Guilds', 'GuildMessages']});

// Logging in
client.login(process.env.TOKEN);