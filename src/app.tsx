import Dolla, { type ViewContext } from "@manyducks.co/dolla";

import { rgbFromHex, hslFromRGB } from "./utils/convert";
import { makeDebouncer } from "./utils/makeDebouncer";
import { validateHex } from "./utils/validate";

import styles from "./app.module.css";

import { ColorStore } from "./stores/ColorStore";

import { DownloadSwatch } from "./components/DownloadSwatch/DownloadSwatch";
import { Formats } from "./components/Formats/Formats";
import { Wheel } from "./components/Wheel/Wheel";

const appElement = document.querySelector("#app")! as HTMLElement;

Dolla.i18n.setup({
  locale: "auto",
  translations: [
    {
      locale: "en",
      fetch: async () => {
        return {
          downloadSwatch: "Download Swatch",
          saturation: "Saturation",
          lightness: "Lightness",
        };
      },
    },
    {
      locale: "ja",
      fetch: async () => {
        return {
          downloadSwatch: "見本をダウンロード",
          saturation: "彩度",
          lightness: "明度",
        };
      },
    },
    {
      locale: "es",
      fetch: async () => {
        return {
          downloadSwatch: "Descargar muestra",
          saturation: "Saturación",
          lightness: "Luminosidad",
        };
      },
    },
  ],
});

function Orbit(_: {}, ctx: ViewContext) {
  ctx.setName("Orbit");

  let ignoreHashChange = false;

  const { $hex, patchHSL } = ctx.provide(ColorStore, window.location.hash);

  const debouncer = makeDebouncer(50, true);

  ctx.watch([$hex], (hex) => {
    debouncer.queue(() => {
      ignoreHashChange = true;
      window.location.hash = hex;
    });
  });

  const onHashChange = () => {
    if (ignoreHashChange) {
      ignoreHashChange = false;
      return;
    }

    const hash = window.location.hash.slice(1);

    ctx.log({ hash, valid: validateHex(hash) });

    if (validateHex(hash)) {
      const hsl = hslFromRGB(rgbFromHex(hash));
      patchHSL(hsl);
    }
  };

  ctx.onMount(() => {
    onHashChange();
    window.addEventListener("hashchange", onHashChange);

    appElement.classList.remove("loading");
  });

  ctx.onUnmount(() => {
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
}

Dolla.watch([Dolla.i18n.$locale], (locale) => {
  Dolla.batch.write(() => {
    appElement.classList.forEach((className) => {
      if (className.startsWith("orbit-locale-")) {
        appElement.classList.remove(className);
      }
    });

    appElement.classList.add(`orbit-locale-${locale}`);
  });
});

Dolla.mount(appElement, Orbit);
