import "preact/debug";

import { useSignalEffect } from "@preact/signals";
import { render } from "preact";
import { useEffect, useRef } from "preact/hooks";

import { hslFromRGB, rgbFromHex } from "./utils/convert";
import { makeDebouncer } from "./utils/makeDebouncer";
import { validateHex } from "./utils/validate";

import styles from "./app.module.css";

// import { DownloadSwatch } from "./components/DownloadSwatch/DownloadSwatch";
// import { Formats } from "./components/Formats/Formats";
import { Wheel } from "./components/Wheel/Wheel";

const appElement = document.querySelector("#app")! as HTMLElement;

const debouncer = makeDebouncer(50, true);

import { hex, hsl, patchHSL } from "~/colors";

render(<Orbit />, appElement);

function Orbit() {
  const ignoreHashChange = useRef(false);

  console.log("render Orbit");

  useSignalEffect(() => {
    const value = hex.value;
    debouncer.queue(() => {
      ignoreHashChange.current = true;
      window.location.hash = value;
    });
  });

  useEffect(() => {
    const initialHashValue = window.location.hash;
    if (initialHashValue && validateHex(initialHashValue)) {
      hsl.value = hslFromRGB(rgbFromHex(initialHashValue));
    }

    function onHashChange() {
      if (ignoreHashChange.current) {
        ignoreHashChange.current = false;
        return;
      }

      const hash = window.location.hash.slice(1);

      if (validateHex(hash)) {
        const hsl = hslFromRGB(rgbFromHex(hash));
        patchHSL(hsl);
      }
    }

    window.addEventListener("hashchange", onHashChange);

    appElement.classList.remove("loading");

    return () => {
      window.removeEventListener("hashchange", onHashChange);
    };
  }, []);

  return (
    <div class={styles.container} style={{ backgroundColor: hex.value }}>
      <aside class={styles.tools}>{/* <DownloadSwatch /> */}</aside>

      <main class={styles.controls}>
        <Wheel />
        {/* <Formats /> */}
      </main>
    </div>
  );
}

// const Orbit = createView(function () {
//   this.setName("Orbit");

//   let ignoreHashChange = false;

//   this.attachStore(ColorStore(window.location.hash));

//   const { $hex, patchHSL } = this.useStore(ColorStore);

//   const debouncer = makeDebouncer(50, true);

//   this.watch([$hex], (hex) => {
//     debouncer.queue(() => {
//       ignoreHashChange = true;
//       window.location.hash = hex;
//     });
//   });

//   const onHashChange = () => {
//     if (ignoreHashChange) {
//       ignoreHashChange = false;
//       return;
//     }

//     const hash = window.location.hash.slice(1);

//     this.log({ hash, valid: validateHex(hash) });

//     if (validateHex(hash)) {
//       const hsl = hslFromRGB(rgbFromHex(hash));
//       patchHSL(hsl);
//     }
//   };

//   this.onMount(() => {
//     onHashChange();
//     window.addEventListener("hashchange", onHashChange);

//     appElement.classList.remove("loading");
//   });

//   this.onUnmount(() => {
//     window.removeEventListener("hashchange", onHashChange);
//   });

//   return (
//     <div class={styles.container} style={{ backgroundColor: $hex }}>
//       <aside class={styles.tools}>
//         <DownloadSwatch />
//       </aside>

//       <main class={styles.controls}>
//         <Wheel />
//         <Formats />
//       </main>
//     </div>
//   );
// });

// Dolla.watch([Dolla.i18n.$locale], (locale) => {
//   Dolla.batch.write(() => {
//     appElement.classList.forEach((className) => {
//       if (className.startsWith("orbit-locale-")) {
//         appElement.classList.remove(className);
//       }
//     });

//     appElement.classList.add(`orbit-locale-${locale}`);
//   });
// });

// Dolla.mount(appElement, Orbit);
