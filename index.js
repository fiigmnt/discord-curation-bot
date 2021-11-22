// ----------------------------------------------------------------------------------//
// Main
// JUMP Discord Bot (( BETA v0.1.0 ))
// Fiig | November 10, 2021 | Updated:
// ----------------------------------------------------------------------------------//

import { Client, Intents } from 'discord.js';
const { DISCORD_TOKEN, CURATED, NEWSFEED, CREATIVE } =
  process.env;

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

client.once('ready', () => {
  console.log('Ready!');
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, user } = interaction;

  if (commandName === 'creative') {
    const bountyDescription = interaction.options.getString('description');
    const channel = client.channels.cache.get(CREATIVE);
    const formattedMessage = `@${user.username} has put in a request for a new creative asset!\n${bountyDescription}`;
    channel.send(formattedMessage);
    await interaction.reply('Your request has been sent!');
  }
});

// TODO: add reaction remove too
client.on('messageReactionAdd', async (reaction, user) => {
  try {
    // When a reaction is received, check if the structure is partial
    if (reaction.partial) {
      await reaction.fetch();
    }

    const { message, _emoji, count } = reaction;
    const { channelId } = message;

    const sendMessage = () => {
      return (
        channelId === NEWSFEED &&
        _emoji.id === '908201130192953384' &&
        count === 2
      );
    };

    if (sendMessage()) {
      const channel = client.channels.cache.get(CURATED);
      const formattedMessage = `Shared by @${message.author.username}\n${message.content}`;
      channel.send(formattedMessage);
    }
  } catch (error) {
    console.error('Something went wrong when fetching the message:', error);
    return;
  }
});

client.login(DISCORD_TOKEN);
