const config = require("../../../config.json");

module.exports = {
    name: "ping",
    aliases: ["pong", "pingb"],
    execute: async (client, message, args, embed, author, channel, guild) => {
        if (!message.member.permissions.has("ADMINISTRATOR") && !message.member.roles.cache.has(config.Guild.GuildOwnerRole)) return message.reply({ embeds: [embed.setDescription(`Komutu kullanabilmek için geçerli yetkiniz yok!`)] }).catch((err) => console.log(err), client.tick(message)).then((e) => setTimeout(() => { e.delete(); }, 10000));
            message.reply({ embeds: [embed.setDescription(`Ping, pong: **${client.ws.ping}** ms.`)] })
    
    }
}
