import sharp from 'sharp';
import fs from 'fs';

async function processLogo() {
  const image = sharp('public/logo.png');
  const metadata = await image.metadata();
  console.log(`Original logo: ${metadata.width}x${metadata.height}, channels: ${metadata.channels}`);

  // Get raw RGBA buffer
  const { data, info } = await image
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });

  const width = info.width;
  const height = info.height;
  const channels = info.channels; // 4 (R, G, B, A)

  // We want to flood-fill from borders so only outer background becomes transparent,
  // preserving any white elements inside the logo illustration (like white villa walls or cloud highlights).
  const visited = new Uint8Array(width * height);
  const queue = [];

  // Seed boundary pixels (top, bottom, left, right edges)
  for (let x = 0; x < width; x++) {
    queue.push([x, 0]);
    queue.push([x, height - 1]);
  }
  for (let y = 0; y < height; y++) {
    queue.push([0, y]);
    queue.push([width - 1, y]);
  }

  function isWhite(x, y) {
    const idx = (y * width + x) * channels;
    const r = data[idx];
    const g = data[idx + 1];
    const b = data[idx + 2];
    // Threshold for pure or near white background
    return r > 240 && g > 240 && b > 240;
  }

  let head = 0;
  while (head < queue.length) {
    const [cx, cy] = queue[head++];
    const pos = cy * width + cx;
    if (visited[pos]) continue;
    visited[pos] = 1;

    if (isWhite(cx, cy)) {
      // Make this pixel transparent
      const idx = pos * channels;
      data[idx + 3] = 0; // alpha = 0

      // Add 4-directional neighbors
      if (cx > 0 && !visited[cy * width + (cx - 1)] && isWhite(cx - 1, cy)) {
        queue.push([cx - 1, cy]);
      }
      if (cx < width - 1 && !visited[cy * width + (cx + 1)] && isWhite(cx + 1, cy)) {
        queue.push([cx + 1, cy]);
      }
      if (cy > 0 && !visited[(cy - 1) * width + cx] && isWhite(cx, cy - 1)) {
        queue.push([cx, cy - 1]);
      }
      if (cy < height - 1 && !visited[(cy + 1) * width + cx] && isWhite(cx, cy + 1)) {
        queue.push([cx, cy + 1]);
      }
    }
  }

  // Soften / feather edges slightly for anti-aliasing
  for (let y = 1; y < height - 1; y++) {
    for (let x = 1; x < width - 1; x++) {
      const idx = (y * width + x) * channels;
      if (data[idx + 3] > 0) {
        // Check if adjacent to transparent
        let hasTrans = false;
        let transNeighbors = 0;
        const neighbors = [
          (y * width + (x - 1)) * channels + 3,
          (y * width + (x + 1)) * channels + 3,
          ((y - 1) * width + x) * channels + 3,
          ((y + 1) * width + x) * channels + 3
        ];
        for (const n of neighbors) {
          if (data[n] === 0) {
            hasTrans = true;
            transNeighbors++;
          }
        }
        if (hasTrans && data[idx] > 230 && data[idx+1] > 230 && data[idx+2] > 230) {
          // Feather alpha
          data[idx + 3] = Math.round(255 * (1 - transNeighbors / 5));
        }
      }
    }
  }

  // Save transparent PNG version
  await sharp(data, {
    raw: {
      width,
      height,
      channels
    }
  })
  .png()
  .toFile('public/logo-transparent.png');

  // Also copy to src/assets/logo-transparent.png
  await sharp(data, {
    raw: { width, height, channels }
  })
  .png()
  .toFile('src/assets/logo-transparent.png');

  console.log('Successfully generated public/logo-transparent.png and src/assets/logo-transparent.png!');
}

processLogo().catch(console.error);
