module.exports = {
    name: "dadjoke",
    aliases: ["jk", "joke", "dadjk"],
    description: "Returns a random Dad Joke.",
    usage: null,
    cooldown: 0,
    guildOnly: false,
    args: false,
    role: null,
    execute(message, args) {
        const fetch = require("node-fetch");

        (async() => {
            try {
                const link = "https://icanhazdadjoke.com/";
                const options = {
                    method: "GET",
                    headers: {
                        "Accept": "application/json"
                    }
                };
    
                const { joke, status } = await fetch(link, options).then(res => res.json());
                if (status < 200 || status > 300) throw `Status Code: ${status}`;

                message.channel.send(joke);
            } catch (error) {
                message.channel.send(`There was an error:\n\`${error}\``)
            }
        })();

    }
};