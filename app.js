import { config } from 'dotenv';
import { Client } from 'discord.js';
config(); // // Grabbing environment variables

const client = new Client({ intents: ['Guilds', 'GuildMessages', 'MessageContent']});

// Showing the client's tag
client.on('ready', (client) => {
    console.log(`${client.user.tag} is online. ✔️ `);
});

client.on('messageCreate', (message) => {
    if(message.content.toLocaleLowerCase() === 'coffee') {
        message.reply('Sorry! I have ran out of coffee already! :(');
    };
});

// Logging in
client.login(process.env.TOKEN);