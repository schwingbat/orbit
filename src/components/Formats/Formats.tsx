import {
  batch,
  compose,
  type Context,
  createAtom,
  getDebug,
  type Getter,
  onEffect,
} from "@manyducks.co/dolla";
import { hex, hsl, isDark, patchHSL, rgb } from "~/colors";
import type { HSLColor } from "../../types/colors";
import {
  formatHex,
  formatHSL,
  formatRGB,
  hslFromRGB,
  rgbFromHex,
} from "../../utils/convert";
import { hexIsValid, hslIsValid, rgbIsValid } from "../../utils/validate";
import styles from "./Formats.module.css";

export function Formats(this: Context) {
  const debug = getDebug(this);

  const formattedHSL = compose(() => formatHSL(hsl()));
  const formattedRGB = compose(() => formatRGB(rgb()));
  const formattedHex = compose(() => formatHex(hex(), true));

  debug.log("render Formats");

  return (
    <div
      class={styles.container}
      style={{
        "--selected-color": hex,
        "--control-color": () => (isDark() ? "#fff" : "#000"),
      }}
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

          if (hslIsValid(hsl)) {
            return hsl;
          }
        }}
        onChange={patchHSL}
      />

      <FormatInput
        label="HEX"
        value={formattedHex}
        parse={(value) => {
          if (hexIsValid(value)) {
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

          if (rgbIsValid(rgb)) {
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
  value: Getter<string>;
  parse: (value: string) => HSLColor | undefined;
  onChange: (hsl: HSLColor) => void;
};

function FormatInput(this: Context, props: FormatInputProps) {
  const debug = getDebug(this);

  const { value, parse, onChange } = props;

  const [isFocused, setIsFocused] = createAtom(false);
  const [isValid, setIsValid] = createAtom(true);
  const [inputValue, setInputValue] = createAtom(value());

  debug.log("render FormatInput");

  const label = compose(() => (isValid() ? props.label : "⚠️"));

  let ignoreChange = false;

  // Set `inputValue` when `value` changes.
  onEffect(this, () => {
    ignoreChange = true;
    setInputValue(value());
  });

  // Update `isValid` and fire `onChange` when `inputValue` changes.
  onEffect(this, () => {
    const parsed = parse(inputValue());

    if (parsed) {
      setIsValid(true);

      if (ignoreChange) {
        ignoreChange = false;
        return;
      }

      onChange(parsed);
    } else {
      setIsValid(false);
    }
  });

  return (
    <div
      class={{
        [styles.format]: true,
        [styles.invalid]: compose(() => !isValid()),
        [styles.focused]: isFocused,
      }}
    >
      <span class={styles.formatLabel}>{label}</span>
      <input
        class={styles.formatInput}
        type="text"
        value={inputValue}
        onInput={(e) => {
          const target = e.currentTarget as HTMLInputElement;
          setInputValue(target.value);
        }}
        onFocus={() => {
          setIsFocused(true);
        }}
        onBlur={() => {
          setIsFocused(false);

          const parsed = parse(inputValue());
          if (parsed) {
            batch(() => {
              setIsValid(true);
              onChange(parsed);
              setInputValue(value());
            });
          }
        }}
      />
    </div>
  );
}
