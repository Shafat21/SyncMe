// Dependencies
const { MessageEmbed } = require ('discord.js'),Command = require('../../structures/Command.js');

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
			name: 'serverlist',
			ownerOnly: true,
			aliases: ['srl'],
			dirname: __dirname,
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Server List',
			cooldown: 3000,
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
		// --------------------------------------------
		// Updates variables
		let i0 = 0;
		let i1 = 50;
		let page = 1;

		let description =
			`Total Servers - ${bot.guilds.cache.size}\n\n` +
			bot.guilds.cache
				.sort((a, b) => b.memberCount - a.memberCount)
				.map(r => r)
				.map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id}`)
				.slice(0, 50)
				.join("\n");


		const embed = new MessageEmbed()
		.setAuthor(
			message.author.tag,
			message.author.displayAvatarURL({ dynamic: true })
		)
		.setColor("#2f3136")
		.setFooter(bot.user.username)
		.setTitle(`Page - ${page}/${Math.ceil(bot.guilds.cache.size / 50)}`)
		.setDescription(description);
		// --------------------------------------------
        // Updates variables
        i0 = i0 + 50;
        i1 = i1 + 50;
        page = page + 1;

		description =
		`Total Servers - ${bot.guilds.cache.size}\n\n` +
		bot.guilds.cache
			.sort((a, b) => b.memberCount - a.memberCount)
			.map(r => r)
			.map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id}`)
			.slice(i0, i1)
			.join("\n");

		const embed2 = new MessageEmbed()
		.setAuthor(
			message.author.tag,
			message.author.displayAvatarURL({ dynamic: true })
		)
		.setColor("#ffffff")
		.setFooter(bot.user.username)
		.setTitle(`Number 2 Page - ${page}/${Math.ceil(bot.guilds.cache.size / 50)}`)
		.setDescription(description);

		// --------------------------------------------
        // Updates variables
        i0 = i0 + 50;
        i1 = i1 + 50;
        page = page + 1;

		description =
		`Total Servers - ${bot.guilds.cache.size}\n\n` +
		bot.guilds.cache
			.sort((a, b) => b.memberCount - a.memberCount)
			.map(r => r)
			.map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id}`)
			.slice(i0, i1)
			.join("\n");

		const embed3 = new MessageEmbed()
		.setAuthor(
			message.author.tag,
			message.author.displayAvatarURL({ dynamic: true })
		)
		.setColor("#2f3136")
		.setFooter(bot.user.username)
		.setTitle(`Number 3 Page - ${page}/${Math.ceil(bot.guilds.cache.size / 50)}`)
		.setDescription(description);

		// --------------------------------------------
        // Updates variables
        i0 = i0 + 50;
        i1 = i1 + 50;
        page = page + 1;

		description =
		`Total Servers - ${bot.guilds.cache.size}\n\n` +
		bot.guilds.cache
			.sort((a, b) => b.memberCount - a.memberCount)
			.map(r => r)
			.map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Members\nID - ${r.id}`)
			.slice(i0, i1)
			.join("\n");

		const embed4 = new MessageEmbed()
		.setAuthor(
			message.author.tag,
			message.author.displayAvatarURL({ dynamic: true })
		)
		.setColor("#FFFFFF")
		.setFooter(bot.user.username)
		.setTitle(`Number 4 Page - ${page}/${Math.ceil(bot.guilds.cache.size / 50)}`)
		.setDescription(description);

		message.channel.send({ embeds: [embed] });
		message.channel.send({ embeds: [embed2] });
		message.channel.send({ embeds: [embed3] });
		message.channel.send({ embeds: [embed4] });

	}
};