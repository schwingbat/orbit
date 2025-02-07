import {
  createState,
  createView,
  derive,
  type State,
} from "@manyducks.co/dolla";
import type { HSLColor } from "../../types/colors";
import { ColorStore } from "../../stores/ColorStore";
import {
  formatHex,
  formatHSL,
  formatRGB,
  hexToRGB,
  rgbToHSL,
} from "../../utils/convert";
import { validateHex, validateHSL, validateRGB } from "../../utils/validate";
import styles from "./Formats.module.css";

export const Formats = createView(function () {
  const { $hsl, $rgb, $hex, $isDark, patchHSL } = this.useStore(ColorStore);

  const $formattedHSL = derive([$hsl], formatHSL);
  const $formattedRGB = derive([$rgb], formatRGB);
  const $formattedHex = derive([$hex], (hex) => formatHex(hex, true));

  // Tracks which input type triggered the last update so we can skip updating its value.
  const [$trigger, setTrigger] = createState<string>();

  return (
    <div
      class={styles.container}
      style={{
        "--selected-color": $hex,
        "--control-color": derive([$isDark], (dark) =>
          dark ? "#fff" : "#000"
        ),
      }}
    >
      <FormatInput
        label="HSL"
        $value={$formattedHSL}
        $ignoreValueUpdate={derive([$trigger], (t) => t === "HSL")}
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
        $value={$formattedHex}
        $ignoreValueUpdate={derive([$trigger], (t) => t === "HEX")}
        parse={(value) => {
          if (validateHex(value)) {
            return rgbToHSL(hexToRGB(value));
          }
        }}
        onChange={(value) => {
          setTrigger("HEX");
          patchHSL(value);
        }}
      />

      <FormatInput
        label="RGB"
        $value={$formattedRGB}
        $ignoreValueUpdate={derive([$trigger], (t) => t === "RGB")}
        parse={(value) => {
          const numbers = value.split(",").map((c) => parseInt(c));
          const rgb = {
            r: numbers[0] / 256,
            g: numbers[1] / 256,
            b: numbers[2] / 256,
          };

          if (validateRGB(rgb)) {
            return rgbToHSL(rgb);
          }
        }}
        onChange={(value) => {
          setTrigger("RGB");
          patchHSL(value);
        }}
      />
    </div>
  );
});

type FormatInputProps = {
  label: string;
  $value: State<string>;
  $ignoreValueUpdate: State<boolean>;
  parse: (value: string) => HSLColor | undefined;
  onChange: (hsl: HSLColor) => void;
};

const FormatInput = createView(function (props: FormatInputProps) {
  const { $value, $ignoreValueUpdate, parse, onChange } = props;

  const [$isFocused, setIsFocused] = createState(false);
  const [$isValid, setIsValid] = createState(true);
  const [$inputValue, setInputValue] = createState($value.get());

  const $label = derive([$isValid], (isValid) => {
    if (isValid) {
      return props.label;
    } else {
      return "⚠️";
    }
  });

  let ignoreChange = false;

  this.watch([$inputValue], (value) => {
    const parsed = parse(value);

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

  this.watch([$value], (value) => {
    if ($ignoreValueUpdate.get()) {
      return;
    }

    ignoreChange = true;
    setInputValue(value);
  });

  return (
    <div
      class={{
        [styles.format]: true,
        [styles.invalid]: derive([$isValid], (valid) => !valid),
        [styles.focused]: $isFocused,
      }}
    >
      <span class={styles.formatLabel}>{$label}</span>
      <input
        class={styles.formatInput}
        type="text"
        value={$inputValue}
        onInput={(e) => {
          const target = e.currentTarget as HTMLInputElement;
          setInputValue(target.value);
        }}
        onfocus={() => {
          setIsFocused(true);
        }}
        onblur={() => {
          setIsFocused(false);

          const parsed = parse($inputValue.get());
          if (parsed) {
            setIsValid(true);
            onChange(parsed);
            setInputValue($value.get());
          }
        }}
      />
    </div>
  );
});
