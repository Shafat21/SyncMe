// Dependencies
const	Command = require('../../structures/Command.js'),
		akinator = require('djs-akinator');

/**
 * Akinator command
 * @extends {Command}
*/
class Akinator extends Command {
	/**
 	 * @param {Client} client The instantiating client
 	 * @param {CommandData} data The data for the command
	*/
	constructor(bot) {
		super(bot, {
			name: 'akinator',
			aliases: ['aki'],
			dirname: __dirname,
			botPermissions: ['SEND_MESSAGES', 'EMBED_LINKS'],
			description: 'Play with akinator and it will guess your character.',
			usage: 'akinator',
			cooldown: 3000,
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
		const language = "en";
        const childMode = "false";
        const gameType = "character";
        const useButtons = "true";
        const embedColor = "2f3136";

        akinator(message, {
            language: language,
            childMode: childMode,
            gameType: gameType,
            useButtons: useButtons,
            embedColor: embedColor
        })
	}

}

module.exports = Akinator;
