module.exports = {
    name: "meme",
    aliases: null,
    description: "Gives memes from reddit",
    usage: null,
    cooldown: 0,
    guildOnly: false,
    args: false,
    role: null,
    execute(message, args) {
        const fetch = require("node-fetch");
        const { MessageEmbed } = require("discord.js");

        (async() => {
            try {
                const link = "https://meme-api.herokuapp.com/gimme";

                const data = await fetch(link).then(res => res.json());
    
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
        })();
    }
};