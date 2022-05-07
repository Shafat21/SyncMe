// Dependencies

const {  MessageEmbed  } = require("discord.js"),
Command = require('../../structures/Command.js');

/**
 * Feedback command
 * @extends {Command}
*/
module.exports = class Feedback extends Command {
	/**
 	 * @param {Client} client The instantiating client
 	 * @param {CommandData} data The data for the command
	*/
	constructor(bot) {
		// MORE COMMAND SETTINGS CAN BE FOUND IN src/structures/Command
		super(bot, {
			name: 'feedback',
			guildOnly: false,
			dirname: __dirname,
			aliases: ['feedme'],
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Send Feedback to Owner!',
			usage: 'feedback <Hello VENOM, SyncMe is so Awesome Bot, Thanks for making it>',
			examples: 'feedback Hello VENOM, SyncMe is so Awesome Bot, Thanks for making it',
			cooldown: 2000,
		});
	}

	/**
 	 * Function for recieving message.
 	 * @param {bot} bot The instantiating client
 	 * @param {message} message The message that ran the command
	 * @param {args} 
 	 * @readonly
	*/
	async run(bot, message, args, settings) {
// --------------------------------------------
	// Make sure a poll was provided
	if (!message.args[0]) return message.channel.error('misc:INCORRECT_FORMAT', { EXAMPLE: (message.translate('guild/feedback:USAGE')) }).then(m => m.timedDelete({ timeout: 5000 }));

    // Step 1: Grab the user's message to be forwarded and garnish it with related info
    var userFeedback = message.args.join(' ');
    const botMessageEmbed = new MessageEmbed()
        .setColor('#E6E6FA')
        .setTitle('Feedback Recieved!')
        .addField('Feedback', userFeedback)
        .addField('From User', message.author.username)
        .setTimestamp()
        .setFooter('Message ID: ' + message.id);

    var botMessage = "Heads up! @"
        + message.author.username + message.author.discriminator
        + " has some feedback!:\n"
        + ">>>> " + userFeedback;
    console.log(botMessage);

    // Step 2: send it to the faq-bot-dms channel
    const modChannel = await bot.channels.fetch(bot.config.SupportServer.GuildChannel).catch(() => bot.logger.error('Error fetching rate limit logging channel'));
    if (modChannel) bot.addEmbed(modChannel.id, [botMessageEmbed]);

    // Step 3: let the user know their feedbback has been received
    message.reply(`**Thank You**`);


// --------------------------------------------

	}
};


