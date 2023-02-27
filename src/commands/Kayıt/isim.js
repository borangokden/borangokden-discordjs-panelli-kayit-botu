const Discord = require("discord.js");
const db = require("quick.db");
const config = require("../../../config.json")
const moment = require("moment");
moment.locale("tr");
module.exports = {
    name: "isim",
    aliases: ["i", "nickname"],

    execute: async (client, message, args, embed, author, channel, guild) => {
        var member = message.mentions.users.first() || guild.members.cache.get(args[0]);
        var name = args[1]
        const age = args[2]

        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.registration.staff) && !message.member.roles.cache.has(config.Guild.GuildOwnerRole)) return message.reply({ embeds: [embed.setDescription(`Bu komutu kullanabilmek için öncelikle gerekli yetkin olmalı!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (!member) return message.reply({ embeds: [embed.setDescription("Geçerli bir kullanıcı belirtmelisin!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (!name) return message.reply({ embeds: [embed.setDescription("Geçerli bir isim belirtmelisin!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (!age) return message.reply({ embeds: [embed.setDescription("Geçerli bir yaş belirtmelisin!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (isNaN(age)) return message.reply({ embeds: [embed.setDescription("Belirttiğiniz yaş rakamlardan oluşsun!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (age < config.registration.minage) return message.reply({ embeds: [embed.setDescription("Kullanıcı için belirtilen yaş minimum yaştan küçük!")] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        db.push(`isimler_${member.id}`, ` \`${config.registration.TagSymbol} ${name} ${config.registration.symbol} ${age}\` İsim Değiştirme`);
        await guild.members.cache.get(member.id).setNickname(`${config.registration.TagSymbol} ${name} ${config.registration.symbol} ${age}`);
        message.reply({ embeds: [embed.setDescription(`${member} kullanıcısının yeni ismi \`${config.registration.TagSymbol} ${name} ${config.registration.symbol} ${age}\` olarak değiştirildi.`)] }).catch((err) => console.log(err), client.ytick(message))
        client.channels.cache.get(config.logs.isimlog).send({ embeds: [embed.setDescription(`${member} kullanıcısının ismi değiştirildi.
      
        \`Değiştirilen Kullanıcı:\` ${member} - (**${member.id}**)
        \`Yeni İsim ve Yaşı:\` ${name} | ${age}
        \`Değiştiren Yetkili:\` ${message.author} - (**${message.author.id}**)
        \`Değiştirilme Tarihi:\` ${moment(Date.now()).format("LLL")}`)] });
    }
}
