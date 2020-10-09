module.exports = {
    name: "update",
    aliases: ["updates"],
    description: "Sends recent updates",
    usage: null,
    cooldown: 0,
    guildOnly: false,
    args: false,
    role: null,
    execute(message, args) {
        const { Updates } = require('../config.json');

        message.channel.send(Updates.join(",\n"));
    }
};