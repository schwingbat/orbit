import { makeApp, mergeStates, ServicesOf } from "@woofjs/client";
import { hslToRGB, rgbToHex, hexToRGB, rgbToHSL } from "./utils/convert";
import { validateHex } from "./utils/validate";
import { makeDebouncer } from "./utils/makeDebouncer";

import "./styles/global.css";
import styles from "./app.module.css";

import color from "./services/color";

import DownloadSwatch from "./components/DownloadSwatch";
import Formats from "./components/Formats";
import Wheel from "./components/Wheel";

const app = makeApp({
  services: {
    color,
  },
});

// Infer service types on app for components.
export type AppServices = ServicesOf<typeof app>;

app.route("*", (ctx) => {
  let ignoreHashChange = false;

  // NOTE: Services aren't
  const { $hue, $saturation, $lightness } = ctx.services.color;

  const $hex = mergeStates($hue, $saturation, $lightness).into((h, s, l) => {
    return rgbToHex(hslToRGB({ h, s, l }));
  });

  const debouncer = makeDebouncer(50, true);

  ctx.subscribeTo($hex, (hex) => {
    debouncer.queue(() => {
      ignoreHashChange = true;
      window.location.hash = hex;
    });
  });

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

  ctx.afterConnect(() => {
    onHashChange();
    window.addEventListener("hashchange", onHashChange);
  });

  ctx.beforeDisconnect(() => {
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
