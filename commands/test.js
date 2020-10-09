module.exports = {
    name: "test",
    aliases: ["t"],
    description: "To test stuff",
    usage: "none",
    cooldown: 0,
    guildOnly: false,
    args: false,
    role: null,
    async execute(message, args) {
        
        const channel = message.client.channels.cache.get("num");
        const webhooks = await channel.fetchWebhooks();
        const webhook = webhooks.first();
        //console.log(webhook);

        const embed = new MessageEmbed()
            .setTitle("Stuff")
            .setColor("ff0000")
            .setDescription(args.join(" "));
        
        await webhook.send("Webhook test", {
			username: 'Updates',
            embeds: [embed]
		});
        return;
        
        if (!args.length) return message.channel.send("BIG CHUNGUS");

        message.channel.send(args);




    }
};
