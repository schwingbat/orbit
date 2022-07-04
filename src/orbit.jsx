import { makeApp, mergeStates } from "@woofjs/client";
import { hslToRGB, rgbToHex, hexToRGB, rgbToHSL } from "utils/convert";

import "./styles/global.css";
import styles from "./orbit.module.css";

import color from "./services/color";

import DownloadSwatch from "./components/DownloadSwatch";
import Formats from "./components/Formats";
import Wheel from "./components/Wheel";
import { validateHex } from "utils/validate";

const app = makeApp();

app.service("color", color);

app.route("*", ($attrs, self) => {
  let ignoreHashChange = false;

  const { $hue, $saturation, $lightness } = self.getService("color");

  const $hex = mergeStates($hue, $saturation, $lightness, (h, s, l) => {
    return rgbToHex(hslToRGB({ h, s, l }));
  });

  self.watchState(
    $hex,
    (hex) => {
      ignoreHashChange = true;
      window.location.hash = hex;
    },
    { immediate: false }
  );

  function onHashChange() {
    if (ignoreHashChange) {
      ignoreHashChange = false;
      return;
    }

    const hash = window.location.hash.slice(1);

    if (validateHex(hash)) {
      const hsl = rgbToHSL(hexToRGB(hash));

      $hue.set(hsl.h);
      $saturation.set(hsl.s);
      $lightness.set(hsl.l);
    }
  }

  self.afterConnect(() => {
    onHashChange();
    window.addEventListener("hashchange", onHashChange);
  });

  self.beforeDisconnect(() => {
    window.removeEventListener("hashchange", onHashChange);
  });

  return (
    <div class={styles.container} style={{ backgroundColor: $hex }}>
      <aside class={styles.tools}>
        <DownloadSwatch />
      </aside>

      <main class={styles.controls}>
        <Wheel />
        <Formats />
      </main>
    </div>
  );
});

app.connect("#app");
