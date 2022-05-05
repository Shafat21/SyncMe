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
 * Support command
 * @extends {Command}
 */
class Support extends Command {
	/**
	 * @param {Client} client The instantiating client
	 * @param {CommandData} data The data for the command
	 */
	constructor(bot) {
		super(bot, {
			name: 'support',
			dirname: __dirname,
			aliases: ['sup'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Get support on the bot.',
			usage: 'support',
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
		.setAuthor(bot.user.username)
		.setColor("2f3136")
		.setThumbnail(bot.user.displayAvatarURL({
			format: 'png'
		}))
		.setFooter(`©️ CordDJ x ${bot.user.username}`, bot.user.displayAvatarURL())
		.setTitle('Supports')
		.setDescription(bot.translate('misc/support:DESC', {
			SUPPORT: bot.config.SupportServer.link,
			WEBSITE: bot.config.websiteURL
		}));
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
				.setEmoji('896718291572240474')
				.setLabel(`Invite ${bot.user.username}`)
				.setURL(genInviteLink(bot))
				.setStyle('LINK'),

				new MessageButton()
				.setEmoji('909715386843430933')
				.setLabel('Vote on Top.gg')
				.setURL(bot.config.voteURL)
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
		.setAuthor(bot.user.username)
		.setColor("2f3136")
		.setThumbnail(bot.user.displayAvatarURL({
			format: 'png'
		}))
		.setFooter("© Cord DJ", bot.user.displayAvatarURL())
		.setTitle('Supports')
		.setDescription(bot.translate('misc/support:DESC', {
			SUPPORT: bot.config.SupportServer.link,
			WEBSITE: bot.config.websiteURL
		}));
		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
				.setEmoji('896718291572240474')
				.setLabel('Invite CordDJ')
				.setURL(genInviteLink(bot))
				.setStyle('LINK'),

				new MessageButton()
				.setEmoji('909715386843430933')
				.setLabel('Vote on Top.gg')
				.setURL(bot.config.voteURL)
				.setStyle('LINK'),
                
                new MessageButton()
				.setEmoji('866599434098835486')
				.setLabel('Support')
				.setURL(bot.config.SupportServer.link)
				.setStyle('LINK'),
			);
		return interaction.reply({
			embeds: [embed],
			components: [row], ephemeral: true
		});
	}
}

module.exports = Support;