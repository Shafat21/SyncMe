// Dependencies
const {
	MessageEmbed
} = require('discord.js'),
	prettyMilliseconds = require("pretty-ms");
Command = require('../../structures/Command.js');


/**
 * CustomCommand command
 * @extends {Command}
 */
module.exports = class CustomCommand extends Command {
	/**
	 * @param {Client} client The instantiating client
	 * @param {CommandData} data The data for the command
	 */
	constructor(bot) {
		// MORE COMMAND SETTINGS CAN BE FOUND IN src/structures/Command
		super(bot, {
			name: 'save',
			guildOnly: true,
			dirname: __dirname,
			aliases: ['grab', 'sv'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Saves the current song to your Direct Messages',
			usage: 'save',
			cooldown: 2000,
			examples: ['save', 'grab'],
		});
	}

	/**
	 * Function for recieving message.
	 * @param {bot} bot The instantiating client
	 * @param {message} message The message that ran the command
	 * @param {settings} settings The settings of the channel the command ran in
	 * @readonly
	 */
	async run(bot, message, settings) {

		// Create player
		let player;
		try {
			player = bot.manager.create({
				guild: message.guild.id,
				voiceChannel: message.member.voice.channel.id,
				textChannel: message.channel.id,
				selfDeafen: true,
			});
		} catch (err) {
			if (message.deletable) message.delete();
			bot.logger.error(`Command: '${this.help.name}' has error: ${err.message}.`);
			return message.channel.error('misc:ERROR_MESSAGE', {
				ERROR: err.message
			}).then(m => m.timedDelete({
				timeout: 10000
			}));
		}

		if (!player) return message.channel.error("| **Nothing is playing right now...**").then(m => m.timedDelete({
			timeout: 30000
		}));
		if (!player.playing) return message.channel.error("| **Nothing is playing right now...**").then(m => m.timedDelete({
			timeout: 30000
		}));
		if (!message.member.voice.channel) return message.channel.error("| **You must be in a voice channel to play something!**").then(m => m.timedDelete({
			timeout: 30000
		}));
		if (message.guild.me.voice.channel && message.member.voice.channel.id !== message.guild.me.voice.channel.id) return message.channel.error(":x: | **You must be in the same voice channel as me to use this command!**").then(m => m.timedDelete({
			timeout: 30000
		}));
		try {
			const embed = new MessageEmbed()
				.setAuthor(`Song saved`, bot.user.displayAvatarURL({
					dynamic: true
				}))
				.setThumbnail(`https://img.youtube.com/vi/${player.queue.current.identifier}/mqdefault.jpg`)
				.setURL(player.queue.current.uri)
				.setColor("#2f3136")
				.setTitle(`**${player.queue.current.title}**`)
				.addField(`<:icons_reminder:859388128364199946> Duration: `, `\`${prettyMilliseconds(player.queue.current.duration, {colonNotation: true})}\``, true)
				.addField(`<:icons_music:860123644201271326> Author: `, `\`${player.queue.current.author}\``, true)
				.addField(`<:icons_play:861852632800952320> Play it:`, `\`\`\`${settings.prefix}play ${player.queue.current.uri}\`\`\``)
				.addField(`<:icons_channelfollowed:866599434375528488> Saved in:`, `<#${message.channel.id}>`)
				.setFooter(`Requested by you: ${player.queue.current.requester.tag}`, player.queue.current.requester.displayAvatarURL({
					dynamic: true

				}))
			message.author.send({
				embeds: [embed]
			});
			message.channel.success("**Check your DMs!**")
		} catch (err) {
			message.channel.error('DM is Locked, Please Open it')
		}
		
		console.log(settings);
	}
};