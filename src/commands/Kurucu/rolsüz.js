const config = require("../../../config.json");

module.exports = {
    name: "rolsüz",
    aliases: ["rolsuz"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        let bg = message.guild.members.cache.filter(m => m.roles.cache.filter(r => r.id !== message.guild.id).size == 0)
        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.Guild.GuildOwnerRole)) return message.reply({ embeds: [embed.setDescription(`Komutu kullanabilmek için geçerli yetkiniz yok!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        if (args[0] == "ver") {
            bg.forEach(r => {
                r.roles.add(config.registration.unregistered)
            });
            message.reply({ embeds: [embed.setDescription("Sunucu da rolü olmayan \`"+ bg.size +"\` kullanıcıya kayıtsız rolü verildi.")] }).catch((err) => console.log(err), client.ytick(message))
        } else if (!args[0]) {
            message.reply({ embeds: [embed.setDescription("Sunucu da rolü olmayan \`"+ bg.size +"\` kullanıcı var.")] }).catch((err) => console.log(err), client.ytick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
        }
    }
}
