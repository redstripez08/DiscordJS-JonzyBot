module.exports = {
    name: "dadjoke",
    aliases: ["jk", "joke", "dadjk"],
    description: "Returns a random Dad Joke.",
    usage: null,
    cooldown: 0,
    guildOnly: false,
    args: false,
    role: null,
    async execute(message, args) {
        const fetch = require("node-fetch");
        try {
            const link = "https://icanhazdadjoke.com/";
            const options = {
                method: "GET",
                headers: {
                    "Accept": "application/json"
                }
            };

            const res = await fetch(link, options);
            if (!res.ok) throw `HTTP Status Code: ${res.status} || ${res.statusText}`;

            const { joke } = await res.json();

            message.channel.send(joke);
        } catch (error) {
            message.channel.send(`There was an error:\n\`${error}\``);
        }
    }
};
