const { MessageEmbed } = require('discord.js')
const db = require("quick.db");
const config = require("../../../config.json")
const moment = require("moment");
moment.locale("tr");

module.exports = {
    name: "kayıtsız",
    aliases: ["unreg", "unregister", "unregistered"],
    execute: async (client, message, args, author, channel, guild) => {
        const member = message.guild.members.cache.get(message.mentions.users.first()) || message.guild.members.cache.get(args[0]);

        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.registration.staff) && !message.member.roles.cache.has(config.Guild.GuildOwnerRole)) return message.reply({ embeds: [embed.setDescription(`Komutu kullanabilmek için geçerli yetkiniz yok!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (!member) return message.reply('Geçerli bir kullanıcı belirtmelisin.').then(msg => { setTimeout(() => { msg.delete() }, 10000); });
        if (member.roles.cache.has(config.registration.unregistered)) return message.reply('Kullanıcı zaten kayıtsız.').then(msg => { setTimeout(() => { msg.delete() }, 10000); });
        if (member.id == message.member.id) return message.reply('Kendinizi kayıtsıza atamazsınız.').then(msg => { setTimeout(() => { msg.delete() }, 10000); });
        if (member.bot) return message.reply('Botları kayıtsıza atamazsınız.').then(msg => { setTimeout(() => { msg.delete() }, 10000); });

        await member.roles.set([config.registration.unregistered]).catch()
        await member.setNickname(config.registration.autonickname);
        let embed = new MessageEmbed()
            .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL({ dynamic: true }) })
            .setColor('RANDOM')
            .setDescription(`${member} kullanıcısı başarıyla kayıtsıza (<@&${config.registration.unregistered}>) atıldı.`)
        message.reply({ embeds: [embed] })
    }
}