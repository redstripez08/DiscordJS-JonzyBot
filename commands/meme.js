module.exports = {
    name: "meme",
    aliases: null,
    description: "Gives memes from reddit",
    usage: null,
    cooldown: 0,
    guildOnly: false,
    args: false,
    role: null,
    async execute(message, args) {
        const fetch = require("node-fetch");
        const { MessageEmbed } = require("discord.js");

        try {
            const originLink = "https://meme-api.herokuapp.com/gimme";
            const link = new URL(originLink);
            const options = {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            };

            const res = await fetch(link, options);
            if (!res.ok) throw `HTTP Status Code: ${res.status} || ${res.statusText}`;

            const data = await res.json();

            const memeEmbed = new MessageEmbed()
                .setColor("#eb1717")
                .setURL(data.postLink)
                .setAuthor(`r/${data.subreddit}`)
                .setTitle(data.title)
                .setImage(data.url)
                .setFooter(`Author: ${data.author}`);

            message.channel.send(memeEmbed);

        } catch (error) {
            message.channel.send(`There was an error:\n\`${error}\``)
        }
    }
};
