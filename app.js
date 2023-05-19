import { config } from 'dotenv';
import { Client, Routes } from 'discord.js';
import { REST } from '@discordjs/rest';

import rolesCommand from './commands/roles.js';
import orderCommand from './commands/order.js';
import usersCommand from './commands/user.js';
import channelsCommand from './commands/channel.js';
import banCommand from './commands/ban.js';
import { ActionRowBuilder, SelectMenuBuilder } from '@discordjs/builders';

config(); // // Grabbing environment variables
const client = new Client({ intents: ['Guilds', 'GuildMessages', 'MessageContent']});

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const rest = new REST({ version: '10' }).setToken(TOKEN);

// Creating a help slash command 
async function main() {
    const commands = [ orderCommand, rolesCommand, usersCommand, channelsCommand, banCommand ];

    try {
        console.log('Started refreshing application (/) commands.');
        await rest.put(Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID), {
        body: commands
      });

    } catch (err) {
      console.log(err);
    }
  };
  
  main();

// Interacting with the user via slash commands
client.on('interactionCreate', (interaction) => {
    if(interaction.isChatInputCommand()) {
      if(interaction.commandName === 'order') {
        console.log('Order command');
        console.log(interaction);
        const actionRowComponent = new ActionRowBuilder().setComponents(
          new SelectMenuBuilder().setCustomId('food_options').setOptions([
            { label: 'Cake', value: 'cake' },
            { label: 'Pizza', value: 'pizza' },
            { label: 'Sushi', value: 'sushi' },
          ])
        )
        const actionRowDrinkOptions = new ActionRowBuilder().setComponents(
          new SelectMenuBuilder().setCustomId('drink_options').setOptions([
            { label: 'Coca cola', value: 'coca cola' },
            { label: 'Water', value: 'water' },
            { label: 'Juice', value: 'juice' },
          ]),
        )
        interaction.reply({
          components: [actionRowComponent.toJSON(), actionRowDrinkOptions.toJSON() ]
        })
      }
    } else if(interaction.isStringSelectMenu()) {
      if(interaction.customId === 'food_options') {

      } else if(interaction.customId === 'drink_options') {

      }
    }
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