module.exports = {
    name: "ping",
    aliases: null,
    description: "ping",
    usage: null,
    cooldown: 0,
    guildOnly: false,
    args: false,
    role: null,
    execute(message, args) {
        const { MessageEmbed } = require("discord.js");

        (async() => {
            const m = await message.channel.send("Pinging");
            const ping = m.createdTimestamp - message.createdTimestamp;

            const pingEmbed = new MessageEmbed()
              .setTitle("🏓 Pong")
              .setDescription(`Your ping is: \`${ping}ms\``)
              .setColor("#ff0000");

            m.edit(pingEmbed)
        })();
    }
};
