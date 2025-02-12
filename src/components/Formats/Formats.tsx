import { Accessor, createEffect, createSignal, useContext } from "solid-js";
import type { HSLColor } from "../../types/colors";
import {
  formatHex,
  formatHSL,
  formatRGB,
  rgbFromHex,
  hslFromRGB,
} from "../../utils/convert";
import { validateHex, validateHSL, validateRGB } from "../../utils/validate";
import styles from "./Formats.module.css";
import { Colors } from "~/colors";

export function Formats() {
  const { hsl, rgb, hex, isDark, patchHSL } = useContext(Colors);

  const formattedHSL = () => formatHSL(hsl());
  const formattedRGB = () => formatRGB(rgb());
  const formattedHex = () => formatHex(hex(), true);

  const [trigger, setTrigger] = createSignal();

  return (
    <div
      class={styles.container}
      style={{
        "--selected-color": hex(),
        "--control-color": isDark() ? "#fff" : "#000",
      }}
    >
      <FormatInput
        label="HSL"
        value={formattedHSL()}
        ignoreValueUpdate={() => trigger() === "HSL"}
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
        onChange={(value) => {
          setTrigger("HSL");
          patchHSL(value);
        }}
      />

      <FormatInput
        label="HEX"
        value={formattedHex()}
        ignoreValueUpdate={() => trigger() === "HEX"}
        parse={(value) => {
          if (validateHex(value)) {
            return hslFromRGB(rgbFromHex(value));
          }
        }}
        onChange={(value) => {
          setTrigger("HEX");
          patchHSL(value);
        }}
      />

      <FormatInput
        label="RGB"
        value={formattedRGB()}
        ignoreValueUpdate={() => trigger() === "RGB"}
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
        onChange={(value) => {
          setTrigger("RGB");
          patchHSL(value);
        }}
      />
    </div>
  );
}

type FormatInputProps = {
  label: string;
  value: string;
  ignoreValueUpdate: Accessor<boolean>;
  parse: (value: string) => HSLColor | undefined;
  onChange: (hsl: HSLColor) => void;
};

function FormatInput(props: FormatInputProps) {
  const { value, ignoreValueUpdate, parse, onChange } = props;

  const [isFocused, setIsFocused] = createSignal(false);
  const [isValid, setIsValid] = createSignal(true);
  const [inputValue, setInputValue] = createSignal(value);

  const label = () => (isValid() ? props.label : "⚠️");

  let ignoreChange = false;

  createEffect(() => {
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

  createEffect(() => {
    if (ignoreValueUpdate()) {
      return;
    }

    ignoreChange = true;
    setInputValue(value);
  });

  return (
    <div
      classList={{
        [styles.format]: true,
        [styles.invalid]: !isValid(),
        [styles.focused]: isFocused(),
      }}
    >
      <span class={styles.formatLabel}>{label()}</span>
      <input
        class={styles.formatInput}
        type="text"
        value={inputValue()}
        onInput={(e) => {
          const target = e.currentTarget as HTMLInputElement;
          setInputValue(target.value);
        }}
        onfocus={() => {
          setIsFocused(true);
        }}
        onblur={() => {
          setIsFocused(false);

          const parsed = parse(inputValue());
          if (parsed) {
            setIsValid(true);
            onChange(parsed);
            setInputValue(value);
          }
        }}
      />
    </div>
  );
}
