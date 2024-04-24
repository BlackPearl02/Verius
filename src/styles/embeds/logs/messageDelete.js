import { EmbedBuilder } from 'discord.js';

const messageDelete = async (author, content, channel) => {
  return new EmbedBuilder()
    .setDescription(
      `Wiadomość wysłana przez <@${author.id}> o treści:\n**${content}**\n została usunięta na kanale ${channel}`
    )
    .setAuthor({
      name: author.globalName,
      iconURL: author.displayAvatarURL(),
    })
    .setTimestamp();
};
export { messageDelete };
