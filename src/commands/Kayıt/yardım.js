const moment = require("moment");
require("moment-duration-format");
const config = require("../../../config.json")

module.exports = {
    name: "yardım",
    aliases: ["y", "help"],

    execute: async (client, message, args, embed, author, channel, guild) => {
        message.reply({ embeds: [embed.setDescription(`
\`
- ${config.bot.prefix}kke [@BoranGökden/ID]
- ${config.bot.prefix}isimler [@BoranGökden/ID]
- ${config.bot.prefix}kayıtsız-etiketle
- ${config.bot.prefix}ping
- ${config.bot.prefix}erkek [@BoranGökden/ID] (isim-yaş)
- ${config.bot.prefix}kadın [@BoranGökden/ID] (isim-yaş)
- ${config.bot.prefix}isim [@BoranGökden/ID] (isim-yaş)
- ${config.bot.prefix}kayıtsız
- ${config.bot.prefix}sıfırla
- ${config.bot.prefix}top-kayıt [@BoranGökden/ID]
- ${config.bot.prefix}müzisyen [@BoranGökden/ID]
- ${config.bot.prefix}sponsor [@BoranGökden/ID]
- ${config.bot.prefix}vip [@BoranGökden/ID]
- ${config.bot.prefix}veri-sıfırla [@BoranGökden/ID]
- ${config.bot.prefix}eval (kod)
- ${config.bot.prefix}rolsüz (ver)
- ${config.bot.prefix}reboot\`
`)] }).catch((err) => console.log(err), client.ytick(message)).then((e) => setTimeout(() => { e.delete(); }, 60000));

    }
}
