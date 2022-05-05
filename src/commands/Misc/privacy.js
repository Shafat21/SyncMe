// Dependencies
const { MessageEmbed } = require('discord.js'),
    Command = require('../../structures/Command.js');

/**
 * Privacy command
 * @extends {Command}
 */
class Privacy extends Command {
    /**
     * @param {Client} client The instantiating client
     * @param {CommandData} data The data for the command
     */
    constructor(bot) {
        super(bot, {
            name: 'privacy',
            dirname: __dirname,
            aliases: ['priv'],
            botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
            description: 'Sends a link to the privacy policy.',
            usage: 'privacy',
            cooldown: 2000,
            slash: true,
        });
    }

    /**
     * Function for recieving message.
     * @param {bot} bot The instantiating client
     * @param {message} message The message that ran the command
     * @readonly
     */
    async run(bot, message) {
        // Send link to privacy policy
        const embed = new MessageEmbed()
            .setTitle(`Privacy Policy of ${bot.user.username}`)
            .setColor("#2f3136")
            .setThumbnail(bot.user.displayAvatarURL({ format: 'png' }))
            .setDescription(`${bot.user.username} may collect END USER DATA as part of its message logging.\n It's worth noting that the information gathered is saved on the ${bot.user.username}'s server. [VENOM#9208](https://discord.com/users/493042603181342730) does not receive any of the info.\n\n \`\`\`END USER DATA COLLECTION CASE STUDIES:\`\`\`\n<:greendot:900352597528051752> Kick logs (__Username__, __Moderator Username__, __Reason__) \n<:greendot:900352597528051752> Ban logs (__Username__, __Moderator Username__, __Reason__)\n<:greendot:900352597528051752> Command usage logs (__Username__, __Command Used__) \n<:greendot:900352597528051752> Guild join logs (__Guild name__, __ID__ )\n<:greendot:900352597528051752> Guild leave logs (__Guild name__, __ID__) \n\nIf you have any questions or concerns about collecting end-user data, please contact [VENOM#9208](https://discord.com/users/493042603181342730) or You can just disable the bot on your server.\n\n <:SyncMe:908671315014197278> Thank you so much for taking the time to read this! <:SyncMe:908671315014197278>`)
            .setFooter(`©️ CordDJ x ${bot.user.username}`, bot.user.displayAvatarURL());
        message.reply({ embeds: [embed] }).then(async(msg) => {
            // Add reactions to message
            await msg.react('<:SyncMe:908671315014197278>');
        });
    }

    /**
     * Function for recieving interaction.
     * @param {bot} bot The instantiating client
     * @param {interaction} interaction The interaction that ran the command
     * @param {guild} guild The guild the interaction ran in
     * @readonly
     */
    async callback(bot, interaction, guild) {
        const embed = new MessageEmbed()
            .setTitle(`Privacy Policy of ${bot.user.username}`)
            .setColor("#2f3136")
            .setThumbnail(bot.user.displayAvatarURL({ format: 'png' }))
            .setDescription(`${bot.user.username} may collect END USER DATA as part of its message logging.\n It's worth noting that the information gathered is saved on the ${bot.user.username}'s server. [VENOM#9208](https://discord.com/users/493042603181342730) does not receive any of the info.\n\n \`\`\`END USER DATA COLLECTION CASE STUDIES:\`\`\`\n<:greendot:900352597528051752> Kick logs (__Username__, __Moderator Username__, __Reason__) \n<:greendot:900352597528051752> Ban logs (__Username__, __Moderator Username__, __Reason__)\n<:greendot:900352597528051752> Command usage logs (__Username__, __Command Used__) \n<:greendot:900352597528051752> Guild join logs (__Guild name__, __ID__ )\n<:greendot:900352597528051752> Guild leave logs (__Guild name__, __ID__) \n\n If you have any questions or concerns about collecting end-user data, please contact [VENOM#9208](https://discord.com/users/493042603181342730) or You can just disable the bot on your server.\n\n <:SyncMe:908671315014197278> Thank you so much for taking the time to read this! <:SyncMe:908671315014197278>`)
            .setFooter(`©️ CordDJ x ${bot.user.username}`, bot.user.displayAvatarURL());
        return interaction.reply({ embeds: [embed] });
    }
}

module.exports = Privacy;