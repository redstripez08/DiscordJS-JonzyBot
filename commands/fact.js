module.exports = {
    name: "fact",
    aliases: null,
    description: "Sends random fact. Leave blank for a random fact, type today for fact of the day.",
    usage: '<empty or "today" >.',
    cooldown: 0,
    guildOnly: false,
    args: false,
    role: null,
    execute(message, args) {
        const fetch = require('node-fetch');
        console.log(args, args[0]);
        (async() => {
            try {
                if (!args.length) {
                    const link = "https://uselessfacts.jsph.pl/random.json?language=en";
                    const res = await fetch(link);
                    if (res.status < 200 || res.status >= 300) throw `Error Code: ${res.status}`;
                    const { text } = await res.json();
                    message.channel.send(text);
                } else if (args[0].toLowerCase() === 'today') {
                    const link = "https://uselessfacts.jsph.pl/today.json?language=en";
                    const res = await fetch(link);
                    if (res.status < 200 || res.status >= 300) throw `Error Code: ${res.status}`;
                    const { text } = await res.json();
                    message.channel.send(text);
                } else {
                    message.channel.send("Not a valid argument");
                } 
            } catch (error) {
                message.channel.send(`There was an error:\n\`${error}\``);
            }
        })();
    }
};