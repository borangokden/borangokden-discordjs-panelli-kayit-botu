const { Client, Collection, Intents ,Discord ,MessageEmbed ,Permissions} = require("discord.js");
const client = global.client = new Client({
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MEMBERS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_VOICE_STATES,
    Intents.FLAGS.GUILD_PRESENCES,
  ]
});
const { interaction, MessageActionRow, MessageSelectMenu ,Message} = require('discord.js');
const { MessageButton } = require("discord.js")
const dotenv = require("dotenv");
dotenv.config();
const { readdir } = require("fs");
require("moment-duration-format");
const db = require("quick.db");
const moment = require("moment");
moment.locale("tr");
const config = require("./config");
const commands = client.commands = new Collection();
const aliases = client.aliases = new Collection();
client.cooldown = new Map();
client.commandblocked = [];

require("./src/helpers/function")(client);

readdir("./src/commands/", (err, files) => {
  if (err) console.error(err)
  files.forEach(f => {
    readdir("./src/commands/" + f, (err2, files2) => {
      if (err2) console.log(err2)
      files2.forEach(file => {
        let prop = require(`./src/commands/${f}/` + file);
        console.log(`[BORANGÖKDEN-COMMAND] ${prop.name} yüklendi!`);
        commands.set(prop.name, prop);
        prop.aliases.forEach(alias => {
          aliases.set(alias, prop.name);
        });
      });
    });
  });
});

readdir("./src/events", (err, files) => {
  if (err) return console.error(err);
  files.filter((file) => file.endsWith(".js")).forEach((file) => {
    let prop = require(`./src/events/${file}`);
    if (!prop.conf) return;
    client.on(prop.conf.name, prop);
    console.log(`[BORANGÖKDEN-EVENT] ${prop.conf.name} yüklendi!`);
  });
});

client.login(config.bot.token)
  .then(() => console.log(`[BORANGÖKDEN-BOT] Discord APİ bağlantısı başarıyla kuruldu, ${client.user.username} olarak giriş yaptı!`))
  .catch((err) => console.log(`[BORANGÖKDEN-BOT] Bot Giriş yapamadı sebep: ${err}`));

  client.on("interactionCreate",async (interaction, message) => {

    if(interaction.isButton()) {
  
      if(interaction.customId === "rol") {
        let member = interaction.member
     {
          await interaction.reply({ content: `
Üzeriniz de bulunan rollerin listesi;
${(await interaction.guild.members.cache.get(member.id).roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(' ') ? await interaction.guild.members.cache.get(member.id).roles.cache.filter(a => a.name !== '@everyone').map(a => a).join(', ') : 'Herhangi bir rolünüz yok.')}`, ephemeral: true });
        };
      };
      
      if(interaction.customId === "sunucu") {
        let member = interaction.member
     {
          await interaction.reply({ content: `
- Sunucumuzun oluşturulma tarihi: \`${moment(interaction.guild.createdAt).locale("tr").format("LLL")}\`
- Sunucumuz da ki toplam kullanıcı sayısı: \`${(interaction.guild.memberCount)}\`
- Sesli kanallardaki kullanıcı sayımız: \`${(interaction.guild.members.cache.filter((x) => x.voice.channel).size)}\``, ephemeral: true });
        };
      };
      
      
      if(interaction.customId === "uye") {
        let member = interaction.member
     {
          await interaction.reply({ content: `${member.toString()}, üyesinin \`${moment(Date.now() + (1000*60*60*3)).format("LLL")}\``, ephemeral: true });
        };
      };
  
      if(interaction.customId === "kayıtsız") {
        let member = interaction.member
     {
      await member.roles.set([config.registration.unregistered]).catch()
      await member.setNickname(config.registration.autonickname);
      await interaction.reply({ content: `${member.toString()} başarıyla seni kayıtsıza attım!`, ephemeral: true });
        };
      };
  
  
    }})
  
