import { SlashCommandBuilder } from '@discordjs/builders';

const orderCommand = new SlashCommandBuilder()
    .setName('order')
    .setDescription('Order your favorite meal!')
    .addStringOption((option) => 
        option
        .setName('food')
        .setDescription('Select your favorite food')
        .setRequired(true)
        .setChoices({
            name: 'Cake', 
            value: 'cake'
        }, 
        {
            name: 'Pizza', 
            value: 'pizza'
        }, 
        {
            name: 'Hamburguer', 
            value: 'hamburguer'
        })
    ).addStringOption((option) => 
    option
    .setName('drink')
    .setDescription('Select your favorite drink')
    .setRequired(true)
    .setChoices({
        name: 'Coca Cola', 
        value: 'coca cola'
    }, 
    {
        name: 'Juice', 
        value: 'juice'
    }, 
    {
        name: 'Water', 
        value: 'water'
    })
);

export default orderCommand.toJSON();