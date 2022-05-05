// Dependencies
const	Command = require('../../structures/Command.js');

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
			name: 'deploy',
			guildOnly: true,
			dirname: __dirname,
			description: 'Deploy/Resets Slash Command for the Server.',
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
	async run(bot, message, guild) {
// --------------------------------------------

if(message.author.id !== message.guild.ownerId) return message.channel.error(`This command can only be used by server owner.`)

await bot.guilds.cache.get(guild.id)?.commands.set(data)


return message.channel.success("Slash commands are deployed.").then(m => m.timedDelete({ timeout: 15000 }));


// --------------------------------------------
	}
};
