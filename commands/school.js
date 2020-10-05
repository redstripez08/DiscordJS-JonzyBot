module.exports = {
    name: "school",
    aliases: null,
    description: "Gets A list of school-related things.",
    usage: null,
    cooldown: 10,
    guildOnly: false,
    args: false,
    role: null,
    execute(message, args) {
        const { MessageEmbed } = require("discord.js");

        if (!args.length) {
            const schoolEmbed = new MessageEmbed()
                .setTitle("School Stuff")
                .setColor("#00ff00")
                .setDescription("__Usage: *school <option>__")
                .addFields(
                    {name: "emojis", value: "Sends commonly used emojis."},
                    {name: "prayer", value: "Sends random Prayer."},
                    {name: "homework", value: "Gets Homework."}
                )
                
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
            
                default:
                    message.channel.send("Not an option.");
                    break;
            }
        }

       
    }
};