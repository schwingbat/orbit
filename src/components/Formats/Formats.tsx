import classNames from "classnames";
import type { HSLColor } from "../../types/colors";
import {
  formatHex,
  formatHSL,
  formatRGB,
  hslFromRGB,
  rgbFromHex,
} from "../../utils/convert";
import { validateHex, validateHSL, validateRGB } from "../../utils/validate";
import styles from "./Formats.module.css";

import {
  batch,
  Signal,
  untracked,
  useComputed,
  useSignal,
  useSignalEffect,
} from "@preact/signals";
import { hex, hsl, isDark, patchHSL, rgb } from "~/colors";
import { useRef } from "preact/hooks";

export function Formats() {
  const formattedHSL = useComputed(() => formatHSL(hsl.value));
  const formattedRGB = useComputed(() => formatRGB(rgb.value));
  const formattedHex = useComputed(() => formatHex(hex.value, true));

  console.log("render Formats");

  return (
    <div
      class={styles.container}
      style={useComputed(() => {
        return `--selected-color: ${hex.value}; --control-color: ${
          isDark.value ? "#fff" : "#000"
        };`;
      })}
    >
      <FormatInput
        label="HSL"
        value={formattedHSL}
        parse={(value) => {
          const [h, s, l] = value
            .replace("%", "")
            .split(",")
            .map((c) => parseInt(c));

          const hsl = { h: h / 360, s: s / 100, l: l / 100 };

          if (validateHSL(hsl)) {
            return hsl;
          }
        }}
        onChange={patchHSL}
      />

      <FormatInput
        label="HEX"
        value={formattedHex}
        parse={(value) => {
          if (validateHex(value)) {
            return hslFromRGB(rgbFromHex(value));
          }
        }}
        onChange={patchHSL}
      />

      <FormatInput
        label="RGB"
        value={formattedRGB}
        parse={(value) => {
          const numbers = value.split(",").map((c) => parseInt(c));
          const rgb = {
            r: numbers[0] / 256,
            g: numbers[1] / 256,
            b: numbers[2] / 256,
          };

          if (validateRGB(rgb)) {
            return hslFromRGB(rgb);
          }
        }}
        onChange={patchHSL}
      />
    </div>
  );
}

type FormatInputProps = {
  label: string;
  value: Signal<string>;
  parse: (value: string) => HSLColor | undefined;
  onChange: (hsl: HSLColor) => void;
};

function FormatInput(props: FormatInputProps) {
  const { value, parse, onChange } = props;

  const isFocused = useSignal(false);
  const isValid = useSignal(true);
  const inputValue = useSignal(value.peek());

  console.log("render FormatInput");

  const label = useComputed(() => (isValid.value ? props.label : "⚠️"));

  const ignoreChange = useRef(false);

  useSignalEffect(() => {
    const parsed = parse(inputValue.value);

    if (parsed) {
      isValid.value = true;

      if (ignoreChange.current) {
        ignoreChange.current = false;
        return;
      }

      onChange(parsed);
    } else {
      isValid.value = false;
    }
  });

  useSignalEffect(() => {
    ignoreChange.current = true;
    const newValue = value.value;
    untracked(() => {
      inputValue.value = newValue;
    });
  });

  return (
    <div
      class={useComputed(() =>
        classNames({
          [styles.format]: true,
          [styles.invalid]: isValid.value,
          [styles.focused]: isFocused.value,
        })
      )}
    >
      <span class={styles.formatLabel}>{label}</span>
      <input
        class={styles.formatInput}
        type="text"
        value={inputValue}
        onInput={(e) => {
          const target = e.currentTarget as HTMLInputElement;
          inputValue.value = target.value;
        }}
        onFocus={() => {
          isFocused.value = true;
        }}
        onBlur={() => {
          isFocused.value = false;

          const parsed = parse(inputValue.value);
          if (parsed) {
            batch(() => {
              isValid.value = true;
              onChange(parsed);
              inputValue.value = value.value;
            });
          }
        }}
      />
    </div>
  );
}
