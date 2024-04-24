import { SlashCommandBuilder } from 'discord.js';
import { AttachmentBuilder } from 'discord.js';
import { createCanvas, loadImage } from 'canvas';
import path from 'path';
import fs from 'fs';
import gifEncoder from 'gifencoder';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const create = () => {
  const command = new SlashCommandBuilder()
    .setName('hello')
    .setDescription('Specify in which channel you can write commands');

  return command.toJSON();
};

async function invoke(member) {
  const channel = member.guild.channels.cache.find(
    (ch) => ch.name === 'powitania'
  );
  if (!channel) return;

  // Create canvas
  const canvasWidth = 700;
  const canvasHeight = 250;
  const canvas = createCanvas(canvasWidth, canvasHeight);
  const ctx = canvas.getContext('2d');

  try {
    // Load background texture
    const texturePath = path.join('src', 'styles', 'banners', 'bg.png');
    console.log(texturePath);
    const texture = await loadImage(texturePath);

    // Apply texture as background
    const pattern = ctx.createPattern(texture, 'repeat');
    ctx.fillStyle = pattern;
    ctx.fillRect(0, 0, canvasWidth, canvasHeight);

    // Get member's avatar
    const avatarURL = member.user.displayAvatarURL({
      format: 'png',
      size: 512,
    });
    const avatar = await loadImage(avatarURL);

    // Draw avatar
    ctx.save();
    ctx.beginPath();
    ctx.arc(125, 125, 50, 0, Math.PI * 2);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatar, 75, 75, 100, 100);
    ctx.restore();

    // Draw text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 24px sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText(member.user.tag, 200, 125);
    ctx.font = 'bold 20px sans-serif';
    ctx.fillText('Welcome to Verius!', 200, 160);

    // Draw animated frame
    const encoder = new gifEncoder(canvasWidth, canvasHeight);
    const gifPath = path.join(
      process.cwd(),
      'src',
      'styles',
      'banners',
      'welcome-animation.gif'
    );

    encoder.createReadStream().pipe(fs.createWriteStream(gifPath));
    encoder.start();
    encoder.setRepeat(0); // Repeat forever
    encoder.setDelay(2); // Delay between frames in milliseconds

    for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Draw frame
      const cornerRadius = 6;
      const frameWidth = 3;
      const r = Math.round(127 + 127 * Math.sin(angle));
      const g = Math.round(127 + 127 * Math.sin(angle + (Math.PI * 2) / 3));
      const b = Math.round(127 + 127 * Math.sin(angle + (Math.PI * 4) / 3));
      ctx.strokeStyle = `rgba(${r},${g},${b},${Math.abs(Math.sin(angle))})`; // Make the frame glow
      ctx.lineWidth = frameWidth;
      ctx.beginPath();
      ctx.moveTo(frameWidth / 2 + cornerRadius, frameWidth / 2);
      ctx.arcTo(
        canvasWidth - frameWidth / 2,
        frameWidth / 2,
        canvasWidth - frameWidth / 2,
        canvasHeight - frameWidth / 2,
        cornerRadius
      );
      ctx.arcTo(
        canvasWidth - frameWidth / 2,
        canvasHeight - frameWidth / 2,
        frameWidth / 2,
        canvasHeight - frameWidth / 2,
        cornerRadius
      );
      ctx.arcTo(
        frameWidth / 2,
        canvasHeight - frameWidth / 2,
        frameWidth / 2,
        frameWidth / 2,
        cornerRadius
      );
      ctx.arcTo(
        frameWidth / 2,
        frameWidth / 2,
        canvasWidth - frameWidth / 2,
        frameWidth / 2,
        cornerRadius
      );
      ctx.closePath();
      ctx.stroke();

      ctx.save();
      ctx.beginPath();
      ctx.arc(125, 125, 50, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(avatar, 75, 75, 100, 100);
      ctx.restore();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 24px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(member.user.tag, 200, 125);
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText('Welcome to Verius!', 200, 160);

      encoder.addFrame(ctx);
    }

    encoder.finish();
    await new Promise((resolve) => setTimeout(resolve, 5000));

    // Send message with attachment
    const attachment = new AttachmentBuilder(fs.readFileSync(gifPath), {
      name: 'welcome-animation.gif',
    });
    channel.send({
      files: [attachment],
    });

    // Remove the temporary gif file
    fs.unlinkSync(gifPath);
  } catch (error) {
    console.error('Error processing image:', error);
  }
}

export { create, invoke };
