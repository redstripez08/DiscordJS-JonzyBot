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
        const { MessageEmbed } = require('discord.js');
        const fetch = require('node-fetch');
        const config = require("../config.json");
        // const url = require('url');
        // const querystring = require('querystring');


        async function getShips(ship) {
            try {
                const link = new URL("http://localhost:3000/ships");
                const queryParams = {
                    ship_name: ship,
                    secret: config.Secret
                };
                link.search = new URLSearchParams(queryParams).toString();

                if (!ship.length) {
                    const res = await fetch(link);
                    if (res.status < 200 || res.status >= 300) throw `Status Code: ${res.status}`;
                    
                    const data = await res.json();
                    let shipArr = [];

                    for (const ship of data) {
                        shipArr.push(ship.ship_name);
                    }

                    const shipEmbed = new MessageEmbed()
                        .setColor("fff")//!Set to Pink
                        .setDescription("ahh");
                        //! Create emoji react by id. click emoji and it sends ship info


                    return message.channel.send(shipArr.join(', ')); 

                } else {
                    const res = await fetch(link);
                    if (res.status < 200 || res.status >= 300) throw `Status Code: ${res.status}`;
                    const data = await res.json();

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
                        .setDescription("WIP");


                    const m = await message.channel.send(shipEmbed);
                    m.react('1️⃣');
                    m.react('2️⃣');
                   
                    const page1Emoji = '1️⃣';
                    const page2Emoji = '2️⃣';

                    const page1Filter = (react, user) => react.emoji.name === page1Emoji && user.id === message.author.id;
                    const page2Filter = (react, user) => react.emoji.name === page2Emoji && user.id === message.author.id;
                    const page1Collector = m.createReactionCollector(page1Filter, {time: 60 * 1000})
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
            }
        }

        getShips(args);
        //getSpecificShip(args);
    
    }
};
