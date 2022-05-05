// Dependencies
require("moment-duration-format");

const { Embed } = require('../../utils'),
	{ time: { getReadableTime } } = require('../../utils'),
	Command = require('../../structures/Command.js');

/**
 * SS command
 * @extends {Command}
*/
class SS extends Command {
	/**
 	 * @param {Client} client The instantiating client
 	 * @param {CommandData} data The data for the command
	*/
	constructor(bot) {
		super(bot, {
			name: 'ss',
            ownerOnly: true,
			dirname: __dirname,
			botPermissions: [ 'SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Gets the status of the bot.',
			usage: 'status',
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
	async run(bot, message, settings) {
		// Get information on the services the bot provide
		const m = await message.channel.send(message.translate('misc/status:PONG'));
    
		let circles = {
            green: "<:online:903711513183940669>",
            yellow: "<:idle:903711513490112512>",
            red: "<:dnd:903711513066487851> "
                }
		let connectedchannelsamount = 0;
		let guilds = bot.guilds.cache.map((guild) => guild);
		for (let i = 0; i < guilds.length; i++) {
			if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
		}

		const embed = new Embed(bot, message.guild, settings)
			.addField(bot.translate('misc/status:PING'), `${m.createdTimestamp - message.createdTimestamp <= 200 ? circles.green : m.createdTimestamp - message.createdTimestamp <= 400 ? circles.yellow : circles.red} ${m.createdTimestamp - message.createdTimestamp} ms`, true)
			.addField(bot.translate('misc/status:CLIENT'), `${bot.ws.ping <= 200 ? circles.green : bot.ws.ping <= 400 ? circles.yellow : circles.red} ${bot.ws.ping} ms`, true)
			.addField(bot.translate('misc/status:MONGO'), `${Math.round(await bot.mongoose.ping()) <= 200 ? circles.green : Math.round(await bot.mongoose.ping()) <= 400 ? circles.yellow : circles.red} ${Math.round(await bot.mongoose.ping())} ms`, true)
			

			.setColor("#2f3136")
            .setTitle(`Stats from \`${bot.user.username}\``)
            .addFields( {
                name: '<a:uptime:905864838880821319> Uptime',
                value: `\`${getReadableTime(bot.uptime)}\``,
                inline: true
            }, {
                name: '<:ram:896715172029276180> Memory Usage',
                value: `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB\``,
                inline: true
            },{
                name: '<:icons_speaker:860133545544908802> Connected Channels',
                value: `\`${connectedchannelsamount}\``,
                inline: true
            })
            .addFields({
                name: '<:icons_serverinsight:866599433901572096> Servers',
                value: `Total \`${bot.guilds.cache.size}\``,
                inline: true
            }, {
                name: '<:icons_serverinsight:866599433901572096> Shards',
                value: `Total \`${bot.ws.totalShards}\``,
                inline: true
            },)
            .addFields({
                name: '<:icons_serverinsight:866599433901572096> Total Text Channels and Voice Channels',
                value: `Total \`${bot.channels.cache.size.toLocaleString(settings.Language)}\``,
                inline: true
            }, {
                name: '<:icons_serverinsight:866599433901572096> Text Channels',
                value: `\`Total ${bot.channels.cache.filter(channel => channel.isText() && channel.type !== 'DM').size.toLocaleString(settings.Language)}\``,
                inline: true
            },)
            .addFields({
                name: '<:icons_speaker:860133545544908802> Voice Channels',
                value: `Total \`${bot.channels.cache.filter(channel => channel.type === 'GUILD_VOICE').size.toLocaleString(settings.Language)}\``,
                inline: true
            }, {
                name: '<:icons_message:860123644545204234> Direct Message',
                value: `\`Total ${bot.channels.cache.filter(channel => channel.type === 'DM').size.toLocaleString(settings.Language)}\``,
                inline: true
            },)
			.setFooter(`©️ ${bot.user.username}`, bot.user.displayAvatarURL())
			.setTimestamp();
		await message.reply({ embeds: [embed] })
		m.delete();
	}
}

module.exports = SS;
