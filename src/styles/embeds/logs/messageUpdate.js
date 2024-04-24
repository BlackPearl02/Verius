import { EmbedBuilder } from 'discord.js';

const messageUpdate = async (author, oldcontent, channel, newmessage) => {
  return new EmbedBuilder()
    .setDescription(
      `Wiadomość wysłana przez <@${author.id}> o treści:\n**[${oldcontent}](${newmessage.url})**\n została edytowana na kanale ${channel}`
    )
    .setAuthor({
      name: author.globalName,
      iconURL: author.displayAvatarURL(),
    })
    .setTimestamp();
};
export { messageUpdate };
