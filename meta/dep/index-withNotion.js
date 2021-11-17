// ----------------------------------------------------------------------------------//
// Main
// JUMP Discord Bot (( BETA v0.1.0 ))
// Fiig | November 10, 2021 | Updated:
// ----------------------------------------------------------------------------------//

import { Client, Intents } from 'discord.js';
import { Client as NotionClient } from '@notionhq/client';
const { DISCORD_TOKEN, NOTION_KEY, CURATED, NEWSFEED, CREATIVE, NOTION_BOUNTIES } =
  process.env;

const client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
  ],
  partials: ['MESSAGE', 'CHANNEL', 'REACTION'],
});

const notion = new NotionClient({ auth: NOTION_KEY });

// Used to test notion API
// const getDatabase = async () => {
//   const response = await notion.databases.query({
//     database_id: NOTION_BOUNTIES,
//   });

//   console.log(JSON.stringify(response));
// };

// getDatabase();

async function addBounty(bountyDescription) {
  try {
    const response = await notion.pages.create({
      parent: { database_id: NOTION_BOUNTIES },
      "icon": { "type": "emoji", "emoji": "🍭" },
      properties: {
        Name: {
          id: 'title',
          type: 'title',
          title: [
            {
              type: 'text',
              text: { content: 'Creative Request', link: null },
            },
          ],
        },
        'Work Stream': {
          id: 'RKx%3E',
          type: 'select',
          select: {
            id: '7c73a641-d4df-450a-8f72-8819606a11c1',
            name: 'creative',
            color: 'blue',
          },
        },
        Description: {
          type: 'rich_text',
          rich_text: [
            {
              type: 'text',
              text: { content: bountyDescription, link: null },
            },
          ],
        },
      },
    });
    // console.log(response);
    // console.log('Success! Entry added.');
    return response;
  } catch (error) {
    console.error(error.body);
  }
}

client.once('ready', () => {
  console.log('Ready!');
});

client.on('interactionCreate', async (interaction) => {
  if (!interaction.isCommand()) return;

  const { commandName, user } = interaction;

  if (commandName === 'creative') {
    const bountyDescription = interaction.options.getString('description');
    const channel = client.channels.cache.get(CREATIVE);
    const notionResponse = await addBounty(bountyDescription);
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
        count === 5
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
