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

client.on('messageReactionAdd', async (reaction, user) => {
  try {
    // When a reaction is received, check if the structure is partial
    if (reaction.partial) {
      await reaction.fetch();
    }

    const { message, _emoji } = reaction;
    const reactedEmoji = _emoji.name

    if (message.channelId === newsfeed && reactedEmoji === '📰') {
      const channel = client.channels.cache.get(aggregator);
      channel.send(message.content);
    }
  } catch (error) {
    console.error('Something went wrong when fetching the message:', error);
    return;
  }
});

client.login(token);
