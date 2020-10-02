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
        // const url = require('url');
        // const querystring = require('querystring');


        async function getShips(ship) {
            try {
                const link = new URL("https://my-test-ships-api.herokuapp.com/ships");
                const queryParams = {
                    ship_name: ship
                };

                if (!ship.length) {
                    const res = await fetch(link);
                    if (res.status < 200 || res.status >= 300) throw `Status Code: ${res.status}`;
                    
                    const data = await res.json();
                    let shipArr = [];
                    for (const ship of data) {
                        shipArr.push(ship.ship_name);
                    }
                    return message.channel.send(shipArr.join(', '));    
                } else {
                    link.search = new URLSearchParams(queryParams).toString();
                    const res = await fetch(link);
                    const data = await res.json();

                    if (data.message) return message.channel.send(data.message);

                    const shipEmbed = new MessageEmbed()
                        .setColor("#fff")
                        .setTitle("Ship Info")
                        .setDescription(`**${data.ship_name}**`)
                        .addFields(
                            {name: "ID:", value: data.id},
                            {name: "Person 1:", value: data.ship_person_1, inline: true},
                            {name: "Person 2:", value: data.ship_person_2, inline: true},
                            {name: "\u200B", value: "\u200B", inline: false},
                            {name: "Person 1 Sex:", value: data.ship_sex_1, inline: true},
                            {name: "Person 2 Sex:", value: data.ship_sex_2, inline: true}
                        )
                        .setFooter(`Shipped by ${data.shippers_amount} people.`);


                    message.channel.send(shipEmbed);
                }

    
            } catch (error) {
                message.channel.send(`There was an error:\n\`${error}\``);
            }
        }

        getShips(args);
        //getSpecificShip(args);
    
    }
};
