module.exports = {
    name: "fact",
    aliases: null,
    description: "Sends random fact. Leave blank for a random fact, type today for fact of the day.",
    usage: '<empty or "today" >.',
    cooldown: 0,
    guildOnly: false,
    args: false,
    role: null,
    async execute(message, args) {
        const fetch = require('node-fetch');

        const originLink = "https://uselessfacts.jsph.pl";
        const query = {language: "en"};

        try {
            if (!args.length || args[0].toLowerCase() === 'random') {
                const link = new URL("/random.json", originLink);
                link.search = new URLSearchParams(query).toString();

                const res = await fetch(link);
                if (!res.ok) throw `Error Code: ${res.status}`;

                const { text } = await res.json();
                message.channel.send(text);

            } else if (args[0].toLowerCase() === 'today') {
                const link = new URL("/today.json", originLink);
                link.search = new URLSearchParams(query).toString();

                const res = await fetch(link);
                if (!res.ok) throw `Error Code: ${res.status}`;

                const { text } = await res.json();
                message.channel.send(text);

            } else {
                message.channel.send("Not a valid argument");
            } 
        } catch (error) {
            message.channel.send(`There was an error:\n\`${error}\``);
        }
    }
};
