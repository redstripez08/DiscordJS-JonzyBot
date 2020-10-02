module.exports = {
    name: "pin",
    aliases: ["pinned"],
    description: "Pins and embeds the message.",
    usage: "<title>; <body>.\n You can pin other messages by using ID and prefix with !",
    cooldown: 30,
    guildOnly: false,
    args: true,
    execute(message, args) {
        const Discord = require("../node_modules/discord.js");
        //const config = require("../config.json");
        // const Classes = require('../classes');
        // const r  = config.role;
        // const Role = new Classes.Role(message, [r.BossMan, r.Officers]);

        //if (!Role.check) return Role.denied;

        return message.channel.send("Oof still working on this. Needs to be Role-Restricted");
        let authorUser = message.author.username;
        let authorAvatar = message.author.displayAvatarURL();

        let pinArgs = args.join(" ").trim().split(';')
        //console.log(pinArgs[1].trim().slice(1));
        const uhhh = pinArgs[1].trim().slice(1)

        if (pinArgs[1].trim().startsWith("!")) {
            (async() => {
                try {
                    const meh = await message.channel.messages.fetch(uhhh);
                    const pinEmbed = new Discord.MessageEmbed()
                        .setColor('#ff0000')
                        .setTitle(pinArgs[0])
                        .setAuthor(meh.author.username, meh.author.displayAvatarURL())
                        .setDescription(meh.content)
                        .setThumbnail('https://i.imgur.com/xJf6bqz.png')
                        .setTimestamp()
        
                    message.channel.send(pinEmbed)
                    .then(message => message.pin())
                    if (message.channel.type === "dm") return;
                    message.delete({timeout: 1000});                
    
                } catch (error) {
                    message.channel.send(error);
                }
            })();
            return;
        }

        //let pin2Args = pinArgs.split(';');
        const pinEmbed = new Discord.MessageEmbed()
            .setColor('#ff0000')
            .setTitle(pinArgs[0])
            .setAuthor(authorUser, authorAvatar )
            .setDescription(pinArgs[1])
            .setThumbnail('https://i.imgur.com/xJf6bqz.png')
            .setTimestamp()

        if (!pinArgs[1]) {
            message.reply('Add a Body. Remember to separate title from body with ;').then(msg => {
                if (message.channel.type == "dm") return;
                message.delete({timeout: 5000});
                msg.delete({timeout:5000});
            });
            return;
        }

        message.channel.send(pinEmbed)
        .then(message => message.pin())
        if (message.channel.type === "dm") return;
        message.delete({timeout: 1000});
    }
};