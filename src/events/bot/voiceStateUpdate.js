// Dependencies
const { MessageEmbed  } = require('discord.js'),{ Embed } = require('../../utils'),
Event = require('../../structures/Event');

/**
 * Voice state update event
 * @event Venom#VoiceStateUpdate
 * @extends {Event}
*/
class VoiceStateUpdate extends Event {
	constructor(...args) {
		super(...args, {
			dirname: __dirname,
		});
	}

	/**
 * Function for receiving event.
 * @param {bot} bot The instantiating client
 * @param {VoiceState} oldState The voice state before the update
 * @param {VoiceState} newState The voice state after the update
 * @readonly
*/
	async run(bot, oldState, newState, message) {
		// variables for easier coding
		const newMember = newState.guild.members.cache.get(newState.id);
		const channel = newState.guild.channels.cache.get(newState.channel?.id ?? newState.channelId);


		// Get server settings / if no settings then return
		const settings = newState.guild.settings;
		if (Object.keys(settings).length == 0) return;

		// Check if event voiceStateUpdate is for logging
		if (settings.ModLogEvents?.includes('VOICESTATEUPDATE') && settings.ModLog) {
			let embed, updated = false;

			// member has been server (un)deafened
			if (oldState.serverDeaf != newState.serverDeaf) {
				embed = new Embed(bot, newState.guild)
					.setDescription(`**${newMember} was server ${newState.serverDeaf ? '' : 'un'}deafened in ${channel.toString()}**`)
					.setColor(newState.serverDeaf ? 15158332 : 3066993)
					.setTimestamp()
					.setFooter({ text: `User: ${newMember.id}` })
					.setAuthor({ name: newMember.user.username, iconURL: newMember.user.displayAvatarURL });
				updated = true;
			}

			// member has been server (un)muted
			if (oldState.serverMute != newState.serverMute) {
				embed = new Embed(bot, newState.guild)
					.setDescription(`**${newMember} was server ${newState.serverMute ? '' : 'un'}muted in ${channel.toString()}**`)
					.setColor(newState.serverMute ? 15158332 : 3066993)
					.setTimestamp()
					.setFooter({ text: `User: ${newMember.id}` })
					.setAuthor({ name: newMember.user.username, iconURL: newMember.user.displayAvatarURL });
				updated = true;
			}

			// member has (stopped/started) streaming
			if (oldState.streaming != newState.streaming) {
				embed = new Embed(bot, newState.guild)
					.setDescription(`**${newMember} has ${newState.streaming ? 'started' : 'stopped'} streaming in ${channel.toString()}**`)
					.setColor(newState.streaming ? 15158332 : 3066993)
					.setTimestamp()
					.setFooter({ text: `User: ${newMember.id}` })
					.setAuthor({ name: newMember.user.username, iconURL: newMember.user.displayAvatarURL });
				updated = true;
			}

			if (updated) {
				// Find channel and send message
				try {
					const modChannel = await bot.channels.fetch(settings.ModLogChannel).catch(() => bot.logger.error(`Error fetching guild: ${newState.guild.id} logging channel`));
					if (modChannel && modChannel.guild.id == newState.guild.id) bot.addEmbed(modChannel.id, [embed]);
				} catch (err) {
					bot.logger.error(`Event: '${this.conf.name}' has error: ${err.message}.`);
				}
			}
		}

		// Only keep the bot in the voice channel by its self for 3 minutes
		const player = bot.manager?.players.get(newState.guild.id);

		if (!player) return;
		if (!newState.guild.members.cache.get(bot.user.id).voice.channelId) player.destroy();

		// Check for stage channel audience change
		if (newState.id == bot.user.id && channel?.type == 'GUILD_STAGE_VOICE') {
			if (!oldState.channelId) {
				try {
					await newState.guild.me.voice.setSuppressed(false).then(() => console.log(null));
				} catch (err) {
					player.pause(true);
				}
			} else if (oldState.suppress !== newState.suppress) {
				player.pause(newState.suppress);
			}
		}
/* Voice Connected */

  // check if the bot is active (playing, paused or empty does not matter (return otherwise)
  if (!player || player.state !== "CONNECTED") return;

  // prepreoces the data
  const stateChange = {};
  // get the state change
  if (oldState.channel === null && newState.channel !== null)
    stateChange.type = "JOIN";
  if (oldState.channel !== null && newState.channel === null)
    stateChange.type = "LEAVE";
  if (oldState.channel !== null && newState.channel !== null)
    stateChange.type = "MOVE";
  if (oldState.channel === null && newState.channel === null) return; // you never know, right
  if (newState.serverMute == true && oldState.serverMute == false)
    return player.pause(true);
  if (newState.serverMute == false && oldState.serverMute == true)
    return player.pause(false);
  // move check first as it changes type
  if (stateChange.type === "MOVE") {
    if (oldState.channel.id === player.voiceChannel) stateChange.type = "LEAVE";
    if (newState.channel.id === player.voiceChannel) stateChange.type = "JOIN";
  }
  // double triggered on purpose for MOVE events
  if (stateChange.type === "JOIN") stateChange.channel = newState.channel;
  if (stateChange.type === "LEAVE") stateChange.channel = oldState.channel;

  // check if the bot's voice channel is involved (return otherwise)
  if (!stateChange.channel || stateChange.channel.id !== player.voiceChannel)
    return;

  // filter current users based on being a bot
  stateChange.members = stateChange.channel.members.filter(
    (member) => !member.user.bot
  );

  switch (stateChange.type) {
    case "JOIN":
      if (stateChange.members.size === 1 && player.paused) {
		player.pause(false);
        let emb = new MessageEmbed()
          .setTitle(`Resuming paused queue`)
		  .setColor(`#2f3136`)
          .setDescription(
            `<:icons_play:861852632800952320> Resuming playback because all of you left me with music to play all alone`
          );
		  const c = bot.channels.cache.get(player.textChannel);
		  if (c) c.send({ embeds: [emb] }).then(m => m.timedDelete({ timeout: 8000 }));
          
        // update the now playing message and bring it to the front
        //let NowPlaying = await bot.channels.cache.get(player.textChannel).send(player.nowPlayingMessage.embeds[0]);
        //player.setNowplayingMessage(NowPlaying);

      }
      break;
    case "LEAVE":
      if (stateChange.members.size === 0 && !player.paused && player.playing) {
        player.pause(true);

        let emb = new MessageEmbed()
          .setTitle(`Paused!`)
		  .setColor(`#2f3136`)
          .setDescription(`<:icons_pause:861852632914198548> The player has been paused because everybody left`);
		const c = bot.channels.cache.get(player.textChannel);
		if (c) c.send({ embeds: [emb] }).then(m => m.timedDelete({ timeout: 10000 }));
      }
      break;
  }

/* Voice Connected */

		if (oldState.id === bot.user.id) return;
		if (!oldState.guild.members.cache.get(bot.user.id).voice.channelId) return;

		// Don't leave channel if 24/7 mode is active
		if (player.twentyFourSeven) return;

		// Make sure the bot is in the voice channel that 'activated' the event
		if (oldState.guild.members.cache.get(bot.user.id).voice.channelId === oldState.channelId) {
			if (oldState.guild.me.voice?.channel && oldState.guild.me.voice.channel.members.filter(m => !m.user.bot).size === 0) {
				const vcName = oldState.guild.me.voice.channel.name;
				await bot.delay(180000);

				// times up check if bot is still by themselves in VC (exluding bots)
				const vcMembers = oldState.guild.me.voice.channel?.members.size;
				if (!vcMembers || vcMembers === 1) {
					const newPlayer = bot.manager?.players.get(newState.guild.id);
					(newPlayer) ? player.destroy() : newState.guild.me.voice.disconnect();
					const embed = new Embed(bot, newState.guild)
					// eslint-disable-next-line no-inline-comments
						.setColor(`#2f3136`)
						.setDescription(`I left 🔉 **${vcName}** because I was inactive for too long.`); // If you are a [Premium](${bot.config.websiteURL}/premium) member, you can disable this by typing ${settings.prefix}24/7.`);
					try {
						const c = bot.channels.cache.get(player.textChannel);
						if (c) c.send({ embeds: [embed] }).then(m => m.timedDelete({ timeout: 60000 }));
					} catch (err) {
						bot.logger.error(err.message);
					}
				}
			}
		}
	}
}

module.exports = VoiceStateUpdate;
