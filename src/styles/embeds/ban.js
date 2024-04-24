import { EmbedBuilder } from 'discord.js';

var currentdate = new Date();
var datetime =
  'Banned at: ' +
  currentdate.getDate() +
  '/' +
  (currentdate.getMonth() + 1) +
  '/' +
  currentdate.getFullYear() +
  ' @ ' +
  currentdate.getHours() +
  ':' +
  currentdate.getMinutes() +
  ':' +
  currentdate.getSeconds();
//embed
const banEmbed = async (author, user, reason) => {
  return new EmbedBuilder()
    .setColor(0xff0000)
    .addFields(
      { name: 'Admin', value: `${author}`, inline: true },
      { name: 'User', value: `${user}`, inline: true },
      { name: 'Reason', value: `${reason}`, inline: true }
    )
    .setFooter({
      text: `${datetime}`,
    });
};
export default banEmbed;
