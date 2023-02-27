const config = require("../../../config.json")
const db = require('quick.db');
const Discord = require("discord.js");
const moment = require("moment");
const limit = new Map();
moment.locale("tr");
module.exports = {
    name: "butonlu-panel",
    aliases: ["butonlu", "panel"],

    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.Guild.GuildOwnerRole)) return message.reply({ embeds: [embed.setDescription(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
  
      let button1 = new Discord.MessageButton()
      .setStyle('SUCCESS')
      .setLabel('Üzerinizde ki Roller')
      .setCustomId('rol')
  
      let button2 = new Discord.MessageButton()
      .setStyle('SUCCESS')
      .setLabel('Sunucu Bilgi')
      .setCustomId('sunucu')  

      let button3 = new Discord.MessageButton()
      .setStyle('SUCCESS')
      .setLabel('Kullanıcı')
      .setCustomId('uye')  


      let button4 = new Discord.MessageButton()
      .setStyle('SUCCESS')
      .setLabel('Kayıtsız')
      .setCustomId('kayıtsız')
  
     
  
  
      let row = new Discord.MessageActionRow()
          .addComponents(button1, button2, button3, button4)
      
    
  
      message.channel.send({ content:`${config.emojis.tada} Aşağıda ki butonlarla etkileşime geçebilirsiniz..

**Üzerinizde ki Roller**: Üzeriniz de bulunan tüm rolleri görüntülersiniz.
**Sunucu Bilgi**: Sunucu hakkında detaylı bilgi için tıkla.
**Kullanıcı**: Sunucuya giriş tarihinizi gösterir.
**Kayıtsız**: Sizi kayıtsıza atar ihtiyacınız yoksa kullanmayınız ban sebebidir..
      `, components: [row]  }) ;
  
  
  
  
    }
}
