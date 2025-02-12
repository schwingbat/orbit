import { render } from "solid-js/web";

import { hslFromRGB, rgbFromHex } from "./utils/convert";
import { makeDebouncer } from "./utils/makeDebouncer";
import { validateHex } from "./utils/validate";

import styles from "./app.module.css";

// import { DownloadSwatch } from "./components/DownloadSwatch/DownloadSwatch";
import { Formats } from "./components/Formats/Formats";
import { Wheel } from "./components/Wheel/Wheel";
import { Colors, createColorState } from "./colors";
import { createEffect, onCleanup, onMount, useContext } from "solid-js";

const appElement = document.querySelector("#app")! as HTMLElement;

const debouncer = makeDebouncer(50, true);

render(
  () => (
    <Colors.Provider value={createColorState()}>
      <Orbit />
    </Colors.Provider>
  ),
  appElement
);

function Orbit() {
  const { hex, hsl, patchHSL } = useContext(Colors);

  let ignoreHashChange = false;

  console.log("render Orbit");

  createEffect(() => {
    const value = hex();
    debouncer.queue(() => {
      ignoreHashChange = true;
      window.location.hash = value;
    });
  });

  function onHashChange() {
    if (ignoreHashChange) {
      ignoreHashChange = false;
      return;
    }

    const hash = window.location.hash.slice(1);

    if (validateHex(hash)) {
      const hsl = hslFromRGB(rgbFromHex(hash));
      patchHSL(hsl);
    }
  }

  onMount(() => {
    const initialHashValue = window.location.hash;
    if (initialHashValue && validateHex(initialHashValue)) {
      patchHSL(hslFromRGB(rgbFromHex(initialHashValue)));
    }

    window.addEventListener("hashchange", onHashChange);

    appElement.classList.remove("loading");
  });

  onCleanup(() => {
    window.removeEventListener("hashchange", onHashChange);
  });

  return (
    <div class={styles.container} style={`background-color: ${hex()}`}>
      <aside class={styles.tools}>{/* <DownloadSwatch /> */}</aside>

      <main class={styles.controls}>
        <Wheel />
        <Formats />
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
