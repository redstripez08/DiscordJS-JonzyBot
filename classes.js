const Discord = require("discord.js");
const { Prefix } = require("./config.json");

class Cooldown {
    constructor(message, command, cooldowns) {
        this.message = message;
        this.command = command;
        this.cooldowns = cooldowns;
    }

    get check() {
        if (!this.cooldowns.has(this.command.name)) this.cooldowns.set(this.command.name, new Discord.Collection());

        const timestamps = this.cooldowns.get(this.command.name);
        const cooldownAmount = (this.command.cooldown || 0) * 1000;
        const now = Date.now();

        if (timestamps.has(this.message.author.id)) {
            const expirationTime = timestamps.get(this.message.author.id) + cooldownAmount;

            if (now < expirationTime) {
                const timeLeft = (expirationTime - now) / 1000;

                (async() => {
                    try {
                        const m = await this.message.channel.send(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${this.command.name}\` command.`);
                        if (this.message.channel.type === "dm") return false;
                        this.message.delete({timeout: 10000});
                        m.delete({timeout: 10000});
                    } catch (error) {console.error(error);}    
                })();

                return false;
            }

        } 

        timestamps.set(this.message.author.id, now);
        setTimeout(() => timestamps.delete(this.message.author.id), cooldownAmount); 
        return true;

    }

}


class Role {
    constructor(message, command) {
        this.message = message;
        this.command = command;
    }

    get check() {
        if (!this.command.role || this.message.channel.type === 'dm') return true;
        for (const role of this.command.role) {
            if (this.message.member.roles.cache.has(role.id)) return true;
        }
        return false;
    }

    get denied() {
        const roleName = [];
        for (const role of this.command.role) {
            roleName.push(role.name);
        }
        return this.message.reply(`You need \`${roleName.join(', ')}\` role(s) to use this command.`);
    }

}


class ArgsClass {
    constructor(message, command, args) {
        this.message = message;
        this.command = command;
        this.args = args;
    }

    get check() {
        if (this.command.args && !this.args.length) { 
            let reply = "You didn't provide any arguments!";
            if (this.command.usage) reply += `\nThe proper usage would be: \`${Prefix}${this.command.name} ${this.command.usage}\``;
            this.message.reply(reply);
            return false;
        }
        return true;
    }

}

module.exports = { 
    Cooldown, 
    Role, 
    ArgsClass 
};