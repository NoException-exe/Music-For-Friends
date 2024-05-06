const { SlashCommandBuilder } = require("discord.js");
const { useMainPlayer } = require("discord-player");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("skip")
    .setDescription("Skip current music"),
  async execute(interaction) {
    const player = useMainPlayer();
    const channel = interaction.member.voice.channel;
    if (!channel)
      return interaction.reply("You are not connected to a voice channel!"); // make sure we have a voice channel

    // let's defer the interaction as things can take time to process
    await interaction.deferReply();

    try {
      const query = player.nodes.get(interaction.guild.id);

      if (!query || !query.isPlaying()) {
        return interaction.followUp(
          `There is no music playing in this moment!`
        );
      }

      query.node.skip();
      return interaction.followUp(`Music skipped!`);
    } catch (e) {
      return interaction.followUp(`Something went wrong: ${e}`);
    }
  },
};
