import { makeState as $, mergeStates } from "@woofjs/client";

import styles from "./WheelSlider.module.css";
import colorsImage from "./colors.png";

export function WheelSlider($attrs, self) {
  self.debug.name = "WheelSlider";

  const { $isDark } = self.getService("color");

  const $value = $attrs.get("$value");
  const $activeKnobColor = $attrs.map("activeKnobColor");

  const $interacting = $(false);
  const $wheelColor = $isDark.map((dark) => (dark ? "#fff" : "#000"));
  const $knobColor = mergeStates(
    $interacting,
    $wheelColor,
    $activeKnobColor,
    (interacting, wheelColor, activeKnobColor) => {
      if (interacting) {
        return activeKnobColor;
      } else {
        return wheelColor;
      }
    }
  );

  const $trackRef = $();

  self.watchState($value, (value) => {
    self.debug.log("value", value);
  });

  self.watchState($interacting, (value) => {
    self.debug.log("interacting", value);
  });

  function onInteractStart(e) {
    e.preventDefault();
    $interacting.set(true);

    window.addEventListener("mousemove", onInteract);
    window.addEventListener("touchmove", onInteract);
  }

  function onInteract(e) {
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

  function onInteractEnd(e) {
    $interacting.set(false);

    window.removeEventListener("mousemove", onInteract);
    window.removeEventListener("touchmove", onInteract);
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
