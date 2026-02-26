const { 
  SlashCommandBuilder,
  REST,
  Routes,
  EmbedBuilder
} = require("discord.js");

const buildEngine = require("../engine/buildEngine");
const progressBar = require("../utils/progressBar");
const fs = require("fs");

module.exports = async (client) => {

  client.on("interactionCreate", async interaction => {

    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === "obfuscator") {

      const attachment = interaction.options.getAttachment("file");

      if (!attachment.name.endsWith(".lua")) {
        return interaction.reply({ content: "❌ Must be .lua file", ephemeral: true });
      }

      await interaction.reply("⏳ Starting...");
      const msg = await interaction.fetchReply();

      try {

        const res = await fetch(attachment.url);
        const code = await res.text();

        const stages = [
          "Parsing AST...",
          "Detecting Core...",
          "Compiling Mini VM...",
          "Renaming Variables...",
          "Encrypting Strings..."
        ];

        for (let i = 0; i < stages.length; i++) {
          const percent = (i + 1) / stages.length;
          await msg.edit({
            embeds: [
              new EmbedBuilder()
                .setTitle("Obfuscation Progress")
                .setDescription(progressBar(percent) + "\n" + stages[i])
                .setColor(0x00ff99)
            ]
          });

          await new Promise(r => setTimeout(r, 800));
        }

        const output = buildEngine(code);
        fs.writeFileSync("output.lua", output);

        await msg.edit("✅ Done!");

        await interaction.followUp({
          files: ["output.lua"]
        });

      } catch (err) {
        await msg.edit("❌ Error:\n```" + err.message + "```");
      }
    }
  });

};
