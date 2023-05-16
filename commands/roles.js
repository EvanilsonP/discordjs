import { SlashCommandBuilder } from '@discordjs/builders';

const rolesCommand = new SlashCommandBuilder()
.setName('addrole')
.setDescription('Add a Role')
.addRoleOption((option) =>
    option
    .setName('newrole')
    .setDescription('Adds the new Role')
)

export default rolesCommand.toJSON();