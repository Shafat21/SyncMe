// Dependencies
const	{ logger } = require('../utils'),
	{ GuildSchema } = require('../database/models');

module.exports.run = async () => {
	logger.log('Updating database');
	try {
		const resp = await GuildSchema.updateMany({ version: '1.1' }, [
			{ $set: { version: '1.2', MutedMembers: [] } },
			{ $unset: [	'ServerStats', 'ServerStatsCate', 'ServerStatsBot', 'ServerStatsBotChannel', 'ServerStatsUse', 'ServerStatsUserChannel',
				'ServerStatsHuman', 'ServerStatsHumanChannel', 'DisabledCommands', 	'ReportToggle', 'CommandChannelToggle', 'CommandChannels', 'CommandCooldown', 'CommandCooldownSec', 'MusicTriviaPlugin',
				'MusicTriviaGenres',
			] }]);
		logger.ready('Database has been updated to v1.3');
		return resp;
	} catch (err) {
		console.log(err);
	}
};
