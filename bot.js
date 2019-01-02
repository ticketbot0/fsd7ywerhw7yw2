const Discord = require("discord.js");
const client = new Discord.Client();
const prefix = "t+";





//fun
function clean(text) {
    if (typeof(text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
        return text;
}


//console & playing !
client.on('ready', () => {
    console.log(`${client.user.tag} Is Online !`) 
    client.user.setGame(`${prefix}help`)
});





//commands !
client.on("message", (message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;
  
    if (message.content.toLowerCase().startsWith(prefix + `help`)) {
      const embed = new Discord.RichEmbed()
      .setTitle(`:mailbox_with_mail: Help`)
      .setColor(0xCF40FA)
      .setDescription(`مرحباٌ! I'm ${client.user.username}, هذا البوت خاص للتذاكر لمساعره فريق العمل و هذه هي الاوامر:`)
      .addField(`Tickets`, `[${prefix}new]() > لفتح تذكره جديده و منشنه اعضاء دعم السرفر \n[${prefix}close]() > لغلق التذكره التي تم فتحها من قبل الدعم`)
      .addField(`Other`, `[${prefix}help]() > لرؤيه قائمه الاوامر \n[${prefix}ping]() > لمعرفه البينق الخاص للبوت \n[${prefix}about]() > لمعرفه كل شي عن البوت`)
      message.channel.send({ embed: embed });
    }
  
    if (message.content.toLowerCase().startsWith(prefix + `ping`)) {
      message.channel.send(`Hoold on!`).then(m => {
      m.edit(`:ping_pong: Wew, made it over the ~waves~ ! **Pong!**\nMessage edit time is ` + (m.createdTimestamp - message.createdTimestamp) + `ms, Discord API heartbeat is ` + Math.round(client.ping) + `ms.`);
      });
  }
  
  if (message.content.toLowerCase().startsWith(prefix + `new`)) {
      const reason = message.content.split(" ").slice(1).join(" ");
      if (!message.guild.roles.exists("name", "Support Team")) return message.channel.send(`هذا السيرفر ليس لديه \`Support Team\` صنع رتبة, لذلك لن يتم فتح التذكرة.\nاذا كنت تمتلك administrator, إنشاء اسم بهذا الاسم بالضبط وإعطائه للمستخدمين الذين يمكنهم مشاهدة التذاكر.`);
      if (message.guild.channels.exists("name", "ticket-" + message.author.id)) return message.channel.send(`انت بالفعل لديك تذكره مفتوحه.`);
      message.guild.createChannel(`ticket-${message.author.id}`, "text").then(c => {
          let role = message.guild.roles.find("name", "Support Team");
          let role2 = message.guild.roles.find("name", "@everyone");
          c.overwritePermissions(role, {
              SEND_MESSAGES: true,
              READ_MESSAGES: true
          });
          c.overwritePermissions(role2, {
              SEND_MESSAGES: false,
              READ_MESSAGES: false
          });
          c.overwritePermissions(message.author, {
              SEND_MESSAGES: true,
              READ_MESSAGES: true
          });
          let mrx = new Discord.RichEmbed()
          .setColor('RANDOM')
          .setAuthor(message.author.tag,message.author.avatarURL)
          .setDescription(`:white_check_mark: تم إنشاء تذكرتك, #${c.name}.`)
          .setTimestamp()
          message.channel.sendEmbed(mrx);
          const embed = new Discord.RichEmbed()
          .setColor(0xCF40FA)
          .addField(`مرحباً ${message.author.username}!`, `من فضلك وضح لماذا قمت بفتح التذكره مع بعض التفاصيل. مسؤلي السرفر سوف يكونوا موجودين في اسرع وقت للمساعده.`)
          .setTimestamp();
          c.send({ embed: embed });
      }).catch(console.error);
  }
  if (message.content.toLowerCase().startsWith(prefix + `close`)) {
      if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`لا يمكنك استخدام أمر الإغلاق خارج قناة التذاكر.`);
  
      message.channel.send(`هل أنت متاكد؟ بمجرد تأكيد, لا يمكنك عكس هذا العمل!!\nللتأكيد ، اكتب \`-confirm\`. سوف ينتهي المهلة خلال 10 ثوانٍ ويتم إلغاؤها.`)
      .then((m) => {
        message.channel.awaitMessages(response => response.content === '-confirm', {
          max: 1,
          time: 10000,
          errors: ['time'],
        })
        .then((collected) => {
            message.channel.delete();
          })
          .catch(() => {
            m.edit('انتهى إغلاق التذاكر ، لم يتم إغلاق التذكرة.').then(m2 => {
                m2.delete();
            }, 3000);
          });
      });
  }
  
  });
  
  client.on('message', message => {
      if (message.content.startsWith(prefix + 'about')) {
      if (message.author.bot) return
      if (!message.guild) return message.reply('**:x: This Command Only In Server**')
      let embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setTitle(':mailbox_with_mail: about')
      .setDescription(`I am ${client.user.username}, and I will try my best to help everyone! If I am in a discord server, people can use me to create tickets in order`)
      .setFooter(`${client.user.username}`)
      message.author.sendEmbed(embed)
      }
  });
  








var prefix = "+";
var adminprefix = '+'
const developers = ["307938325799501824"]
client.on('message', message => {
    var argresult = message.content.split(` `).slice(1).join(' ');
      if (!developers.includes(message.author.id)) return;

  if (message.content.startsWith(adminprefix + 'setg')) {
    client.user.setGame(argresult);
      message.channel.send(`تم التغيير   ${argresult}**`)
  } else
     if (message.content === (adminprefix + "leave")) {
    message.guild.leave();
  } else
  if (message.content.startsWith(adminprefix + 'setw')) {
  client.user.setActivity(argresult, {type:'WATCHING'});
      message.channel.send(`تم التغيير   ${argresult}**`)
  } else
  if (message.content.startsWith(adminprefix + 'setl')) {
  client.user.setActivity(argresult , {type:'LISTENING'});
      message.channel.send(`تم التغيير   ${argresult}**`)
  } else
  if (message.content.startsWith(adminprefix + 'sets')) {
    client.user.setGame(argresult, "https://www.twitch.tv/One");
      message.channel.send(`تم التغيير`)
  }
  if (message.content.startsWith(adminprefix + 'setname')) {
  client.user.setUsername(argresult).then
      message.channel.send(`Changing The Name To ..**${argresult}** `)
} else
if (message.content.startsWith(adminprefix + 'setavatar')) {
  client.user.setAvatar(argresult);
    message.channel.send(`Changing The Avatar To :**${argresult}** `);
}
});
  
  
  









///TOKEN
client.login(process.env.BOT_TOKEN);
