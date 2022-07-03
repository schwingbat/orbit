import { makeApp, makeState } from "@woofjs/client";

import styles from "./orbit.module.css";

import color from "./services/color";

import Formats from "./components/Formats";
import Wheel from "./components/Wheel";

const app = makeApp();

app.service("color", color);

app.route("*", ($attrs, self) => {
  const $isLight = makeState(true);

  return (
    <div class={styles.container}>
      <a href="#" class={styles.downloadSwatch}></a>
      <div class={styles.controls}>
        <Wheel />
        <Formats />
      </div>
    </div>
  );
});

app.connect("#app");
