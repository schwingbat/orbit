import { useComputed } from "@preact/signals";
import { formatHex, formatHSL, formatRGB } from "../../utils/convert";
import { swatchify } from "../../utils/swatchify";

import styles from "./DownloadSwatch.module.css";

import { hsl, rgb, hex, isDark } from "~/colors";

/**
 * A button that downloads a swatch PNG of the current color when clicked.
 */
export function DownloadSwatch() {
  console.log("render DownloadSwatch");

  /**
   * Generate a swatch image and download it with a temporary <a> tag.
   */
  const download = () => {
    const colors = {
      hsl: formatHSL(hsl.value),
      rgb: formatRGB(rgb.value),
      hex: formatHex(hex.value, true),
    };

    const swatch = swatchify(colors);

    const link = document.createElement("a");
    link.setAttribute("download", `swatch-${colors.hex.slice(1)}.png`);
    link.setAttribute("href", swatch);

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <button
      class={styles.button}
      style={useComputed(
        () =>
          `--button-color: ${
            isDark.value ? "#fff" : "#000"
          }; --button-color-bg-hover: ${isDark.value ? "#fff3" : "#0002"}`
      )}
      onClick={download}
    >
      Download Swatch
    </button>
  );
}
