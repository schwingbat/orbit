import {
  Context,
  createRoot,
  getDebug,
  html,
  onEffect,
  onMount,
  Renderable,
  setLogFilter,
  setLogLevel,
} from "@manyducks.co/dolla";
import {
  createRouterPlugin,
  getRouter,
  Outlet,
} from "@manyducks.co/dolla/router";
import {
  createTranslatePlugin,
  getTranslate,
} from "@manyducks.co/dolla/translate";

import { debounce } from "./utils/makeDebouncer";
import { hslIsValid } from "./utils/validate";

import styles from "./app.module.css";

import { DownloadSwatch } from "./components/DownloadSwatch/DownloadSwatch";
import { Formats } from "./components/Formats/Formats";
import { Wheel } from "./components/Wheel/Wheel";

setLogLevel(import.meta.env.DEV ? "info" : "error");
setLogFilter(
  import.meta.env.DEV ? () => true : (name) => !name.startsWith("dolla"),
);

const appElement = document.querySelector("#app")! as HTMLElement;

import {
  deserializeHSL,
  hex,
  hsl,
  isDark,
  serializeHSL,
  setHSL,
} from "~/colors";
import { LanguageSelect } from "./components/LanguageSelect/LanguageSelect";
import { NavLink } from "./components/NavLink/NavLink";

type OrbitProps = {
  // data: string;
  children: Renderable;
};

function Orbit(this: Context, props: OrbitProps) {
  const { t } = getTranslate(this);
  const router = getRouter(this);
  const debug = getDebug(this);

  const updateColorParam = debounce(200, (value) => {
    debug.info("color", value);
    router.setQuery({ color: serializeHSL(value) });
  });

  let loaded = false;

  onEffect(this, () => {
    const value = hsl();
    if (!loaded) {
      loaded = true;
      return;
    }
    updateColorParam(value);
  });

  onMount(this, () => {
    const color = router.query().color;
    if (color) {
      // Set color from query param
      const parsed = deserializeHSL(color);
      if (hslIsValid(parsed)) {
        setHSL(parsed);
      }
    }

    appElement.classList.remove("loading");
  });

  return html`
    <div
      class=${styles.container}
      style=${{
        "background-color": hex,
        "--button-color": () => (isDark() ? "#fff" : "#000"),
        "--button-color-bg-hover": () => (isDark() ? "#fff3" : "#0002"),
      }}
    >
      <aside class=${styles.tools}>
        <${LanguageSelect} />
        <${DownloadSwatch} />
      </aside>

      ${props.children}

      <nav class=${styles.tabs}>
        <ul>
          <li>
            <${NavLink} href="/picker"> ${t("nav.picker")} <//>
          </li>
          <li>
            <${NavLink} href="/favorites"> ${t("nav.favorites")} <//>
          </li>
        </ul>
      </nav>
    </div>
  `;
}

function Picker() {
  return html`
    <main class=${styles.controls}>
      <${Wheel} />
      <${Formats} />
    </main>
  `;
}

function Favorites() {
  return html`
    <main class=${styles.controls}>
      <h1>FAVORITES</h1>
    </main>
  `;
}

createRoot(appElement, { debug: true })
  .plugin(
    createTranslatePlugin({
      locale: "ja",
      translations: {
        en: {
          saturation: "SATURATION",
          lightness: "LIGHTNESS",
          download: "Download Swatch",
          language: "LANGUAGE",
          favorite: "ADD FAVORITE",
          unfavorite: "REMOVE FAVORITE",
          nav: {
            favorites: "FAVORITES",
            picker: "PICKER",
          },
        },
        ja: {
          saturation: "彩度",
          lightness: "明度",
          download: "スウォッチを入手",
          language: "言語",
          favorite: "おきに入り追加",
          unfavorite: "おきに入り削除",
          nav: {
            favorites: "お気に入り",
            picker: "カラーピッカー",
          },
        },
      },
    }),
  )
  .plugin(
    createRouterPlugin({
      hash: true,
      preserveQuery: true,
      routes: [
        {
          path: "",
          view: Orbit,
          routes: [
            {
              path: "/picker",
              view: Picker,
              // preload: () =>
              //   new Promise((resolve) =>
              //     setTimeout(resolve, Math.random() * 1000),
              //   ),
            },
            {
              path: "/favorites",
              view: Favorites,
              // preload: () =>
              //   new Promise((resolve) =>
              //     setTimeout(resolve, Math.random() * 1000),
              //   ),
            },
            { path: "*", redirect: "/picker" },
          ],
        },
      ],
    }),
  )
  .mount(Outlet);
