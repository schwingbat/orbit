import { bind, makeState, mergeStates } from "@woofjs/client";
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

export function Formats($attrs, self) {
  const { $hue, $saturation, $lightness, $isDark } = self.getService("color");

  const $hsl = mergeStates($hue, $saturation, $lightness, (h, s, l) => {
    return { h, s, l };
  });
  const $rgb = $hsl.map(hslToRGB);
  const $hex = $rgb.map(rgbToHex);

  const $formattedHSL = $hsl.map(formatHSL);
  const $formattedRGB = $rgb.map(formatRGB);
  const $formattedHex = $hex.map((hex) => formatHex(hex, true));

  const $triggeredBy = makeState(null);

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
          value = value
            .replace("%", "")
            .split(",")
            .map((c) => parseInt(c));

          value = { h: value[0] / 360, s: value[1] / 100, l: value[2] / 100 };

          if (validateHSL(value)) {
            return value;
          } else {
            return false;
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
          } else {
            return false;
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
          value = value.split(",").map((c) => parseInt(c));
          value = { r: value[0] / 256, g: value[1] / 256, b: value[2] / 256 };

          if (validateRGB(value)) {
            return rgbToHSL(value);
          } else {
            return false;
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
}

function FormatInput($attrs, self) {
  const $value = $attrs.map("value");
  const $ignoreValueUpdate = $attrs.map("ignoreValueUpdate");
  const parse = $attrs.get("parse");
  const onchange = $attrs.get("onchange");

  const $focused = makeState(false);
  const $isValid = makeState(true);
  const $inputValue = makeState($value.get());

  const $label = mergeStates($attrs, $isValid, (attrs, valid) => {
    if (valid) {
      return attrs.label;
    } else {
      return "😒";
    }
  });

  let ignoreChange = false;

  self.watchState($inputValue, (value) => {
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

  self.watchState($value, (value) => {
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
}
