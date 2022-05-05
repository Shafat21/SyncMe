// Dependencies
const { MessageEmbed, MessageAttachment } = require('discord.js'),
	Event = require('../../structures/Event');

/**
 * Guild create event
 * @event Venom#GuildCreate
 * @extends {Event}
*/
class GuildCreate extends Event {
	constructor(...args) {
		super(...args, {
			dirname: __dirname,
		});
	}

	/**
	 * Function for recieving event.
	 * @param {bot} bot The instantiating client
	 * @param {Guild} guild The guild that added the bot
	 * @readonly
	*/
	async run(bot, guild) {
		// LOG server Join
		bot.logger.log(`[GUILD JOIN] ${guild.name} (${guild.id}) added the bot.`);

		// Apply server settings
		try {
			// Create guild settings and fetch cache.
			await guild.fetchSettings();
		} catch (err) {
			bot.logger.error(`Event: '${this.conf.name}' has error: ${err.message}.`);
		}

		// Send message to channel that bot has joined a server
		const owner = await guild.members.fetch(guild.ownerId);
		const embed = new MessageEmbed()
			.setTitle(`Joined to ${guild.name}`)
			.setColor("#2f3136");
		let attachment;
		embed.addField (`Guild ID:`, `${guild.id ?? 'undefined'}`, false) 
		embed.addField (`Owner:`, `${owner.user.tag}`, false) 
		embed.setThumbnail('https://i.postimg.cc/J0FpySW2/giphy.gif');
    	embed.addField (`Sever Count:`, `${bot.guilds.cache.size} servers`, false)
		embed.addField (`MemberCount:`, `${guild.memberCount ?? 'undefined'}`, false);

		// Fetch all members in guild
		try {
			await guild.members.fetch();
		} catch (err) {
			bot.logger.error(`Event: '${this.conf.name}' has error: ${err.message}.`);
		}

		// Find channel and send message
		const modChannel = await bot.channels.fetch(bot.config.SupportServer.GuildChannel).catch(() => bot.logger.error(`Error fetching guild: ${guild.id} logging channel`));
		if (modChannel) bot.addEmbed(modChannel.id, [embed, attachment]);

		// update bot's activity
		bot.SetActivity('WATCHING', [`${bot.guilds.cache.size} servers!`, `SyncMe | -help`]);

		// get slash commands for category
		const enabledPlugins = guild.settings.plugins;
		const data = [];
		for (const plugin of enabledPlugins) {
			const g = await bot.loadInteractionGroup(plugin, guild);
			if (Array.isArray(g)) data.push(...g);
		}

		// upload slash commands to guild
		try {
			await bot.guilds.cache.get(guild.id)?.commands.set(data);
			bot.logger.log('Loaded Interactions for guild: ' + guild.name);
		} catch (err) {
			bot.logger.error(`Failed to load interactions for guild: ${guild.id} due to: ${err.message}.`);
		}
	}
}

module.exports = GuildCreate;
