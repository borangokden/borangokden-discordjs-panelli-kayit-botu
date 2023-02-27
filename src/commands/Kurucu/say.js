const { MessageEmbed } = require("discord.js");
const config = require("../../../config.json")
module.exports = {
    name: 'say',
    aliases: ["sayy", "sayı"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.registration.staff)) return message.reply({ embeds: [embed.setDescription(`Komutu kullanabilmek için geçerli yetkiniz yok!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        let aktif = message.guild.members.cache.filter(member => member.presence && (member.presence.status != "offline")).size
        let uye = message.guild.memberCount
        var tag = message.guild.members.cache.filter(u => u.user.username.includes(config.registration.GuilDTag)).size;
        var tag2 = message.guild.members.cache.filter(u => u.user.username.includes(config.registration.GuilDTag2)).size;
        var tag3 = message.guild.members.cache.filter(u => u.user.username.includes(config.registration.GuilDTag3)).size;
        var toptag = tag + tag2 + tag3
        var role = (message.guild.members.cache.filter(yetkili => yetkili.roles.cache.has(config.roles.team)).size)
        let sesli = message.guild.members.cache.filter(x => x.voice.channel).size
        let boost = message.guild.premiumSubscriptionCount;
        embed.setThumbnail(message.guild.iconURL({ dynamic: true, size: 2048 }))
        message.reply({ embeds: [embed.setDescription(`
\`-\` Sunucumuzda **${uye}** kişi ve **${aktif}** aktif var.
\`-\` Seste **${sesli}** kullanıcı var.
\`-\` Sunucuda **${role}** taglı var.
\`-\` Sunucuya **${message.guild.premiumSubscriptionCount}** adet boost basılmış.
    `)] });
      
    }
}