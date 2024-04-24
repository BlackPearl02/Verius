const once = false;
const name = 'messageDelete';
import { messageDelete } from '../../styles/embeds/logs/messageDelete.js';
import { messageCache } from './messageCreate.js';
async function invoke(message) {
  const content = messageCache.get(message.id);
  const logChannel = message.guild.channels.cache.get('716355078272843917');
  logChannel.send({
    embeds: [await messageDelete(message.author, content, message.channel)],
  });
}
export { once, name, invoke };
