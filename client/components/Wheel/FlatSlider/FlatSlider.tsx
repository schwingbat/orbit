import type { MutableState } from "@woofjs/client";

import { makeComponent, makeState, mergeStates, bind } from "@woofjs/client";
import { AppServices } from "app";

import styles from "./FlatSlider.module.css";

type FlatSliderAttrs = {
  label: string;
  $value: MutableState<number>;
  activeKnobColor: string;
};

export const FlatSlider = makeComponent<FlatSliderAttrs, AppServices>((ctx) => {
  const { $isDark } = ctx.services.color;

  const label = ctx.$attrs.get((x) => x.label);
  const $value = ctx.$attrs.get((x) => x.$value);
  const $activeKnobColor = ctx.$attrs.map((x) => x.activeKnobColor);

  const $interacting = makeState(false);
  const $trackColor = $isDark.map((dark) => (dark ? "#fff" : "#000"));
  const $knobColor = mergeStates(
    $interacting,
    $trackColor,
    $activeKnobColor
  ).into((interacting, wheelColor, activeKnobColor) => {
    if (interacting) {
      return activeKnobColor;
    } else {
      return wheelColor;
    }
  });

  ctx.debug.name = `Slider:${label}`;

  ctx.subscribeTo($value, (value) => {
    ctx.debug.log("value", value);
  });

  ctx.subscribeTo($interacting, (value) => {
    ctx.debug.log("interacting", value);
  });

  function onInteractStart(e: TouchEvent) {
    $interacting.set(true);
  }

  function onInteractEnd() {
    $interacting.set(false);
  }

  ctx.afterConnect(() => {
    window.addEventListener("mouseup", onInteractEnd);
    window.addEventListener("touchend", onInteractEnd);
  });

  ctx.afterDisconnect(() => {
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
});
