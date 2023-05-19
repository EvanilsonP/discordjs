import { config } from 'dotenv';
import { ButtonStyle, Client, InteractionType, ModalBuilder, Routes, TextInputStyle } from 'discord.js';
import { REST } from '@discordjs/rest';

import rolesCommand from './commands/roles.js';
import orderCommand from './commands/order.js';
import usersCommand from './commands/user.js';
import channelsCommand from './commands/channel.js';
import banCommand from './commands/ban.js';
import registerCommand from './commands/register.js';
import buttonCommand from './commands/button.js';

import { ActionRowBuilder, ButtonBuilder, SelectMenuBuilder, TextInputBuilder } from '@discordjs/builders';

config(); // // Grabbing environment variables
const client = new Client({ intents: ['Guilds', 'GuildMessages', 'MessageContent']});

const TOKEN = process.env.TOKEN;
const CLIENT_ID = process.env.CLIENT_ID;
const GUILD_ID = process.env.GUILD_ID;

const rest = new REST({ version: '10' }).setToken(TOKEN);

// Creating a help slash command 
async function main() {
    const commands = [ orderCommand, rolesCommand, usersCommand, channelsCommand, banCommand, registerCommand, buttonCommand];

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
          components: [actionRowComponent.toJSON(), actionRowDrinkOptions.toJSON()]
        })
      }else if(interaction.commandName === 'register') {
        const modal = new ModalBuilder()
        .setTitle('Register user form')
        .setCustomId('registerUserModal')
        .setComponents(
          new ActionRowBuilder().setComponents(new TextInputBuilder)
          .setLabel('username')
          .setCustomId('username')
          .setStyle(TextInputStyle.Short)
        )
        new ActionRowBuilder().setComponents(new TextInputBuilder)
          .setLabel('email')
          .setCustomId('email')
          .setStyle(TextInputStyle.Short)

          new ActionRowBuilder().setComponents(new TextInputBuilder)
          .setLabel('comment')
          .setCustomId('comment')
          .setStyle(TextInputStyle.Short)
          

        interaction.showModal(modal);
      } else if(interaction.commandName === 'button') {
        interaction.reply({
          content: 'button',
          components: [
            new ActionRowBuilder().setComponents(
              new ButtonBuilder()
              .setCustomId('button1')
              .setLabel('Button 1')
              .setStyle(ButtonStyle.Primary),

              new ButtonBuilder()
              .setCustomId('button2')
              .setLabel('Button 2')
              .setStyle(ButtonStyle.Primary),

              new ButtonBuilder()
              .setLabel('Discord js Docs')
              .setLabel('https://discord.com/developers/docs/intro')
              .setStyle(ButtonStyle.Primary)
            )
          ]
        });
      }
    } else if(interaction.isStringSelectMenu()) {
      if(interaction.customId === 'food_options') {

      } else if(interaction.customId === 'drink_options') {

      }
    } else if(interaction.type === InteractionType.ModalSubmit) {
      console.log('Modal submitted...');
      console.log(interaction);
      if(interaction.customId === 'registerUserModel') {
        console.log(interaction.fields.getTextInputValue('username'))
        interaction.reply('You submitted your details!')
      }
    }
});

// Showing the client's tag
client.on('ready', (client) => {
    console.log(`${client.user.tag} is online. ✔️ `);
});

client.on('messageCreate', async (m) => {
  if(m.author.bot) return;

  const sentMessage = await m.channel.send({
    content: 'Hello, World',
    components: [
      new ActionRowBuilder().setComponents(
        new ButtonBuilder()
        .setCustomId('button1')
        .setLabel('Button 1')
        .setStyle(ButtonStyle.Primary),

        new ButtonBuilder()
        .setCustomId('button2')
        .setLabel('Button 2')
        .setStyle(ButtonStyle.Primary),

        new ButtonBuilder()
        .setLabel('Discord js Docs')
        .setLabel('https://discord.com/developers/docs/intro')
        .setStyle(ButtonStyle.Primary)
      )
    ]
    
  })
})

// Whenever a user types in the coffee message
client.on('messageCreate', (message) => {
    if(message.content.toLocaleLowerCase() === 'coffee') {
        message.reply('Sorry! I have ran out of coffee already! :(');
    };
});

// Logging the bot in
client.login(TOKEN);