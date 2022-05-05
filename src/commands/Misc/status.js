// Dependencies
require("moment-duration-format");

let os = require("os");

const { version,  } = require('discord.js'),
	{ Embed } = require('../../utils'),
	{ time: { getReadableTime } } = require('../../utils'),
	Command = require('../../structures/Command.js');

/**
 * Status command
 * @extends {Command}
*/
class Status extends Command {
	/**
 	 * @param {Client} client The instantiating client
 	 * @param {CommandData} data The data for the command
	*/
	constructor(bot) {
		super(bot, {
			name: 'status',
			dirname: __dirname,
			aliases: ['stats', 'stat'],
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
	async run(bot, message) {
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

		const embed = new Embed(bot, message.guild)
			.addField(bot.translate('misc/status:PING'), `${m.createdTimestamp - message.createdTimestamp <= 200 ? circles.green : m.createdTimestamp - message.createdTimestamp <= 400 ? circles.yellow : circles.red} ${m.createdTimestamp - message.createdTimestamp} ms`, true)
			.addField(bot.translate('misc/status:CLIENT'), `${bot.ws.ping <= 200 ? circles.green : bot.ws.ping <= 400 ? circles.yellow : circles.red} ${bot.ws.ping} ms`, true)
			.addField(bot.translate('misc/status:MONGO'), `${Math.round(await bot.mongoose.ping()) <= 200 ? circles.green : Math.round(await bot.mongoose.ping()) <= 400 ? circles.yellow : circles.red} ${Math.round(await bot.mongoose.ping())} ms`, true)
			

			.setColor("#2f3136")
            .setTitle(`Stats from \`${bot.user.username}\``)
			.setThumbnail(bot.user.displayAvatarURL({ format: 'png' }))
            .addFields( {
                name: '<a:uptime:905864838880821319> Uptime',
                value: `\`${getReadableTime(bot.uptime)}\``,
                inline: true
            }, {
                name: '<:ram:896715172029276180> Memory Usage',
                value: `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB\``,
                inline: true
            })
            .addFields({
                name: '<:icons_serverinsight:866599433901572096> Servers',
                value: `Total \`${bot.guilds.cache.size}\``,
                inline: true
            }, {
                name: '<:icons_speaker:860133545544908802> Connected Channels',
                value: `\`${connectedchannelsamount}\``,
                inline: true
            })
            .addFields({
                name: '<a:Discord:896723328277024819> Discord.js',
                value: `\`v${version}\``,
                inline: true
            }, {
                name: '<:jss:896718571491704852> Node',
                value: `\`${process.version}\``,
                inline: true
            })
            .addFields({
                name: '<:systemmessageuser:896715171815387156> Version',
                value: `\`v${require("../../../package.json").version}\``,
                inline: true
            }, {
                name: '<:icons_monitor:866583417138839563> Platform',
                value: `\`${os.platform()}\``,
                inline: true
            }, {
                name: '<:icons_list:860123643710537789> Total Channels',
                value: `\`${bot.channels.cache.size}\``,
                inline: true
            })
            .addFields({
                name: '<:icons_monitor:866583417138839563> CPU',
                value: `\`\`\`${os.cpus().map((i) => `${i.model}`)[0]}\`\`\``,
                inline: true
            })
			.setFooter(`©️ CordDJ x ${bot.user.username}`, bot.user.displayAvatarURL())
			.setTimestamp();
		await message.reply({ embeds: [embed] }).then(async (msg) => {
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
            green: "<:online:903711513183940669>",
            yellow: "<:idle:903711513490112512>",
            red: "<:dnd:903711513066487851> "
                }
   let connectedchannelsamount = 0;
		let guilds = bot.guilds.cache.map((guild) => guild);
		for (let i = 0; i < guilds.length; i++) {
			if (guilds[i].me.voice.channel) connectedchannelsamount += 1;
		}
		const embed = new Embed(bot, guild)
			      .setColor("#2f3136")
            .setTitle(`Stats from \`${bot.user.username}\``)
			      .setThumbnail(bot.user.displayAvatarURL({ format: 'png' }))
			      .addField(bot.translate('misc/status:CLIENT'), `${bot.ws.ping <= 200 ? circles.green : bot.ws.ping <= 400 ? circles.yellow : circles.red} ${bot.ws.ping} ms`, true)
			      .addField(bot.translate('misc/status:MONGO'), `${Math.round(await bot.mongoose.ping()) <= 200 ? circles.green : Math.round(await bot.mongoose.ping()) <= 400 ? circles.yellow : circles.red} ${Math.round(await bot.mongoose.ping())} ms`, true)
            .addFields( {
                name: '<a:uptime:905864838880821319> Uptime',
                value: `\`${getReadableTime(bot.uptime)}\``,
                inline: true
            }, {
                name: '<:ram:896715172029276180> Memory Usage',
                value: `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB\``,
                inline: true
            })
            .addFields({
                name: '<:icons_serverinsight:866599433901572096> Servers',
                value: `Total \`${bot.guilds.cache.size}\``,
                inline: true
            }, {
                name: '<:icons_speaker:860133545544908802> Connected Channels',
                value: `\`${connectedchannelsamount}\``,
                inline: true
            })
            .addFields({
                name: '<a:Discord:896723328277024819> Discord.js',
                value: `\`v${version}\``,
                inline: true
            }, {
                name: '<:jss:896718571491704852> Node',
                value: `\`${process.version}\``,
                inline: true
            })
            .addFields({
                name: '<:systemmessageuser:896715171815387156> Version',
                value: `\`v${require("../../../package.json").version}\``,
                inline: true
            }, {
                name: '<:icons_monitor:866583417138839563> Platform',
                value: `\`${os.platform()}\``,
                inline: true
            }, {
                name: '<:icons_list:860123643710537789> Total Channels',
                value: `\`${bot.channels.cache.size}\``,
                inline: true
            })
            .addField("\u200b", `\u200b`, true)
            .addFields({
                name: '<:systemmessageuser:896715171815387156> CPU',
                value: `\`\`\`${os.cpus().map((i) => `${i.model}`)[0]}\`\`\``,
                inline: true
            })
			.setFooter(`©️ CordDJ x ${bot.user.username}`, bot.user.displayAvatarURL())
			.setTimestamp();
		return interaction.reply({ embeds: [embed], ephemeral: true });
	}
}

module.exports = Status;
