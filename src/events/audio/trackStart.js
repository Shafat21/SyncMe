// Dependencies
const	{ MessageEmbed, MessageActionRow, MessageButton } = require('discord.js'),
{ Embed, time: { getReadableTime } } = require('../../utils'),
	Event = require('../../structures/Event');

/**
 * Track start event
 * @event AudioManager#TrackStart
 * @extends {Event}
*/
class TrackStart extends Event {
	constructor(...args) {
		super(...args, {
			dirname: __dirname,
		});
	}

	/**
   * Function for recieving event.
	 * @param {bot} bot The instantiating client
	 * @param {Player} player The player that's track started
	 * @param {Track} track The track that started
	 * @readonly
	*/
	async run(bot, player, track) {
		//PLay 861852632800952320
		// When a song starts
		const { duration } = player.queue.current;
        const parsedDuration = getReadableTime(duration);
        const thing = new Embed(bot, bot.guilds.cache.get(player.guild))
            .setColor('#2f3136')
            .setTitle('music/np:AUTHOR')
            .setDescription(`[${track.title}](${track.uri})`)
			.addField('<:icons_friends:861852632767528970> Requested By', `${bot.guilds.cache.get(player.guild).members.cache.get(track.requester.id)}`, true)
			.addField('<:icons_reminder:859388128364199946> Duration :', `${parsedDuration}`, true)
            .setFooter(`©️ SyncMe | Please Vote to let vote grow`, bot.user.displayAvatarURL());

  const But1 = new MessageButton().setCustomId("vdown").setLabel(`Volume Down`).setEmoji("860133546278387763").setStyle("PRIMARY");

  const But2 = new MessageButton().setCustomId("stop").setLabel(`Stop`).setEmoji("861852633979420712").setStyle("SECONDARY");

  const But3 = new MessageButton().setCustomId("pause").setLabel(`Resume/Pause`).setEmoji("970640720014737409").setStyle("SUCCESS");

  const But4 = new MessageButton().setCustomId("skip").setLabel(`Skip`).setEmoji("861852633799065660").setStyle("SECONDARY");

  const But5 = new MessageButton().setCustomId("vup").setLabel(`Volume Up`).setEmoji("860133545544908802").setStyle("PRIMARY");

  const But6 = 	new MessageButton().setEmoji('909715386843430933').setLabel('Vote on Top.gg').setURL(bot.config.voteURL).setStyle('LINK');

  const row = new MessageActionRow().addComponents(But1, But2, But3, But4, But5);

  const row2= new MessageActionRow().addComponents(But6);

  let NowPlaying = await bot.channels.cache.get(player.textChannel).send({ embeds: [thing], components: [row, row2] });
  
  player.setNowplayingMessage(NowPlaying);

  const embed = new MessageEmbed()
    .setColor(`#2f3136`)
    .setTimestamp();
  const collector = NowPlaying.createMessageComponentCollector({
    filter: (b) => {
      if (b.guild.me.voice.channel && b.guild.me.voice.channelId === b.member.voice.channelId) return true;
      else {
        b.reply({ content: `You are not connected to ${b.guild.me.voice.channel} to use this buttons.`, ephemeral: true }); return false;
      };
    },
    time: track.duration,
  });

  collector.on("collect", async (i) => {
    await i.deferReply({
      ephemeral: false
    });
    if (i.customId === "vdown") {
      if (!player) {
        return collector.stop();
      }
      let amount = Number(player.volume) - 10;
      await player.setVolume(amount);
      i.editReply({ embeds: [embed.setAuthor(`${i.member.user.tag}`).setDescription(`<:icons_speaker:860133545544908802> The current volume is: **${amount}**`)] }).then(msg => { setTimeout(() => { msg.delete() }, 8000) });
    } else if (i.customId === "stop") {
      if (!player) {
        return collector.stop();
      }
      await player.stop();
      await player.queue.clear();
      i.editReply({ embeds: [embed.setAuthor(`${i.member.user.tag}`).setDescription(`<:icons_musicstop:861852633979420712> Stopped the music`)] }).then(msg => { setTimeout(() => { msg.delete() }, 8000) });
      return collector.stop();
    } else if (i.customId === "pause") {
      if (!player) {
        return collector.stop();
      }
      player.pause(!player.paused);
      const Text = player.paused ? `<:icons_pause:861852632914198548> **Paused**` : `<:icons_play:861852632800952320> **Resume**`;
      const Text2 = player.paused ? `<:icons_play:861852632800952320> **Resume**` : `<:icons_pause:861852632914198548> **Paused**`;
      i.editReply({ embeds: [embed.setAuthor(`${i.member.user.tag}`).setDescription(`${Text} \n[${player.queue.current.title}](${player.queue.current.uri})\nPress again for ${Text2}`)] }).then(msg => { setTimeout(() => { msg.delete() }, 8000) });
    } else if (i.customId === "skip") {
      if (!player) {
        return collector.stop();
      }
      await player.stop();
      i.editReply({ embeds: [embed.setAuthor(`${i.member.user.tag}`).setDescription(`<:icons_dred:875710295866216509> **Skipped**\n[${player.queue.current.title}](${player.queue.current.uri})`)] }).then(msg => { setTimeout(() => { msg.delete() }, 8000) });
      if (track.length === 1) {
        return collector.stop();
      }
    } else if (i.customId === "vup") {
      if (!player) {
        return collector.stop();
      }
      let amount = Number(player.volume) + 10;
      if (amount >= 150) return i.editReply({ embeds: [embed.setAuthor(`${i.member.user.tag}`).setDescription(`Cannot higher the player volume further more.`)] }).then(msg => { setTimeout(() => { msg.delete() }, 8000) });
      await player.setVolume(amount);
      i.editReply({ embeds: [embed.setAuthor(`${i.member.user.tag}`).setDescription(`<:icons_speaker:860133545544908802> The current volume is: **${amount}**`)] }).then(msg => { setTimeout(() => { msg.delete() }, 8000) });
      return;
    }
  });
  

	}
}

module.exports = TrackStart;
