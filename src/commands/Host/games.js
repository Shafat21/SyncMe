// Dependencies

const {
		MessageEmbed,
		MessageActionRow,
		MessageButton
	} = require('discord.js'),fetch = require("node-fetch"),
		Command = require('../../structures/Command.js');
	

/**
 * DiscordTogether command
 * @extends {Command}
*/
module.exports = class DiscordTogether extends Command {
	/**
 	 * @param {Client} client The instantiating client
 	 * @param {CommandData} data The data for the command
	*/
	constructor(bot) {
		// MORE COMMAND SETTINGS CAN BE FOUND IN src/structures/Command
		super(bot, {
			name: 'games',
			guildOnly: true,
			dirname: __dirname,
            ownerOnly: true,
			aliases: ['games'],
			botPermissions: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
			description: 'Generate a youtube link to watch youtube together (through discord)',
			usage: 'HOW SHOULD THE USER USE THIS COMMAND (excluding prefix)',
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
	async run(bot, message) {
		const channel = message.member.voice.channel
		if (!message.member.voice.channel) return message.channel.error('music/play:NOT_VC').then(m => m.timedDelete({ timeout: 10000 }));

		
            fetch(`https://discord.com/api/v8/channels/${channel.id}/invites`, {
                    method: "POST",
                    body: JSON.stringify({
                        max_age: 86400,
                        max_uses: 0,
                        target_application_id: "755600276941176913",
                        target_type: 2,
                        temporary: false,
                        validate: null
                    }),
                    headers: {
                        "Authorization": `Bot ${bot.token}`,
                        "Content-Type": "application/json"
                    }
                })
                .then(res => res.json())
                .then(invite => {
                    if (!invite.code) {
                        return message.channel.send(new MessageEmbed()
                            .setDescription(`Cannot start, please retry`)
                            .setColor("#2f3136"));
                    }
						const embed = new MessageEmbed()
                        .setAuthor("YouTube Together", "https://cdn.discordapp.com/emojis/749289646097432667.png?v=1")
                        .setDescription(`**Click the button to join**`)
                        .setColor("#2f3136")
						.setFooter(`©️ ${bot.user.username}`, bot.user.displayAvatarURL());
						const row = new MessageActionRow()
							.addComponents(
								new MessageButton()
								.setEmoji('896718140573098054')
								.setLabel(`YouTube Together`)
								.setURL(`https://discord.com/invite/${invite.code}`)
								.setStyle('LINK'),
				
							);
						message.reply({
							embeds: [embed],
							components: [row]
						});

                })
	}
}

