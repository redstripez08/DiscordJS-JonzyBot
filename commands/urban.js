module.exports = {
    name: "urban",
    aliases: ["ud"],
    description: "Sends Urban Dictionary definition of a given word.",
    usage: '<Word>',
    cooldown: 5,
    guildOnly: false,
    args: true,
    role: null,
    async execute(message, args) {
        const { MessageEmbed } = require("discord.js");

        try {
            const fetch = require("node-fetch");

            const originLink = "https://api.urbandictionary.com";
            const link = new URL("/v0/define" , originLink);
            const query = {term: args.join(" ")};
            link.search = new URLSearchParams(query).toString();

            const options = {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            };
    
            const res = await fetch(link, options);
            if (!res.ok) throw `HTTP Status Code: ${res.status} || ${res.statusText}\nError: \`${status.error}\``
            const { list } = await res.json();

            if (!list.length) return message.channel.send(`No Results Found for **${args.join(" ")}**`);
            const trim = (str, max = 1024) => ((str.length > max) ? `${str.slice(0, max - 3)}...` : str);
            const embed = new MessageEmbed()
                .setColor("#ebf700")
                .setTitle(list[0].word)
                .setDescription(trim(list[0].definition))
                .setURL(list[0].permalink)
                .addField("Example", trim(list[0].example))
                .setFooter(`Author: ${list[0].author}`);

            //console.log(list);
            message.channel.send(embed);
    
        } catch (error) {
            message.channel.send(`There was an error:\n\`${error}\``);
            console.error(error);
        }
    }
};