// Dependencies
const { MessageEmbed } = require('discord.js'),
Command = require('../../structures/Command.js');

/**
 * reloadall command
 * @extends {Command}
*/
class Reloadall extends Command {
	/**
 	 * @param {Client} client The instantiating client
 	 * @param {CommandData} data The data for the command
	*/
	constructor(bot) {
		super(bot, {
			name: 'reloadall',
			ownerOnly: true,
			dirname: __dirname,
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Update all the servers interaction',
			usage: 'refresh-interaction',
			cooldown: 3000,
			examples: ['reloadall'],
		});
	}

	/**
	 * Function for receiving message.
	 * @param {bot} bot The instantiating client
 	 * @param {message} message The message that ran the command
 	 * @readonly
	*/
	async run(bot, message) {
		const embed1 = new MessageEmbed()
		.setColor("#2f3136")
		.setDescription(`Loading slash commnands for ${bot.guilds.cache.size} guilds`);
		message.channel.send({ embeds: [embed1] });
		let successCount = 0;
		// loop through each guild
		for (const guild of [...bot.guilds.cache.values()]) {
			const enabledPlugins = guild.settings.plugins;
			const data = [];

			// get slash commands for category
			for (const plugin of enabledPlugins) {
				const g = await bot.loadInteractionGroup(plugin, guild);
				if (Array.isArray(g)) data.push(...g);
			}

			// get context menus
			data.push({ name: 'Add to Queue', type: 'MESSAGE' },
				{ name: 'Translate', type: 'MESSAGE' },
				{ name: 'OCR', type: 'MESSAGE' },
				{ name: 'Avatar', type: 'USER' },
				{ name: 'Userinfo', type: 'USER' },
			);

			try {
				await bot.guilds.cache.get(guild.id)?.commands.set(data);
				bot.logger.log('=-=-=-= Loaded interactions for guild: ' + guild.name);
				successCount++;
			} catch (err) {
				bot.logger.error(`Failed to load interactions for guild: ${guild.name} due to: ${err.message}.`);
			}
		}
        bot.logger.log(`=-=-=-= Successfully updated ${successCount}/${bot.guilds.cache.size} servers interactions`);
		const embed = new MessageEmbed()
		.setTitle('Reloaded Slash Commands:')
		.setColor("#2f3136")
		.setDescription(`Successfully updated ${successCount}/${bot.guilds.cache.size} servers interactions.`);
		return message.channel.send({ embeds: [embed] });
	}
}

module.exports = Reloadall;