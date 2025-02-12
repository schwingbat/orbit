import { Signal, useComputed, useSignal } from "@preact/signals";
import classNames from "classnames";
import { useEffect } from "preact/hooks";
import styles from "./FlatSlider.module.css";

import { isDark } from "~/colors";

type FlatSliderProps = {
  label: Signal<string> | string;
  value: Signal<number>;
  activeKnobColor: Signal<string>;
  onValueChange: (value: number) => void;
};

export function FlatSlider(props: FlatSliderProps) {
  const { label, value, activeKnobColor } = props;

  const interacting = useSignal(false);
  const trackColor = useComputed(() => (isDark.value ? "#fff" : "#000"));
  const knobColor = useComputed(() => {
    if (interacting.value) {
      return activeKnobColor.value;
    } else {
      return trackColor.value;
    }
  });

  console.log("render FlatSlider");

  const inputValue = useComputed(() => String(value.value));
  const inputClassName = useComputed(() =>
    classNames(styles.input, interacting.value && styles.active)
  );

  function onInteractStart() {
    interacting.value = true;
  }

  function onInteractEnd() {
    interacting.value = false;
  }

  useEffect(() => {
    window.addEventListener("mouseup", onInteractEnd);
    window.addEventListener("touchend", onInteractEnd);

    return () => {
      window.removeEventListener("mouseup", onInteractEnd);
      window.removeEventListener("touchend", onInteractEnd);
    };
  });

  return (
    <div
      class={styles.container}
      style={useComputed(() => {
        return `--track-color: ${trackColor.value}; --knob-color: ${knobColor.value};`;
      })}
    >
      <span class={styles.label}>{label}</span>
      <input
        class={inputClassName}
        type="range"
        min={0}
        max={1}
        step={0.0001}
        value={inputValue}
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
