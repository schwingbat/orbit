import styles from "./WheelSlider.module.css";

export function WheelSlider($attrs, self) {
  const $value = $attrs.get("$value");
  const $changing = $attrs.get("$changing");

  self.debug.name = `WheelSlider`;

  self.watchState($value, (value) => {
    self.debug.log("value", value);
  });

  self.watchState($changing, (changing) => {
    self.debug.log("changing", changing);
  });

  function onInteractEnd() {
    $changing.set(false);
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
    <div>
      <div
        class={styles.wheelTrack}
        style={{ transform: $value.map((hue) => `rotate(${hue * 360}deg)`) }}
      >
        <div class={styles.knob} />
      </div>

      <input
        class={styles.input}
        type="range"
        min={0}
        max={1}
        step={0.0001}
        value={$value}
        onmousedown={() => {
          $changing.set(true);
        }}
        ontouchstart={() => {
          $changing.set(true);
        }}
        oninput={(e) => {
          $value.set(Number(e.target.value));
        }}
      />
    </div>
  );
}
