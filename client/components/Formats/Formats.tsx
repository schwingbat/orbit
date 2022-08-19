// import type {} from "@woofjs/client";
import type { RGBColor, HSLColor } from "types/colors";
import type { AppServices } from "app";

import { bind, makeComponent, makeState, mergeStates } from "@woofjs/client";
import {
  formatHex,
  formatHSL,
  formatRGB,
  hexToRGB,
  hslToRGB,
  rgbToHex,
  rgbToHSL,
} from "utils/convert";
import { validateHex, validateHSL, validateRGB } from "utils/validate";

import styles from "./Formats.module.css";

export const Formats = makeComponent<{}, AppServices>((ctx) => {
  const { $hue, $saturation, $lightness, $isDark } = ctx.services.color;

  const $hsl = mergeStates($hue, $saturation, $lightness).into((h, s, l) => {
    return { h, s, l };
  });
  const $rgb = $hsl.map(hslToRGB);
  const $hex = $rgb.map(rgbToHex);

  const $formattedHSL = $hsl.map(formatHSL);
  const $formattedRGB = $rgb.map(formatRGB);
  const $formattedHex = $hex.map((hex) => formatHex(hex, true));

  const $triggeredBy = makeState<string>();

  return (
    <div
      class={styles.container}
      style={{
        "--selected-color": $hex,
        "--control-color": $isDark.map((dark) => (dark ? "#fff" : "#000")),
      }}
    >
      <FormatInput
        label="HSL"
        value={$formattedHSL}
        ignoreValueUpdate={$triggeredBy.map((culprit) => culprit === "HSL")}
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
        onchange={(value) => {
          $triggeredBy.set("HSL");

          $hue.set(value.h);
          $saturation.set(value.s);
          $lightness.set(value.l);
        }}
      />

      <FormatInput
        label="HEX"
        value={$formattedHex}
        ignoreValueUpdate={$triggeredBy.map((culprit) => culprit === "HEX")}
        parse={(value) => {
          if (validateHex(value)) {
            return rgbToHSL(hexToRGB(value));
          }
        }}
        onchange={(value) => {
          $triggeredBy.set("HEX");

          $hue.set(value.h);
          $saturation.set(value.s);
          $lightness.set(value.l);
        }}
      />

      <FormatInput
        label="RGB"
        value={$formattedRGB}
        ignoreValueUpdate={$triggeredBy.map((culprit) => culprit === "RGB")}
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
        onchange={(value) => {
          $triggeredBy.set("RGB");

          $hue.set(value.h);
          $saturation.set(value.s);
          $lightness.set(value.l);
        }}
      />
    </div>
  );
});

type FormatInputAttrs = {
  label: string;
  value: string; // TODO: @woofjs/client types don't accept a ReadonlyState<string> for this value, but they should.
  ignoreValueUpdate: boolean;
  parse: (value: string) => HSLColor | undefined;
  onchange: (hsl: HSLColor) => void;
};

const FormatInput = makeComponent<FormatInputAttrs, AppServices>((ctx) => {
  const $value = ctx.$attrs.map((x) => x.value);
  const $ignoreValueUpdate = ctx.$attrs.map((x) => x.ignoreValueUpdate);
  const parse = ctx.$attrs.get((x) => x.parse);
  const onchange = ctx.$attrs.get((x) => x.onchange);

  const $focused = makeState(false);
  const $isValid = makeState(true);
  const $inputValue = makeState($value.get());

  const $label = mergeStates(ctx.$attrs, $isValid).into((attrs, valid) => {
    if (valid) {
      return attrs.label;
    } else {
      return "😒";
    }
  });

  let ignoreChange = false;

  ctx.subscribeTo($inputValue, (value) => {
    const parsed = parse(value);

    if (parsed) {
      $isValid.set(true);

      if (ignoreChange) {
        ignoreChange = false;
        return;
      }

      onchange(parsed);
    } else {
      $isValid.set(false);
    }
  });

  ctx.subscribeTo($value, (value) => {
    if ($ignoreValueUpdate.get()) {
      return;
    }

    ignoreChange = true;
    $inputValue.set(value);
  });

  return (
    <div
      class={{
        [styles.format]: true,
        [styles.invalid]: $isValid.map((valid) => !valid),
        [styles.focused]: $focused,
      }}
    >
      <span class={styles.formatLabel}>{$label}</span>
      <input
        class={styles.formatInput}
        type="text"
        value={bind($inputValue)}
        onfocus={() => {
          $focused.set(true);
        }}
        onblur={() => {
          $focused.set(false);
        }}
      />
    </div>
  );
});
