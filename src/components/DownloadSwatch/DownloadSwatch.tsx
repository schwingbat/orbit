import { getTranslate } from "@manyducks.co/dolla/translate";
import { formatHex, formatHSL, formatRGB } from "../../utils/convert";
import { swatchify } from "../../utils/swatchify";

import styles from "./DownloadSwatch.module.css";

import { hex, hsl, rgb } from "~/colors";
import { Context, View } from "@manyducks.co/dolla";

/**
 * A button that downloads a swatch PNG of the current color when clicked.
 */

export function DownloadSwatch(this: Context) {
  const { t } = getTranslate(this);

  /**
   * Generate a swatch image and download it with a temporary <a> tag.
   */
  const download = () => {
    const colors = {
      hsl: formatHSL(hsl()),
      rgb: formatRGB(rgb()),
      hex: formatHex(hex(), true),
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
    <button class={styles.button} onClick={download}>
      {t("download")}
    </button>
  );
}
