module.exports = {
    name: "school",
    aliases: null,
    description: "Gets A list of school-related things.",
    usage: null,
    cooldown: 0,
    guildOnly: false,
    args: false,
    role: null,
    execute(message, args) {
        const { Prefix } = require("../config.json");
        const { MessageEmbed, MessageAttachment } = require("discord.js");

        if (!args.length) {
            const schoolEmbed = new MessageEmbed()
                .setTitle("School Stuff")
                .setColor("#00ff00")
                .setDescription(`__Usage: ${Prefix}school <option>__`)
                .addFields(
                    {name: "emojis", value: "Sends commonly used emojis."},
                    {name: "prayer", value: "Sends random Prayer."},
                    {name: "homework", value: "Gets Homework."},
                    {name: "schedule", value: "Sends School Schedule"},
                    {name: "module", value: "Sends the google drive link to modules."}
                );
                
            message.channel.send(schoolEmbed);
        } else {
            switch (args[0].toLowerCase()) {
                case "emoji":
                case "emoji":
                    const msg = "Commonly Used Emojis:\n" +
                    "\`\`\`md\n" + 
                    "Hands Up     =>    🖐️\n" +
                    "Thumbs Up    =>    👍\n" +
                    "Thumbs Down  =>    👎" +
                    "\`\`\`";
            
                    message.channel.send(msg);
                    break;

                case "hw":
                case "homework":
                case "ass":
                case "assign":
                case "assignment":
                    message.channel.send("something");
                    break;

                case "module":
                case "modules":
                    message.channel.send("\`\`\`\nhttps://drive\`\`\`");
                    break;

                case "sched":
                case "schedule":
                    const schedAttachment = new MessageAttachment('./Sched.jpg');
                    message.channel.send(schedAttachment);
                    break;
            
                default:
                    message.channel.send("Not an option.");
                    break;
            }
        }

       
    }
};
