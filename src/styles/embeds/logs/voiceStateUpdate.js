import { EmbedBuilder } from 'discord.js';

const voiceStateUpdate1 = async (author, channel) => {
  return new EmbedBuilder()
    .setDescription(
      `Użytkownik <@${author.id}> połączył się z kanałem <#${channel}>`
    )
    .setAuthor({
      name: author.globalName,
      iconURL: author.displayAvatarURL(),
    })
    .setTimestamp();
};
const voiceStateUpdate2 = async (author, oldchannel, newchannel) => {
  return new EmbedBuilder()
    .setDescription(
      `Użytkownik <@${author.id}> zmienił kanał głosowy <#${oldchannel}> na <#${newchannel}>`
    )
    .setAuthor({
      name: author.globalName,
      iconURL: author.displayAvatarURL(),
    })
    .setTimestamp();
};
export { voiceStateUpdate1, voiceStateUpdate2 };
