module.exports = {
    name: "schooltime",
    async execute(channel) {
      const config = require("../config.json");
      const { MessageEmbed } = require("discord.js");
      const { subjects } = require("../json/schooltime.json");

      const webhooks = await channel.fetchWebhooks();
      const webhook = webhooks.get(config.schoolWebhook);

      async function schoolMsg(h, m, sub, mode) {
        const embed = new MessageEmbed()
          .setTitle(`School Alert | __${sub.subject}__`)
          .setColor(sub.color);
          //.setDescription(`It's **__${h}:${m}__**, enter the class!`)
          // .addFields(
          //   {name: "Google Meet Link", value: sub.gLink}
          // );

        if (mode === "remind") {
          embed.setDescription(`It's **__${h}:${m}__**, you got 10 minutes to enter the class!`);
        } else if (mode === "start") {
          embed.setDescription(`It's **__${h}:${m}__**, enter the class!`);
        }

        if (sub.gLink) {
          embed.addFields({name: "Google Meet Link", value: sub.gLink});
        } else {
          embed.addFields({name: "Go Eat", value: "Do it"});
        }
          
        await webhook.send({
          username: "School Alert System",
          avatarURL: config.schoolPic,
          embeds: [embed]
        });

        
      }

      // let subjectTime = [];
      // for (const subject in subjects) {
      //   subjectTime.push(subjects[subject]);
      // }


      setInterval(() => {
        //TODO add schooltime.json

        const date = new Date(); 
        const hour = date.getHours();
        const minute = date.getMinutes();
        const day = date.getDay();

        for (const subject of subjects) {
          const subTime = subject.timeStart.split(":");
          const subH = parseInt(subTime[0]);
          const subM = parseInt(subTime[1]);

          const remT = subject.timeRemind.split(":");
          const remH = parseInt(remT[0]);
          const remM = parseInt(remT[1]);
          
          switch (true) {
              case hour === subH && minute === subM && day === subject.dayStart:
                return schoolMsg(hour, minute, subject, "start");
                //break;

              case hour === remH && minute === remM && day === subject.dayStarts:
                return schoolMsg(hour, minute, subject, "remind");

          
              default:
                break;
          }  
        }


      }, 60 * 1000); 

    }
};