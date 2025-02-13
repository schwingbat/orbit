import { derive, t, type ViewContext } from "@manyducks.co/dolla";
import { ColorStore } from "../../stores/ColorStore";
import { formatHex, formatHSL, formatRGB } from "../../utils/convert";
import { swatchify } from "../../utils/swatchify";

import styles from "./DownloadSwatch.module.css";

/**
 * A button that downloads a swatch PNG of the current color when clicked.
 */
export function DownloadSwatch(_: {}, ctx: ViewContext) {
  const { $hsl, $rgb, $hex, $isDark } = ctx.use(ColorStore);

  /**
   * Generate a swatch image and download it with a temporary <a> tag.
   */
  const download = () => {
    const colors = {
      hsl: formatHSL($hsl.get()),
      rgb: formatRGB($rgb.get()),
      hex: formatHex($hex.get(), true),
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
      style={{
        "--button-color": derive([$isDark], (dark) => (dark ? "#fff" : "#000")),
        "--button-hover-bg-color": derive([$isDark], (dark) =>
          dark ? "#fff3" : "#0002",
        ),
      }}
      onclick={download}
    >
      {t("downloadSwatch")}
    </button>
  );
}
