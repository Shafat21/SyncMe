// Dependencies

const {
	MessageEmbed,
	MessageActionRow,
	MessageButton
} = require('discord.js'), {
	functions: {
		genInviteLink
	}
} = require('../../utils'),
Command = require('../../structures/Command.js');

/**
 * Emoji-list command
 * @extends {Command}
*/
class EmojiList extends Command {
	/**
   * @param {Client} client The instantiating client
   * @param {CommandData} data The data for the command
  */
	constructor(bot) {
		super(bot, {
			name: 'emoji-list',
			guildOnly: true,
			dirname: __dirname,
			aliases: ['emojilist', 'emotes'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Displays the server\'s emojis',
			usage: 'emojilist',
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
	async run(bot, message, guild) {
// --------------------------------------------
		const embed = new MessageEmbed()
		.setColor("2f3136")
		.setAuthor(`Emoji List`)
		.setDescription(`${guild.emojis.cache.map(e => e.toString()).join(' ')}`)
		.setFooter(`©️ ${bot.user.username}`, bot.user.displayAvatarURL());
		const row = new MessageActionRow()
		.addComponents(
			new MessageButton()
			.setEmoji('865572290065072128')
			.setLabel(`Invite ${bot.user.username}`)
			.setURL(genInviteLink(bot))
			.setStyle('LINK'),
		);
		message.channel.send({
			embeds: [embed],
			components: [row]
		});

		// message.channel.send(message.translate('guild/emoji-list:MESSAGE', { GUILD: message.guild.name, EMOJIS: message.guild.emojis.cache.map(e => e.toString()).join(' ') }));
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
		.setColor("2f3136")
		.setAuthor(`Emoji List`)
		.setDescription(`${guild.emojis.cache.map(e => e.toString()).join(' ')}`)
		.setFooter(`©️ CordDJ x ${bot.user.username}`, bot.user.displayAvatarURL());
		const row = new MessageActionRow()
		.addComponents(
			new MessageButton()
			.setEmoji('865572290065072128')
			.setLabel(`Invite ${bot.user.username}`)
			.setURL(genInviteLink(bot))
			.setStyle('LINK'),
		);
		interaction.reply({
			embeds: [embed],
			components: [row], ephemeral: true
		});
	}
}

module.exports = EmojiList;
