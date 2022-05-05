// Dependencies
const {
	Embed
} = require('../../utils'), {
		time: {
			getReadableTime
		}
	} = require('../../utils'),
	Command = require('../../structures/Command.js');

/**
 * Uptime command
 * @extends {Command}
 */
class Uptime extends Command {
	/**
	 * @param {Client} client The instantiating client
	 * @param {CommandData} data The data for the command
	 */
	constructor(bot) {
		super(bot, {
			name: 'ping',
			dirname: __dirname,
			aliases: ['ping', 'uptime'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Gets the uptime/ping of the bot.',
			usage: 'uptime',
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
		const m = await message.channel.send(message.translate('misc/status:PONG'));
		let circles = {
			green: "<:online:903711513183940669>",
			yellow: "<:idle:903711513490112512>",
			red: "<:dnd:903711513066487851> "
		}
		const embed = new Embed(bot, message.guild)
			.setDescription(message.translate('misc/uptime:DESC', {
				TIME: getReadableTime(bot.uptime)
			}))
			.addField(bot.translate('misc/status:PING'), `${m.createdTimestamp - message.createdTimestamp <= 200 ? circles.green : m.createdTimestamp - message.createdTimestamp <= 400 ? circles.yellow : circles.red} ${m.createdTimestamp - message.createdTimestamp} ms`, true)
			.addField(bot.translate('misc/status:CLIENT'), `${bot.ws.ping <= 200 ? circles.green : bot.ws.ping <= 400 ? circles.yellow : circles.red} ${bot.ws.ping} ms`, true)
			.addField(bot.translate('misc/status:MONGO'), `${Math.round(await bot.mongoose.ping()) <= 200 ? circles.green : Math.round(await bot.mongoose.ping()) <= 400 ? circles.yellow : circles.red} ${Math.round(await bot.mongoose.ping())} ms`, true);
		await message.reply({
			embeds: [embed]
		}).then(async (msg) => {
			// Add reactions to message
			await msg.react('<:SyncMe:908671315014197278>');
		});
		m.delete();
	}

	/**
	 * Function for recieving interaction.
	 * @param {bot} bot The instantiating client
	 * @param {interaction} interaction The interaction that ran the command
	 * @param {guild} guild The guild the interaction ran in
	 * @readonly
	 */
	async callback(bot, interaction, guild) {
 		let circles = {
			green: "<:icons_goodping:880113406915538995>",
			yellow: "<:icons_idelping:880113405720145990>",
			red: "<:icons_badping:880113405007114271>"
		}
		const embed = new Embed(bot, guild)
			.setDescription(guild.translate('misc/uptime:DESC', {
				TIME: getReadableTime(bot.uptime)
			}))
.addField(bot.translate('misc/status:CLIENT'), `${bot.ws.ping <= 200 ? circles.green : bot.ws.ping <= 400 ? circles.yellow : circles.red} ${bot.ws.ping} ms`, true)
			.addField(bot.translate('misc/status:MONGO'), `${Math.round(await bot.mongoose.ping()) <= 200 ? circles.green : Math.round(await bot.mongoose.ping()) <= 400 ? circles.yellow : circles.red} ${Math.round(await bot.mongoose.ping())} ms`, true);
		return interaction.reply({
			embeds: [embed], ephemeral: true
		});
	}
}

module.exports = Uptime;