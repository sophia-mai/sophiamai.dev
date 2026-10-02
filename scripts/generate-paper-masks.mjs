import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';

const sources = {
  rainier: 'mount-rainier/sophia-looking-at-mount-rainier',
  'lake-22': 'lake-22/sophia-at-lake-22-with-trees',
  'flower-bouquet': 'flowers/sophia-with-flowers',
  'bainbridge-troll': 'bainbridge/sophia-with-bainbridge-troll',
  'snow-day': 'snow/sophia-sitting-in-snow',
};

await mkdir('public/assets/paper-masks', { recursive: true });
for (const [name, source] of Object.entries(sources)) {
  const { data, info: { width, height } } = await sharp(`public/assets/personal/cutouts/${source}.png`)
    .resize({ width: 540 }).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  const exterior = new Uint8Array(width * height);
  const queue = [];
  function visit(pixel) {
    if (exterior[pixel]) return;
    const i = pixel * 3;
    if (data[i] < 245 || data[i + 1] < 245 || data[i + 2] < 245) return;
    exterior[pixel] = 1;
    queue.push(pixel);
  }
  for (let x = 0; x < width; x++) { visit(x); visit((height - 1) * width + x); }
  for (let y = 0; y < height; y++) { visit(y * width); visit(y * width + width - 1); }
  // Remove only white connected to the canvas edge, preserving white within the photograph.
  for (let cursor = 0; cursor < queue.length; cursor++) {
    const pixel = queue[cursor], x = pixel % width;
    if (x > 0) visit(pixel - 1);
    if (x < width - 1) visit(pixel + 1);
    if (pixel >= width) visit(pixel - width);
    if (pixel < width * (height - 1)) visit(pixel + width);
  }
  let path = '';
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width;) {
      if (exterior[y * width + x]) { x++; continue; }
      const start = x;
      while (x < width && !exterior[y * width + x]) x++;
      path += `M${start} ${y}h${x - start}v1H${start}z`;
    }
  }
  await writeFile(`public/assets/paper-masks/${name}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" preserveAspectRatio="none"><path fill="white" d="${path}"/></svg>\n`);
}
