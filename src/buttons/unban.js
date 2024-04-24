import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js';

const invoke = async (interaction) => {
  if (!interaction.member.permissions.has('BAN_MEMBERS')) {
    return interaction.reply({
      content: 'You do not have the required permissions to click this button.',
      ephemeral: true,
    });
  }

  const yes = new ButtonBuilder()
    .setCustomId('unban_yes')
    .setLabel('Yes')
    .setStyle(ButtonStyle.Success);

  const no = new ButtonBuilder()
    .setCustomId('unban_no')
    .setLabel('No')
    .setStyle(ButtonStyle.Danger);

  const yes_no_button = new ActionRowBuilder().addComponents([yes, no]);
  await interaction.reply({
    content: `Are you sure to unban this user?`,
    components: [yes_no_button],
    ephemeral: true,
  });
  let userIdToUnban;
  if (
    interaction.customId != 'unban_yes' ||
    interaction.customId != 'unban_no'
  ) {
    userIdToUnban = interaction.customId.split('_')[2];
  }

  try {
    const filter = (i) =>
      i.customId === 'unban_yes' || i.customId === 'unban_no';
    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      time: 60000,
      max: 1,
    });

    collector.on('collect', async (i) => {
      if (i.customId === 'unban_yes') {
        // Unban the user using the userIdToUnban
        await interaction.guild.members.unban(userIdToUnban);
        interaction.followUp({
          content: `User with ID ${userIdToUnban} has been unbanned.`,
        });
      } else {
        interaction.followUp({
          content: 'Unban operation canceled by the user.',
          ephemeral: true,
        });
      }
    });

    collector.on('end', (collected, reason) => {
      if (reason === 'time') {
        interaction.followUp({
          content: 'The interaction timed out. Please try again.',
          ephemeral: true,
        });
      }
    });
  } catch (error) {
    console.error(error);
    interaction.followUp({
      content: 'An error occurred while processing your request.',
      ephemeral: true,
    });
  }
};

export { invoke };
