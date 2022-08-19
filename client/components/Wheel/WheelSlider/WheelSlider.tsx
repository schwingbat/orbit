import type { MutableState } from "@woofjs/client";
import type { AppServices } from "app";

import { makeComponent, makeState, mergeStates } from "@woofjs/client";

import styles from "./WheelSlider.module.css";
import colorsImage from "./colors.png";

type WheelSliderAttrs = {
  $value: MutableState<number>;
  activeKnobColor: string;
};

export const WheelSlider = makeComponent<WheelSliderAttrs, AppServices>(
  (ctx) => {
    ctx.debug.name = "Wheel:Hue";

    const $value = ctx.$attrs.get((x) => x.$value);
    const $activeKnobColor = ctx.$attrs.map((x) => x.activeKnobColor);

    const { $isDark } = ctx.services.color;

    const $interacting = makeState(false);
    const $wheelColor = $isDark.map((dark) => (dark ? "#fff" : "#000"));
    const $knobColor = mergeStates(
      $interacting,
      $wheelColor,
      $activeKnobColor
    ).into((interacting, wheelColor, activeKnobColor) => {
      if (interacting) {
        return activeKnobColor;
      } else {
        return wheelColor;
      }
    });

    const $trackRef = makeState<HTMLElement>();

    ctx.subscribeTo($value, (value) => {
      ctx.debug.log("value", value);
    });

    ctx.subscribeTo($interacting, (value) => {
      ctx.debug.log("interacting", value);
    });

    function onInteractStart(e: Event) {
      e.preventDefault();
      $interacting.set(true);

      window.addEventListener("mousemove", onInteract);
      window.addEventListener("touchmove", onInteract);
    }

    function onInteract(e: any) {
      e.preventDefault();

      // Get center of hue wheel.
      const rect = $trackRef.get().getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const x = (e.touches ? e.touches[0].clientX : e.clientX) - centerX;
      const y = (e.touches ? e.touches[0].clientY : e.clientY) - centerY;
      let degs = Math.round(90 + Math.atan2(y, x) * (180 / Math.PI));

      if (degs < 0) {
        degs += 360;
      }

      $value.set(degs / 360);
    }

    function onInteractEnd() {
      $interacting.set(false);

      window.removeEventListener("mousemove", onInteract);
      window.removeEventListener("touchmove", onInteract);
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
          "--wheel-color": $wheelColor,
          "--knob-color": $knobColor,
        }}
      >
        <img
          class={{
            [styles.colors]: true,
            [styles.visible]: $interacting,
          }}
          src={colorsImage}
        />

        <div
          $ref={$trackRef}
          class={styles.track}
          style={{
            transform: $value.map((value) => `rotate(${value * 360}deg)`),
          }}
        >
          <div class={styles.knobRotator}>
            <div
              class={{
                [styles.knob]: true,
                [styles.active]: $interacting,
              }}
              onmousedown={onInteractStart}
              ontouchstart={onInteractStart}
            />
          </div>
        </div>
      </div>
    );
  }
);
