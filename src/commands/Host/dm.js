// Dependencies
const { Embed } = require('../../utils'),
	Command = require('../../structures/Command.js');

/**
 * DM command
 * @extends {Command}
*/
class DM extends Command {
	/**
 	 * @param {Client} client The instantiating client
 	 * @param {CommandData} data The data for the command
	*/
	constructor(bot) {
		super(bot, {
			name: 'dm',
			guildOnly: true,
			ownerOnly: true,
			dirname: __dirname,
			aliases: ['direct-message', 'dmsg'],
			botPermissions: [ 'SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'DM a user',
			usage: 'dm <user> <message>',
			cooldown: 3000,
			examples: ['dm username Hello'],
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
 		
   
		// Make sure a member was mentioned
		if (!message.args[1]) return message.channel.error('misc:INCORRECT_FORMAT', { EXAMPLE: settings.prefix.concat(message.translate('moderation/dm:USAGE')) }).then(m => m.timedDelete({ timeout: 5000 }));

		// Get members mentioned in message
		const members = await message.getMember(false);

		// Make sure atleast a guildmember was found
		if (!members[0]) return message.channel.error('moderation/ban:MISSING_USER').then(m => m.timedDelete({ timeout: 10000 }));

		// send message
		try {
			const embed = new Embed(bot, message.guild)
				.setColor(`#2f3136`)
				.setTitle('moderation/dm:TITLE', { NAME: message.guild.name })
				.setAuthor(`You have a new message from ${message.author.username}!`)
				.setThumbnail(message.author.displayAvatarURL({ format: 'png', size: 1024 }))
				.addField('Remember:', `Do not reply to me because **[${message.author.username}](https://discord.com/users/${message.author.id})**  will not recieve the reply, take your stuff to their dms instead <:Promoted:908703648731762698> `)
				.addField(`${message.author.username}'s message:`, message.args.join(' ').slice(message.args[0].length))
				.setTimestamp()
				.setFooter(`Sent by ${message.author.tag} from ${message.guild.name}`, message.guild.iconURL({ dynamic: true, size: 1024 }) );
			await members[0].user.send({ embeds: [embed] });
			message.channel.send(message.translate('moderation/dm:SUCCESS', { TAG: members[0].user.tag }));
		} catch (err) {
			if (message.deletable) message.delete();
			bot.logger.error(`Command: '${this.help.name}' has error: ${err.message}.`);
			message.channel.error('misc:ERROR_MESSAGE', { ERROR: err.message }).then(m => m.timedDelete({ timeout: 5000 }));
		}
	}
}

module.exports = DM;
