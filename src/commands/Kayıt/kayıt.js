const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const moment = require("moment");
const db = require("quick.db");
require("moment-duration-format");
const config = require("../../../config.json")

module.exports = {
    name: "kayıt",
    aliases: ["k"],
    execute: async (client, message, args, embed, author, channel) => {
        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.registration.staff)) return message.reply({ embeds: [embed.setDescription(`Komutu kullanabilmek için geçerli yetkiniz yok!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
    const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    var name = args[1]
    const age = args[2]
    
    var Erkek = new MessageButton()
    .setLabel("Erkek")
    .setCustomId("erkek")
    .setStyle("SUCCESS")


    var Kadın = new MessageButton()
    .setLabel("Kadın")
    .setCustomId("kadin")
    .setStyle("SUCCESS")

    var Bb = new MessageButton()
    .setLabel("İptal")
    .setCustomId("iptal")
    .setStyle("DANGER")

    const row = new MessageActionRow()
    .addComponents([Erkek, Kadın, Bb])


embed.setDescription(`
${member.toString()} kullanıcısını butonlarla etkileşime geçerek kayıt edebilirsiniz.

Unutma kayıt etmek için sadece 30 saniyeniz var.

\`\`\`NOT: Kullanıcının cinsiyetini doğru bir şekilde seçmenizi önemle rica ederiz!\`\`\`
`)

    let msg = await message.channel.send({ embeds: [embed], components: [row] });
    var filter = (button) => button.user.id === message.author.id;
   
    let collector = await msg.createMessageComponentCollector({ filter, time: 30000 })
    collector.on("collect", async (button) => {

      if(button.customId === "erkek") {
        await button.deferUpdate();
        const guild = message.guild
            if (!name) return message.reply({ embeds: [embed.setDescription("Geçerli bir isim belirtmelisin!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
            if (!age) return message.reply({ embeds: [embed.setDescription("Geçerli bir yaş belirtmelisin!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
            if (isNaN(age)) return message.reply({ embeds: [embed.setDescription("Belirtilen yaş geçerli rakamlardan oluşsun!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
            if (age < config.registration.minage) return message.reply({ embeds: [embed.setDescription("Kullanıcı için belirtilen yaş minimum yaştan küçük!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
            if (config.registration.purchase) {
                if (!member.username.includes(config.registration.GuilDTag) && !member.roles.cache.has(config.roles.viprole && config.roles.boosterrole && config.roles.musiciansrole && config.roles.designerrole && config.roles.team)) {
                    return message.reply({ embeds: [embed.setDescription(`Şuanlık taglı alımdayız! (${config.registration.TagSymbol})`)] });
                }
            }
            let erkek = db.get(`erkek_${author.id}`) || 0;
            let kadın = db.get(`kadın_${author.id}`) || 0;
            let toplam = db.get(`toplam_${author.id}`) || 0;
            await guild.members.cache.get(member.id).setNickname(`${config.registration.TagSymbol} ${name} ${config.registration.symbol} ${age}`);
            db.add(`erkek_${author.id}`, 1)
            db.add(`toplam_${author.id}`, 1)
                  const names = db.get(`isimler_${member.id}`)
            db.push(`isimler_${member.id}`, ` \`${config.registration.TagSymbol} ${name} ${config.registration.symbol} ${age}\` (<@&${config.registration.oneman}>)`);
            db.push(`kke_${member.id}`, `${author} \`${moment(Date.now()).format("LLL")}\` (<@&${config.registration.oneman}>)`)
            await guild.members.cache.get(member.id).roles.add(config.registration.man);
            await guild.members.cache.get(member.id).roles.remove(config.registration.unregistered)
            const borangökden = client.users.cache.get(config.bot.owner);
        const bgerkekemb = new MessageEmbed().setColor(message.member.displayHexColor).setAuthor({name: message.member.displayName, iconURL: author.avatarURL({ dynamic: true, size: 2048 })}).setFooter({text: (`Toplam kayıt: **${toplam}** (${kadın} Kadın, ${erkek} Erkek)`) , iconURL: borangökden.avatarURL({ dynamic: true, size: 2048 })})
        if (!names) {
            bgerkekemb.setDescription(`Kullanıcının ismi \`${name} ${config.registration.symbol} ${age}\` olarak değiştirildi ve <@&${config.registration.oneman}> rolü verilerek kayıt edildi.`) 
        } else {
            bgerkekemb.setDescription(`Kullanıcı başarıyla <@&${config.registration.oneman}> olarak kayıt edildi!\n\n Kullanıcının toplamda " ${names.length} " isim kayıtı görüntülendi.\n${names.map((data) => `${data}`).join("\n")}`) 
        }
        client.channels.cache.get(config.logs.kayıtlog).send({ embeds: [embed.setDescription(`${member} kullanıcısına ${message.author} tarafından <@&${config.registration.oneman}> olarak kayıt edildi.
      
        \`Kullanıcı:\` ${member} - (**${member.id}**)
        \`İsim ve Yaşı:\` ${name} | ${age}
        \`Yetkili:\` ${message.author} - (**${message.author.id}**)
        \`Cinsiyet:\` <@&${config.registration.oneman}>     
        \`Tarih:\` ${moment(Date.now()).format("LLL")}`)] });
    
        client.channels.cache.get(config.channels.chat).send(`${config.emojis.tada} ${member} kullanıcısı sunucumuza kayıt oldu ona **Merhaba** diyelim!`).then((e) => setTimeout(() => { e.delete(); }, 15000));
    
    
msg.edit({
  embeds : [bgerkekemb],
  components : []
})
      
      }

  if(button.customId === "kadin") {
    await button.deferUpdate();
    const guild = message.guild
        if (!name) return message.reply({ embeds: [embed.setDescription("Geçerli bir isim belirtmelisin!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (!age) return message.reply({ embeds: [embed.setDescription("Geçerli bir yaş belirtmelisin!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (isNaN(age)) return message.reply({ embeds: [embed.setDescription("Belirtilen yaş geçerli rakamlardan oluşsun!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (age < config.registration.minage) return message.reply({ embeds: [embed.setDescription("Kullanıcı için belirtilen yaş minimum yaştan küçük!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (config.registration.purchase) {
            if (!member.username.includes(config.registration.GuilDTag) && !member.roles.cache.has(config.roles.viprole && config.roles.boosterrole && config.roles.musiciansrole && config.roles.designerrole && config.roles.team)) {
                return message.reply({ embeds: [embed.setDescription(`Şu anlık taglı alımdayız! (${config.registration.TagSymbol})`)] });
            }
        }
        await guild.members.cache.get(member.id).setNickname(`${config.registration.TagSymbol} ${name} ${config.registration.symbol} ${age}`);
        db.add(`kadın_${author.id}`, 1)
        db.add(`toplam_${author.id}`, 1)
              const names = db.get(`isimler_${member.id}`)
        db.push(`isimler_${member.id}`, ` \`${config.registration.TagSymbol} ${name} ${config.registration.symbol} ${age}\` (<@&${config.registration.onewoman}>)`);
        db.push(`kke_${member.id}`, `${author} \`${moment(Date.now()).format("LLL")}\` (<@&${config.registration.onewoman}>)`)
        await guild.members.cache.get(member.id).roles.add(config.registration.woman);
        await guild.members.cache.get(member.id).roles.remove(config.registration.unregistered)
        const borangökden = client.users.cache.get(config.bot.owner);
    const bgkadinemb = new MessageEmbed().setColor(message.member.displayHexColor).setAuthor({name: message.member.displayName, iconURL: author.avatarURL({ dynamic: true, size: 2048 })}).setFooter({text: (`Toplam kayıt: **${toplam}** (${kadın} Kadın, ${erkek} Erkek)`) , iconURL: borangökden.avatarURL({ dynamic: true, size: 2048 })})
    if (!names) {
        bgkadinemb.setDescription(`Kullanıcının ismi \`${name} ${config.registration.symbol} ${age}\` olarak değiştirildi ve <@&${config.registration.onewoman}> rolü verilerek kayıt edildi.`) 
    } else {
        bgkadinemb.setDescription(`Kullanıcı başarıyla <@&${config.registration.onewoman}> olarak kayıt edildi!\n\n Kullanıcının toplamda " ${names.length} " isim kayıtı görüntülendi.\n${names.map((data) => `${data}`).join("\n")}`) 
    }
    client.channels.cache.get(config.logs.kayıtlog).send({ embeds: [embed.setDescription(`${member} kullanıcısına ${message.author} tarafından <@&${config.registration.onewoman}> olarak kayıt edildi.
  
    \`Kullanıcı:\` ${member} - (**${member.id}**)
    \`İsim ve Yaşı:\` ${name} | ${age}
    \`Yetkili:\` ${message.author} - (**${message.author.id}**)
    \`Cinsiyet:\` <@&${config.registration.onewoman}>     
    \`Tarih:\` ${moment(Date.now()).format("LLL")}`)] });

    client.channels.cache.get(config.channels.chat).send(`${config.emojis.tada} ${member} kullanıcısı sunucumuza kayıt oldu ona **Merhaba** diyelim!`).then((e) => setTimeout(() => { e.delete(); }, 15000));


msg.edit({
  embeds: [bgkadinemb],
  components : []
})  

    }

 if(button.customId === "iptal") {   
    await button.deferUpdate();
    const iptal = new MessageEmbed()
    .setDescription(`${member} kullanıcısının kayıt işlemi ${message.author} yetkilisi tarafından iptal edildi.`) 

msg.edit({
  embeds: [iptal],
  components : []
})  
    }


  })
  }
};
