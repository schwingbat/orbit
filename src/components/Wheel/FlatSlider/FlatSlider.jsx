import { makeState, mergeStates, bind } from "@woofjs/client";

import styles from "./FlatSlider.module.css";

export function FlatSlider($attrs, self) {
  const { $isDark } = self.getService("color");

  const label = $attrs.get("label");
  const $value = $attrs.get("$value");
  const $activeKnobColor = $attrs.map("activeKnobColor");

  const $interacting = makeState(false);
  const $trackColor = $isDark.map((dark) => (dark ? "#fff" : "#000"));
  const $knobColor = mergeStates(
    $interacting,
    $trackColor,
    $activeKnobColor,
    (interacting, wheelColor, activeKnobColor) => {
      if (interacting) {
        return activeKnobColor;
      } else {
        return wheelColor;
      }
    }
  );

  self.debug.name = `Slider:${label}`;

  self.watchState($value, (value) => {
    self.debug.log("value", value);
  });

  self.watchState($interacting, (value) => {
    self.debug.log("interacting", value);
  });

  function onInteractStart(e) {
    $interacting.set(true);
  }

  function onInteractEnd() {
    $interacting.set(false);
  }

  self.afterConnect(() => {
    window.addEventListener("mouseup", onInteractEnd);
    window.addEventListener("touchend", onInteractEnd);
  });

  self.afterDisconnect(() => {
    window.removeEventListener("mouseup", onInteractEnd);
    window.removeEventListener("touchend", onInteractEnd);
  });

  return (
    <div
      class={styles.container}
      style={{
        "--track-color": $trackColor,
        "--knob-color": $knobColor,
      }}
    >
      <span class={styles.label}>{label}</span>
      <input
        class={{
          [styles.input]: true,
          [styles.active]: $interacting,
        }}
        type="range"
        min={0}
        max={1}
        step={0.0001}
        value={bind($value)}
        onmousedown={onInteractStart}
        ontouchstart={onInteractStart}
      />
    </div>
  );
}
