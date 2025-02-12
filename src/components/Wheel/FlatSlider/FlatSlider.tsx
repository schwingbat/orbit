import {
  Accessor,
  createSignal,
  onCleanup,
  onMount,
  useContext,
} from "solid-js";
import { Colors } from "~/colors";
import styles from "./FlatSlider.module.css";

type FlatSliderProps = {
  label: Accessor<string>;
  value: Accessor<number>;
  activeKnobColor: Accessor<string>;
  onValueChange: (value: number) => void;
};

export function FlatSlider(props: FlatSliderProps) {
  const { isDark } = useContext(Colors);
  const { label, value, activeKnobColor } = props;

  const [interacting, setInteracting] = createSignal(false);
  const trackColor = () => (isDark() ? "#fff" : "#000");
  const knobColor = () => {
    if (interacting()) {
      return activeKnobColor();
    } else {
      return trackColor();
    }
  };

  console.log("render FlatSlider");

  const inputValue = () => String(value());
  function onInteractStart() {
    setInteracting(true);
  }

  function onInteractEnd() {
    setInteracting(false);
  }

  onMount(() => {
    window.addEventListener("mouseup", onInteractEnd);
    window.addEventListener("touchend", onInteractEnd);
  });

  onCleanup(() => {
    window.removeEventListener("mouseup", onInteractEnd);
    window.removeEventListener("touchend", onInteractEnd);
  });

  return (
    <div
      class={styles.container}
      style={{
        "--track-color": trackColor(),
        "--knob-color": knobColor(),
      }}
    >
      <span class={styles.label}>{label()}</span>
      <input
        classList={{
          [styles.input]: true,
          [styles.active]: interacting(),
        }}
        type="range"
        min={0}
        max={1}
        step={0.0001}
        value={inputValue()}
        onInput={(e) => {
          const target = e.currentTarget as HTMLInputElement;
          props.onValueChange(Number(target.value));
        }}
        onMouseDown={onInteractStart}
        onTouchStart={onInteractStart}
      />
    </div>
  );
}

// export const FlatSlider = createView(function (props: FlatSliderProps) {
//   const { $isDark } = this.useStore(ColorStore);

//   this.watch([$label], (label) => {
//     this.setName(`Slider:${label}`);
//   });

//   const [$interacting, setInteracting] = createState(false);
//   const $trackColor = derive([$isDark], (dark) => (dark ? "#fff" : "#000"));
//   const $knobColor = derive(
//     [$interacting, $trackColor, $activeKnobColor],
//     (interacting, wheelColor, activeKnobColor) => {
//       if (interacting) {
//         return activeKnobColor;
//       } else {
//         return wheelColor;
//       }
//     }
//   );

//   this.watch([$value], (value) => {
//     this.log("value", value);
//   });

//   this.watch([$interacting], (value) => {
//     this.log("interacting", value);
//   });

//   function onInteractStart() {
//     setInteracting(true);
//   }

//   function onInteractEnd() {
//     setInteracting(false);
//   }

//   this.onMount(() => {
//     window.addEventListener("mouseup", onInteractEnd);
//     window.addEventListener("touchend", onInteractEnd);
//   });

//   this.onUnmount(() => {
//     window.removeEventListener("mouseup", onInteractEnd);
//     window.removeEventListener("touchend", onInteractEnd);
//   });

//   return (
//     <div
//       class={styles.container}
//       style={{
//         "--track-color": $trackColor,
//         "--knob-color": $knobColor,
//       }}
//     >
//       <span class={styles.label}>{$label}</span>
//       <input
//         class={{
//           [styles.input]: true,
//           [styles.active]: $interacting,
//         }}
//         type="range"
//         min={0}
//         max={1}
//         step={0.0001}
//         value={derive([$value], String)}
//         onInput={(e) => {
//           const target = e.currentTarget as HTMLInputElement;
//           onValueChange(Number(target.value));
//         }}
//         onMouseDown={onInteractStart}
//         onTouchStart={onInteractStart}
//       />
//     </div>
//   );
// });
