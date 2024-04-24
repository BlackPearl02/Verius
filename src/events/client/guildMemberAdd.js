import { AttachmentBuilder } from 'discord.js';
import { createCanvas, loadImage } from 'canvas';
import path from 'path';
import fs from 'fs';
import gifEncoder from 'gifencoder';

const name = 'guildMemberAdd';
const once = false;

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

  // Draw background
  ctx.fillStyle = '#000000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  try {
    // Get member's avatar
    const avatarURL = member.user.displayAvatarURL({
      extension: 'png',
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
    const frameWidth = 10;
    const centerX = 125;
    const centerY = 125;
    const radius = 55;

    const encoder = new gifEncoder(canvasWidth, canvasHeight);
    const gifPath = path.join(
      process.cwd(),
      'src',
      'styles',
      'baners',
      'welcome-animation.gif'
    );
    encoder.createReadStream().pipe(fs.createWriteStream(gifPath));
    encoder.start();
    encoder.setRepeat(0); // Repeat forever
    encoder.setDelay(2); // Delay between frames in milliseconds

    for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);

      // Draw existing content
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      ctx.save();
      ctx.beginPath();
      ctx.arc(centerX, centerY, 50, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(avatar, 75, 75, 100, 100);
      ctx.restore();

      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 24px sans-serif';
      ctx.textAlign = 'left';
      ctx.fillText(member.user.tag, 200, 125);
      ctx.font = 'bold 20px sans-serif';
      ctx.fillText('Welcome to Verius!', 200, 160);

      const r = Math.round(127 + 127 * Math.sin(angle));
      const g = Math.round(127 + 127 * Math.sin(angle + (Math.PI * 2) / 3));
      const b = Math.round(127 + 127 * Math.sin(angle + (Math.PI * 4) / 3));
      ctx.strokeStyle = `rgb(${r},${g},${b})`;
      ctx.lineWidth = frameWidth;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();

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

export { once, name, invoke };
