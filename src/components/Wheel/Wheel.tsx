import { Context } from "@manyducks.co/dolla";
import { getTranslate } from "@manyducks.co/dolla/translate";
import { hsl, patchHSL } from "~/colors";
import { FlatSlider } from "./FlatSlider/FlatSlider";
import styles from "./Wheel.module.css";
import { WheelSlider } from "./WheelSlider/WheelSlider";

export function Wheel(this: Context) {
  const { t } = getTranslate(this);

  const hue = () => hsl().h;
  const sat = () => hsl().s;
  const light = () => hsl().l;

  const hueKnobColor = () => `hsl(${hue() * 360}, 100%, 50%)`;
  const satKnobColor = () => `hsl(${hue() * 360}, ${sat() * 100}%, 50%)`;
  const lightKnobColor = () => `hsl(${hue() * 360}, 0%, ${light() * 100}%)`;

  return (
    <div class={styles.wheel}>
      <div class={styles.hue}>
        <WheelSlider
          value={hue}
          activeKnobColor={hueKnobColor}
          onValueChange={(h) => {
            patchHSL({ h });
          }}
        />
      </div>

      <div class={styles.satAndLight}>
        <div class={styles.slider}>
          <FlatSlider
            label={t("saturation")}
            value={sat}
            activeKnobColor={satKnobColor}
            onValueChange={(s) => {
              patchHSL({ s });
            }}
          />
        </div>
        <div class={styles.slider}>
          <FlatSlider
            label={t("lightness")}
            value={light}
            activeKnobColor={lightKnobColor}
            onValueChange={(l) => {
              patchHSL({ l });
            }}
          />
        </div>
      </div>
    </div>
  );
}
