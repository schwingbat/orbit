import { createView, derive, t } from "@manyducks.co/dolla";
import { ColorStore } from "~/stores/ColorStore";
import styles from "./Wheel.module.css";

import { FlatSlider } from "./FlatSlider/FlatSlider";
import { WheelSlider } from "./WheelSlider/WheelSlider";

export const Wheel = createView(function () {
  const { $hsl, patchHSL } = this.useStore(ColorStore);

  const $hue = derive([$hsl], (hsl) => hsl.h);
  const $sat = derive([$hsl], (hsl) => hsl.s);
  const $light = derive([$hsl], (hsl) => hsl.l);

  return (
    <div class={styles.wheel}>
      <div class={styles.hue}>
        <WheelSlider
          $value={$hue}
          $activeKnobColor={derive([$hue], (h) => `hsl(${h * 360}, 100%, 50%)`)}
          onValueChange={(h) => {
            patchHSL({ h });
          }}
        />
      </div>

      <div class={styles.satAndLight}>
        <div class={styles.slider}>
          <FlatSlider
            $label={t("saturation")}
            $value={$sat}
            $activeKnobColor={derive(
              [$hue, $sat],
              (h, s) => `hsl(${h * 360}, ${s * 100}%, 50%)`
            )}
            onValueChange={(s) => {
              patchHSL({ s });
            }}
          />
        </div>
        <div class={styles.slider}>
          <FlatSlider
            $label={t("lightness")}
            $value={$light}
            $activeKnobColor={derive(
              [$hue, $light],
              (h, l) => `hsl(${h * 360}, 0%, ${l * 100}%)`
            )}
            onValueChange={(l) => {
              patchHSL({ l });
            }}
          />
        </div>
      </div>
    </div>
  );
});
