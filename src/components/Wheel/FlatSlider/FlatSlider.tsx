import {
  createState,
  createView,
  derive,
  type State,
} from "@manyducks.co/dolla";
import styles from "./FlatSlider.module.css";
import { ColorStore } from "../../../stores/ColorStore";

type FlatSliderProps = {
  $label: State<string>;
  $value: State<number>;
  $activeKnobColor: State<string>;
  onValueChange: (value: number) => void;
};

export const FlatSlider = createView(function (props: FlatSliderProps) {
  const { $isDark } = this.useStore(ColorStore);

  const { $label, $value, $activeKnobColor, onValueChange } = props;

  this.watch([$label], (label) => {
    this.setName(`Slider:${label}`);
  });

  const [$interacting, setInteracting] = createState(false);
  const $trackColor = derive([$isDark], (dark) => (dark ? "#fff" : "#000"));
  const $knobColor = derive(
    [$interacting, $trackColor, $activeKnobColor],
    (interacting, wheelColor, activeKnobColor) => {
      if (interacting) {
        return activeKnobColor;
      } else {
        return wheelColor;
      }
    }
  );

  this.watch([$value], (value) => {
    this.log("value", value);
  });

  this.watch([$interacting], (value) => {
    this.log("interacting", value);
  });

  function onInteractStart() {
    setInteracting(true);
  }

  function onInteractEnd() {
    setInteracting(false);
  }

  this.onMount(() => {
    window.addEventListener("mouseup", onInteractEnd);
    window.addEventListener("touchend", onInteractEnd);
  });

  this.onUnmount(() => {
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
      <span class={styles.label}>{$label}</span>
      <input
        class={{
          [styles.input]: true,
          [styles.active]: $interacting,
        }}
        type="range"
        min={0}
        max={1}
        step={0.0001}
        value={derive([$value], String)}
        onInput={(e) => {
          const target = e.currentTarget as HTMLInputElement;
          onValueChange(Number(target.value));
        }}
        onMouseDown={onInteractStart}
        onTouchStart={onInteractStart}
      />
    </div>
  );
});
