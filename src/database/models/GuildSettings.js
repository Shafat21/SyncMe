const { Schema, model } = require('mongoose');

const guildSchema = Schema({
	guildID: String,
	guildName: String,
	prefix: { type: String, default: require('../../assets/json/defaultGuildSettings.json').prefix },
	// language
	Language: { type: String, default: 'en-US' },
	plugins: { type: Array, default: ['Fun', 'Giveaway', 'Guild', 'Image', 'Misc', 'Moderation', 'Music', 'NSFW', 'Plugins', 'Searcher', 'Ticket'] },
	version: { type: Number, default: '1.2' },
});

module.exports = model('Guild', guildSchema);
