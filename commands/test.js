module.exports = {
    name: "test",
    aliases: ["t"],
    description: "To test stuff",
    usage: "none",
    cooldown: 0,
    guildOnly: false,
    args: false,
    role: null,
    execute(message, args) {
        
        if (!args.length) return message.channel.send("BIG CHUNGUS");

        message.channel.send(args);




    }
};