import styles from "./FlatSlider.module.css";

export function FlatSlider($attrs, self) {
  const label = $attrs.get("label");
  const $value = $attrs.get("$value");
  const $changing = $attrs.get("$changing");

  self.debug.name = `Slider:${label}`;

  // self.watchState($value, (value) => {
  //   self.debug.log("value", value);
  // });

  // self.watchState($changing, (changing) => {
  //   self.debug.log("changing", changing);
  // });

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
      <span class={styles.label}>{label}</span>
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
