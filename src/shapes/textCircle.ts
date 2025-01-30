const textCircle = (text: string, x, y, r, start, ctx) => {
  const numRadsPerLetter = 2 * Math.PI / text.length / 4;
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(start);
  for (let i = 0; i < text.length; i++) {
    ctx.save();
    ctx.rotate(i * numRadsPerLetter);

    ctx.fillText(text[i], 0, -r);
    ctx.restore();
  }
  ctx.restore();
}
