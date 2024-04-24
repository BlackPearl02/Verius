const once = false;
const name = 'interactionCreate';
import Config from '../../schemas/guildConfig.js';
async function invoke(interaction) {
  let config = await Config.find({
    guildId: interaction.guild.id,
  }).select('channel -_id');

  if (interaction.isChatInputCommand()) {
    if (config[0].channel !== null) {
      if (interaction.channel.id !== config[0].channel) {
        return interaction.reply({
          ephemeral: true,
          content: `You must write in <#${config[0].channel}> channel`,
        });
      }
      return (await import(`#commands/${interaction.commandName}`)).invoke(
        interaction
      );
    } else if (config[0].channel === null) {
      return (await import(`#commands/${interaction.commandName}`)).invoke(
        interaction
      );
    }
  }
  if (interaction.isButton()) {
    const name = interaction.customId.split('_')[0];

    (await import(`#buttons/${name}`)).invoke(interaction);
  }
}

export { once, name, invoke };
