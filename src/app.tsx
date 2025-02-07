import Dolla, { createView } from "@manyducks.co/dolla";

import { hexToRGB, rgbToHSL } from "./utils/convert";
import { makeDebouncer } from "./utils/makeDebouncer";
import { validateHex } from "./utils/validate";

import styles from "./app.module.css";

import { ColorStore } from "./stores/ColorStore";

import DownloadSwatch from "./components/DownloadSwatch";
import Formats from "./components/Formats";
import { Wheel } from "./components/Wheel/Wheel";

Dolla.setEnv("development");

Dolla.attachStore(ColorStore());

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
  ],
});

const Orbit = createView(function () {
  this.setName("Orbit");

  let ignoreHashChange = false;

  const { $hex } = this.useStore(ColorStore);

  const debouncer = makeDebouncer(50, true);

  this.watch([$hex], (hex) => {
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

    this.log({ hash, valid: validateHex(hash) });

    if (validateHex(hash)) {
      const hsl = rgbToHSL(hexToRGB(hash));
      this.emit("hsl:patch", hsl);
    }
  };

  this.onMount(() => {
    onHashChange();
    window.addEventListener("hashchange", onHashChange);
  });

  this.onUnmount(() => {
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

// TODO: This should work by just mounting the view directly, but we need a router or it throws an error.
// Dolla.router.setup({
//   hash: true,
//   routes: [
//     {
//       path: "*",
//       view: Orbit,
//     },
//   ],
// });

const appElement = document.querySelector("#app")! as HTMLElement;

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
