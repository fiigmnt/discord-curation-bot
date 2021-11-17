// make sure you remove module from package.json 
const { SlashCommandBuilder } = require('@discordjs/builders');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const { clientId, token } = require('./config.json');

const commands = [
  new SlashCommandBuilder()
    .setName('creative')
    .setDescription('Send a request for a creative asset.')
    .addStringOption((option) =>
      option
        .setName('description')
        .setDescription('Please describe the type of creative asset you need.')
        .setRequired(true)
    ),
].map((command) => command.toJSON());

const rest = new REST({ version: '9' }).setToken(token);

rest
  .put(Routes.applicationCommands(clientId), { body: commands })
  .then(() => console.log('Successfully registered application commands.'))
  .catch(console.error);
