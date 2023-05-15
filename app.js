import { config } from 'dotenv';
import { Client, Routes } from 'discord.js';
import { REST }   from '@discordjs/rest'
config(); // // Grabbing environment variables
const client = new Client({ intents: ['Guilds', 'GuildMessages', 'MessageContent']});

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const rest = new REST({ version: '10' }).setToken(TOKEN);

// Creating a help slash command 
async function main() {
    const commands = [{
        name: 'tutorialhelp',
        description: 'Help tutorial command'
    }];

    try {
      console.log('Started refreshing application (/) commands.');
      await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
        body: commands,
      });
      client.login(TOKEN);
    } 
    
    catch (err) {
      console.log(err);
    }
  };
  
  main();
// Showing the client's tag
client.on('ready', (client) => {
    console.log(`${client.user.tag} is online. ✔️ `);
});

// Whenever a user types in the coffee message
client.on('messageCreate', (message) => {
    if(message.content.toLocaleLowerCase() === 'coffee') {
        message.reply('Sorry! I have ran out of coffee already! :(');
    };
});