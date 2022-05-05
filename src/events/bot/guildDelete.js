// Dependencies
const { GiveawaySchema, RankSchema, WarningSchema, ReactionRoleSchema } = require('../../database/models'),
	{ MessageEmbed, MessageAttachment } = require('discord.js'),
	Event = require('../../structures/Event');

/**
 * Guild delete event
 * @event Venom#GuildDelete
 * @extends {Event}
*/
class GuildDelete extends Event {
	constructor(...args) {
		super(...args, {
			dirname: __dirname,
		});
	}

	/**
	 * Function for recieving event.
	 * @param {bot} bot The instantiating client
	 * @param {Guild} guild The guild that kicked the bot
	 * @readonly
	*/
	async run(bot, guild) {
		bot.logger.log(`[GUILD LEAVE] ${guild.name} (${guild.id}) removed the bot.`);
		await bot.DeleteGuild(guild);

		// Send message to channel that bot has left a server
		let attachment;
		try {
			const embed = new MessageEmbed()
			.setTitle(`Leave from ${guild.name}`)
			.setColor("#2f3136");

			embed.addField (`Guild ID:`, `${guild.id ?? 'undefined'}`, false) 
			embed.addField (`Owner:`, `${bot.users.cache.get(guild.ownerId)?.tag}`, false) 
      		embed.addField (`Sever Count:`, `${bot.guilds.cache.size} servers`, false)
			  embed.setThumbnail('https://i.postimg.cc/9Xg8NwqY/dribbble.gif');
			embed.addField (`MemberCount:`, `${guild.memberCount ?? 'undefined'}`, false);

			const modChannel = await bot.channels.fetch(bot.config.SupportServer.GuildChannel).catch(() => bot.logger.error(`Error fetching guild: ${guild.id} logging channel`));
			if (modChannel) bot.addEmbed(modChannel.id, [embed, attachment]);
		} catch (err) {
			bot.logger.error(`Event: '${this.conf.name}' has error: ${err.message}.`);
		}


		// update bot's activity
		bot.SetActivity('WATCHING', [`${bot.guilds.cache.size} servers!`, `SyncMe | -help`]);
	}
}

module.exports = GuildDelete;
