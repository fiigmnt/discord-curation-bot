// ----------------------------------------------------------------------------------//
// Main
// JUMP Discord Bot (( BETA v0.1.0 ))
// Fiig | November 10, 2021 | Updated:
// ----------------------------------------------------------------------------------//

const { Client, Intents } = require('discord.js');
const { newsfeed, aggregator, token } = process.env;

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

// TODO: add reaction remove too
client.on('messageReactionAdd', async (reaction, user) => {
  try {
    // When a reaction is received, check if the structure is partial
    if (reaction.partial) {
      await reaction.fetch();
    }

    const {
      message: { id, channelId },
      _emoji,
      count,
    } = reaction;

    const sendMessage = () => {
      return channelId === newsfeed && _emoji.name === '📰' && count === 5;
    };

    if (sendMessage()) {
      const channel = client.channels.cache.get(aggregator);
      const formattedMessage = `Shared by @${message.author.username}}\n${message.content}`;
      channel.send(formattedMessage);
    }
  } catch (error) {
    console.error('Something went wrong when fetching the message:', error);
    return;
  }
});

client.login(token);
