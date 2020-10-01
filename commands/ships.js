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
        const fetch = require('node-fetch');

        (async() => {
            try {
                const link = " https://my-test-ships-api.herokuapp.com/ships";
                const res = await fetch(link);
                if (res.status < 200 || res.status >= 300) throw `Status Code: ${res.status}`;
                const data = await res.json();
                let shipArr = [];
                for (const ship of data) {
                    shipArr.push(ship.ship_name);
                }
                message.channel.send(shipArr.join(', '));
    
            } catch (error) {
                message.channel.send(`There was an error:\n\`${error}\``);
            }
        })();
    }
};