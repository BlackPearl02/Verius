const once = false;
const name = 'messageUpdate';
import { messageUpdate } from '../../styles/embeds/logs/messageUpdate.js';
import { messageCache } from './messageCreate.js';
async function invoke(message) {
  const logChannel = message.guild.channels.cache.get('716355078272843917');
  logChannel.send({
    embeds: [
      await messageUpdate(
        message.author,
        messageCache.get(message.id),
        message.channel,
        message
      ),
    ],
  });
}
export { once, name, invoke };
