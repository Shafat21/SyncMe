// Dependencies

const {  MessageEmbed,  } = require("discord.js"),
Command = require('../../structures/Command.js');

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
			name: 'feedback',
			guildOnly: false,
			dirname: __dirname,
			aliases: ['feedme'],
			botPermissions: ['SEND_MESSAGES'],
			description: 'Send Feedback to Owner!',
			usage: 'feedback Hello VENOM, SyncMe is so Awesome Bot, Thanks for making it',
			cooldown: 2000,
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

    // Useless try and catch incoming: 
    try {
        message.reply("Aight, check DMs!");
      } catch (error) {
          console.log(error)
      }
      
      // Questions, use whatever you want
      const questions = [
        'Welcome! Thanks for spotting a us and taking the time to feedback us, to proceed - type anything here!'
    ];

    let collectCounter = 0;
    let endCounter = 0;

    const filter = m => m.author.id === message.author.id;
    const appStart = await message.author.send(questions[collectCounter++]);
    const channel = appStart.channel;

    const collector = channel.createMessageCollector(filter);

    collector.on('collect', () => {
        if (collectCounter < questions.length) {
            channel.send(questions[collectCounter++]);
        } else {
            channel.send(`Thanks For Your Feedback`);
            collector.stop('fulfilled');
        }
    });
    // const appChannel = bot.users.cache.get('892310749295292478'); // Channel of the Devs (Report channel)
 
    collector.on('end', (collected, reason) => {
        if (reason === 'fulfilled') {
            let index = 1;
            const mapped = collected
                .map(msg => {
                    return `**${index++})** | ${questions[endCounter++]}\n-> ${
                        msg.content
                    }`;
                })
                .join('\n\n');
            
                const embed999 = new MessageEmbed()
                    .setAuthor(
                    message.author.tag,
                    message.author.displayAvatarURL({ dynamic: true })
                    )
                    .setTitle(`New Bug Reported`)
                    .setDescription(mapped)
                    .setColor("#2f3136")
                    .setTimestamp();
            

            const owner = bot.users.cache.get('493042603181342730')
            
            owner.send(embed999)
        }
    });

// --------------------------------------------
		console.log(settings);
	}
};


