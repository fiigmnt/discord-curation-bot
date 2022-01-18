// ----------------------------------------------------------------------------------//
// Main
// Discord Curation Bot (( BETA v0.1.0 ))
// Fiigmnt | November 11, 2021 | Updated: January 17, 2022
// ----------------------------------------------------------------------------------//

const { Client, Intents } = require('discord.js');
const { CURATE_FROM, POST_TO, DISCORD_TOKEN } = process.env;
const channelIds = CURATE_FROM.split(',');

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

client.once('ready', () => {
  console.log('Bot is ready');
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
      return channelIds.includes(channelId) && _emoji.name === '📰' && count === 5;
    };

    if (sendMessage()) {
      const channel = client.channels.cache.get(POST_TO);
      const formattedMessage = `This post received 5 📰 reactions, shared by @${message.author.username})\n${message.content}`;
      channel.send(formattedMessage);
    }
  } catch (error) {
    console.error('Something went wrong when fetching the message:', error);
    return;
  }
});

client.login(DISCORD_TOKEN);
