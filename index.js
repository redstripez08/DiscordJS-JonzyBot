console.log("Initializing Client...");

const Discord = require('discord.js');
const client = new Discord.Client({ws:{intents: Discord.Intents.ALL}});
const fs = require("fs");
const config = require("./config.json");
const secret = require("./secret.json");
const package = require("./package.json");
const cooldowns = new Discord.Collection();
client["commands"] = new Discord.Collection();

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

const { Prefix }  = config;
const { Token }   = secret;
const { version } = package;

client.on('ready', () => {
  console.log(`JonzyBot Activated.\nVersion ${version}\n`);
});

client.on('message', message => {
  if (!message.content.startsWith(Prefix) || message.author.bot) return;

  const args = message.content.slice(Prefix.length).trim().split(/ +/g);
  const commandName = args.shift().toLowerCase();
  const command = client.commands.get(commandName) || 
        client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

  if (!command) return message.channel.send("Not a valid command!");

  try {
    command.execute(message, args);
  } catch (err) {
    message.channel.send(`There was an error: \n\`${err}\``);
    console.error(err)
  }

});

client.login(Token);
