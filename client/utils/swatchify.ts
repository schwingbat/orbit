/*
 * Swatchify.js
 * ------------
 * Convert a given color into a downloadable
 * color swatch with canvas.
 */

type Colors = {
  hex: string;
  hsl: string;
  rgb: string;
};

const fontStack =
  '-apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", sans-serif';

export function swatchify(color: Colors, scale = 1) {
  const canvas = document.createElement("canvas");
  const c = canvas.getContext("2d")!;

  /*
   * 1. Paint a circular swatch
   * 2. Print text for each color format
   * 3. Return image data as base64
   */

  const width = (canvas.width = 640 * scale);
  const height = (canvas.height = 200 * scale);

  // Solid White BG
  c.fillStyle = "white";
  c.fillRect(0, 0, width, height);

  // Circular Swatch
  const swatchMargin = 45 * scale;
  const swatchSize = height - swatchMargin;

  c.fillStyle = color.hex;
  c.arc(height / 2, height / 2, swatchSize / 2, 0, 360, false);
  c.fill();

  // Color Text
  const textMargin = height;
  c.fillStyle = "#222222";
  c.textBaseline = "middle";

  // Labels
  c.font = `bold ${42 * scale}px ${fontStack}`;

  c.fillText("HSL", textMargin, height / 4.5);
  c.fillText("HEX", textMargin, height / 2);
  c.fillText("RGB", textMargin, (height / 4.5) * 3.5);

  // Values
  const labelOffset = 110 * scale;
  c.font = `${42 * scale}px ${fontStack}`;

  c.fillText(color.hsl, textMargin + labelOffset, height / 4.5);
  c.fillText(color.hex, textMargin + labelOffset, height / 2);
  c.fillText(color.rgb, textMargin + labelOffset, (height / 4.5) * 3.5);

  // Return as image data
  return canvas.toDataURL("image/png");
}
