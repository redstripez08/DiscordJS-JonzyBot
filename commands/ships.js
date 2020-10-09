module.exports = {
    name: "ships",
    aliases: ["ship"],
    description: "Gets A list of ships",
    usage: null,
    cooldown: 10,
    guildOnly: false,
    args: false,
    role: null,
    execute(message, args) {
        const { MessageEmbed, MessageAttachment } = require('discord.js');
        const fetch = require('node-fetch');
        const config = require("../config.json");
        // const url = require('url');
        // const querystring = require('querystring');


        async function getShips(ship) {
            try {
                const originLink = "http://localhost:3000";
                const queryParams = {secret: config.Secret};
                const options = {
                    method: "GET",
                    headers: {
                        "Accept": "application/json, application/xml;q=0.9"
                    }
                };

                if (ship.length) queryParams["ship_name"] = ship;

                if (!ship.length) {
                    const link = new URL("/ships", originLink);
                    link.search = new URLSearchParams(queryParams).toString();
                    
                    const res = await fetch(link, options);
                    if (!res.ok) throw `Status Code: ${res.status} || ${res.statusText}`;
                    
                    const data = await res.json();
                    let shipArr = [];

                    // for (const ship of data) {
                    //     shipArr.push(ship.ship_name);
                    // }

                    const shipEmbed = new MessageEmbed()
                        .setColor("#FFC0CB")//!Set to Pink
                        .setTitle("Ships")
                        .setDescription("Suggest some more pls.");
                        //! Create emoji react by id. click emoji and it sends ship info

                    for (const ship of data) {
                        shipEmbed.addField(`__${ship.ship_name}__`, "Some Description here");
                    }
    

                    return message.channel.send(shipEmbed); 

                } else {
                    const link = new URL("/shippics", originLink);
                    link.search = new URLSearchParams(queryParams).toString();
                    const res = await fetch(link, options);
                    if (!res.ok) throw `HTTP Status Code: ${res.status} || ${res.statusText}\nError: \`${status.error}\``;
                    const data = await res.json();
                    //console.log(data);

                    if (data.message) return message.channel.send(data.message);

                    const shipEmbed = new MessageEmbed()
                        .setColor("#fff")
                        .setTitle("Page 1 | Ship Info")
                        .setDescription(`**__${data.ship_name}__**`)
                        // .attachFiles(['./heart.jpg'])
                        // .setThumbnail('attachment://heart.jpg')
                        .addFields(
                            {name: "ID:", value: data.id},
                            {name: "Person 1:", value: data.ship_person_1, inline: true},
                            {name: "Person 2:", value: data.ship_person_2, inline: true},
                            {name: "\u200B", value: "\u200B", inline: false},
                            {name: "Person 1 Sex:", value: data.ship_sex_1, inline: true},
                            {name: "Person 2 Sex:", value: data.ship_sex_2, inline: true}
                        )
                        .setFooter(`Shipped by ${data.shippers_amount} people.`);

                    const galleryEmbed = new MessageEmbed()
                        .setColor('#a400bd')
                        .setTitle("Page 2 | Gallery")
                        .setDescription("WIP")
                        .setImage(data.media);


                    const m = await message.channel.send(shipEmbed);
                    m.react('1️⃣');
                    m.react('2️⃣');
                   
                    const page1Emoji = '1️⃣';
                    const page2Emoji = '2️⃣';

                    const page1Filter = (react, user) => react.emoji.name === page1Emoji && !user.bot;
                    const page2Filter = (react, user) => react.emoji.name === page2Emoji && !user.bot;
                    const page1Collector = m.createReactionCollector(page1Filter, {time: 60 * 1000});
                    const page2Collector = m.createReactionCollector(page2Filter, {time: 60 * 1000});

                    page1Collector.on('collect', (reaction, user) => {
                        const lastVote = m.reactions.cache.get(reaction.emoji.name);
                        m.edit(shipEmbed);
                        lastVote.count -= 1;
                        lastVote.users.remove(user.id);    
                    });

                    page2Collector.on('collect', (reaction, user) => {
                        const lastVote = m.reactions.cache.get(reaction.emoji.name);
                        m.edit(galleryEmbed);
                        lastVote.count -= 1;
                        lastVote.users.remove(user.id);
                    });

                }
    
            } catch (error) {
                message.channel.send(`There was an error:\n\`${error}\``);
                console.error(error);
            }
        }

        getShips(args);
        //getSpecificShip(args);
    
    }
};
