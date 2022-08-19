import { makeComponent } from "@woofjs/client";
import {
  formatHex,
  formatRGB,
  formatHSL,
  hslToRGB,
  rgbToHex,
} from "utils/convert";
import { swatchify } from "utils/swatchify";
import { AppServices } from "app";

import styles from "./DownloadSwatch.module.css";

/**
 * A button that downloads a swatch PNG of the current color when clicked.
 */
export const DownloadSwatch = makeComponent<{}, AppServices>((ctx) => {
  const { $hue, $saturation, $lightness, $isDark } = ctx.services.color;

  /**
   * Generate a swatch image and download it with a temporary <a> tag.
   */
  function download() {
    const hsl = {
      h: $hue.get(),
      s: $saturation.get(),
      l: $lightness.get(),
    };
    const rgb = hslToRGB(hsl);
    const hex = rgbToHex(rgb);

    const colors = {
      hsl: formatHSL(hsl),
      rgb: formatRGB(rgb),
      hex: formatHex(hex, true),
    };

    const swatch = swatchify(colors);

    const link = document.createElement("a");
    link.setAttribute("download", `swatch-${colors.hex.slice(1)}.png`);
    link.setAttribute("href", swatch);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <button
      class={styles.button}
      style={{
        "--button-color": $isDark.map((dark) => (dark ? "#fff" : "#000")),
        "--button-hover-bg-color": $isDark.map((dark) =>
          dark ? "#fff3" : "#0002"
        ),
      }}
      onclick={download}
    >
      Download Swatch
    </button>
  );
});
