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
 * Invite command
 * @extends {Command}
 */
class Invite extends Command {
	/**
	 * @param {Client} client The instantiating client
	 * @param {CommandData} data The data for the command
	 */
	constructor(bot) {
		super(bot, {
			name: 'invite',
			dirname: __dirname,
			aliases: ['inv'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Send an invite link so people can add me to their server.',
			usage: 'invite',
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
		const embed = new MessageEmbed()
			.setColor("2f3136")
			.setAuthor(`Invite Card From ${bot.user.username}`, bot.user.displayAvatarURL({ format: 'png' }))
			.setDescription(`Want me in your server? Invite me today!`)
			.setFooter(`©️ CordDJ x ${bot.user.username}`, bot.user.displayAvatarURL());
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
				.setEmoji('865572290065072128')
				.setLabel(`Invite ${bot.user.username}`)
				.setURL(genInviteLink(bot))
				.setStyle('LINK'),

				// new MessageButton()
				// .setEmoji('896718291572240474')
				// .setLabel('Invite CordDJ 2')
				// .setURL(bot.config.BotURL)
				// .setStyle('LINK'),

				new MessageButton()
				.setEmoji('909715386843430933')
				.setLabel('Vote on Top.gg')
				.setURL(bot.config.voteURL)
				.setStyle('LINK'),

				new MessageButton()
				.setEmoji('896718155416760340')
				.setLabel('Website')
				.setURL(bot.config.websiteURL)
				.setStyle('LINK'),

				new MessageButton()
				.setEmoji('866599434098835486')
				.setLabel('Support')
				.setURL(bot.config.SupportServer.link)
				.setStyle('LINK'),
			);
		message.reply({
			embeds: [embed],
			components: [row]
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
			.setColor("2f3136")
			.setAuthor(`Invite Card From ${bot.user.username}`, bot.user.displayAvatarURL({ format: 'png' }))
			.setDescription(`Want me in your server? Invite me today!`)
			.setFooter(`©️ CordDJ x ${bot.user.username}`, bot.user.displayAvatarURL());
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
				.setEmoji('865572290065072128')
				.setLabel(`Invite ${bot.user.username}`)
				.setURL(genInviteLink(bot))
				.setStyle('LINK'),

				// new MessageButton()
				// .setEmoji('896718291572240474')
				// .setLabel('Invite CordDJ 2')
				// .setURL(bot.config.BotURL)
				// .setStyle('LINK'),

				new MessageButton()
				.setEmoji('909715386843430933')
				.setLabel('Vote on Top.gg')
				.setURL(bot.config.voteURL)
				.setStyle('LINK'),

				new MessageButton()
				.setEmoji('896718155416760340')
				.setLabel('Website')
				.setURL(bot.config.websiteURL)
				.setStyle('LINK'),

				new MessageButton()
				.setEmoji('866599434098835486')
				.setLabel('Support')
				.setURL(bot.config.SupportServer.link)
				.setStyle('LINK'),
			);
		return interaction.reply({
			embeds: [embed],
			components: [row], 
			ephemeral: true
		});
	}
}

module.exports = Invite;