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
        name: 'order',
        description: 'Order something',
        options: [
            {
                name: 'food',
                description: 'the type of food',
                type: 3,
                required: true,
                choices: [
                    {
                        name: 'Cake',
                        value: 'cake'
                    },
                    {
                        name: 'Hamburguer',
                        value: 'hamburguer'
                    },
                    {
                        name: 'Ice Cream',
                        value: 'ice cream'
                    },
                ]
            },
            {
                name: 'drink',
                description: 'type of drink',
                type: 3,
                required: true,
                choices: [
                    {
                        name: 'Juice',
                        value: 'juice'
                    },
                    {
                        name: 'Coca Cola',
                        value: 'coca cola'
                    },
                    {
                        name: 'Water',
                        value: 'water'
                    },
                ]
            }
        ],
    }];

    try {
      console.log('Started refreshing application (/) commands.');
      await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
        body: commands,
      });
    } 
    
    catch (err) {
      console.log(err);
    }
  };
  
  main();

// Interacting with the user via slash commands
client.on('interactionCreate', (interaction) => {
    if(interaction.isChatInputCommand()) {
       const food = interaction.options.get('food').value;
       const drink = interaction.options.get('drink').value;
       interaction.reply(`You ordered ${food} and ${drink}`);
    };
});

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

// Logging the bot in
client.login(TOKEN);