# CURRATION Bot 🤖

>it's probably nothing

## TL;DR

A general use bot to aggregate content based on discord reactions.  ✨

## How it Works

1. Upvote posts in by reacting with a specified emoji (ex: 📰)
2. Five 📰 will trigger the bot to post into the specified channel (id supplied via env var)
3. The community can use these votes to further curate the content 🤙

## Setup

1. Fork the repository to your gihub account (top right hand corner)
2. Clone the fork to your local system
3. Install Node modules `npm install`
4. Run with the following process variables:
   `CURATE_FROM` :point_right: list of channel ids separated by a comma (no spaces)
   `POST_TO` :point_right: channel id to post to
   `TOKEN` :point_right: the bot's token :mushroom:

## Submitting your improvements

1. Create a new branch `git check -b <your branch name>`
2. `git add .`
3. `git commit -m 'fix(example): semantic versioning is cool'`
4. `git push`
5. Grab that PR and point it to our main branch
6. Message with changes for a review ! :v:

## Support

Feel free to reach out to me `fiigmnt#0001` on discord, or email: `fiigmnt@pm.me`  [#dev1462](https://twitter.com/fiigmnt) 🤙 https://discord.js.org/)