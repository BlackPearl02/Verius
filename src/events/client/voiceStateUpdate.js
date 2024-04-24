const once = false;
const name = 'voiceStateUpdate';
import {
  voiceStateUpdate1,
  voiceStateUpdate2,
} from '../../styles/embeds/logs/voiceStateUpdate.js';

async function invoke(oldState, newState) {
  const guild = newState.guild;
  const logChannel = guild.channels.cache.get('716355078272843917');
  if (!oldState.channelId && newState.channelId) {
    const user = newState.member.user;

    logChannel.send({
      embeds: [await voiceStateUpdate1(user, newState.channelId)],
    });
    return;
  }
  if (
    oldState.channelId != newState.channelId &&
    oldState.channelId != null &&
    newState.channelId != null
  ) {
    const user = newState.member.user;
    logChannel.send({
      embeds: [
        await voiceStateUpdate2(user, oldState.channelId, newState.channelId),
      ],
    });
    return;
  } else {
    return;
  }
}
export { once, name, invoke };
