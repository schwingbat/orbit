import {
  Context,
  Getter,
  compose,
  createAtom,
  getDebug,
  onMount,
} from "@manyducks.co/dolla";
import { match } from "ts-pattern";
import styles from "./FlatSlider.module.css";

import { getTranslate } from "@manyducks.co/dolla/translate";
import { isDark } from "~/colors";

type FlatSliderProps = {
  label: Getter<string> | string;
  value: Getter<number>;
  activeKnobColor: Getter<string>;
  onValueChange: (value: number) => void;
};

export function FlatSlider(this: Context, props: FlatSliderProps) {
  const { label, value, activeKnobColor } = props;

  const debug = getDebug(this);
  const { currentLocale } = getTranslate(this);

  const [isInteracting, setIsInteracting] = createAtom(false);
  const trackColor = () => (isDark() ? "#fff" : "#000");
  const knobColor = () => {
    if (isInteracting()) {
      return activeKnobColor();
    } else {
      return trackColor();
    }
  };

  debug.info("render FlatSlider");

  const inputValue = () => String(value());

  function onInteractStart() {
    setIsInteracting(true);
  }

  function onInteractEnd() {
    setIsInteracting(false);
  }

  onMount(this, () => {
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
      style={{
        "--track-color": trackColor,
        "--knob-color": knobColor,
      }}
    >
      <span
        class={styles.label}
        style={{
          fontSize: compose(() =>
            match(currentLocale())
              .with("ja", () => "1.2em")
              .otherwise(() => "0.9em"),
          ),
        }}
      >
        {label}
      </span>
      <input
        class={{
          [styles.input]: true,
          [styles.active]: isInteracting,
        }}
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
