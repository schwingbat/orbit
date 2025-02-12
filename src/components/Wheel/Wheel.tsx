import { useComputed } from "@preact/signals";
import { FlatSlider } from "./FlatSlider/FlatSlider";
import styles from "./Wheel.module.css";
import { WheelSlider } from "./WheelSlider/WheelSlider";

import { hsl, patchHSL } from "~/colors";

export function Wheel() {
  const hue = useComputed(() => hsl.value.h);
  const sat = useComputed(() => hsl.value.s);
  const light = useComputed(() => hsl.value.l);

  const hueKnobColor = useComputed(() => `hsl(${hue.value * 360}, 100%, 50%)`);
  const satKnobColor = useComputed(
    () => `hsl(${hue.value * 360}, ${sat.value * 100}%, 50%)`
  );
  const lightKnobColor = useComputed(
    () => `hsl(${hue.value * 360}, 0%, ${light.value * 100}%)`
  );

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
            label="Saturation"
            value={sat}
            activeKnobColor={satKnobColor}
            onValueChange={(s) => {
              patchHSL({ s });
            }}
          />
        </div>
        <div class={styles.slider}>
          <FlatSlider
            label="Lightness"
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

// export const Wheel = createView(function () {
//   const { $hsl, patchHSL } = this.useStore(ColorStore);

//   const $hue = derive([$hsl], (hsl) => hsl.h);
//   const $sat = derive([$hsl], (hsl) => hsl.s);
//   const $light = derive([$hsl], (hsl) => hsl.l);

//   return (
//     <div class={styles.wheel}>
//       <div class={styles.hue}>
//         <WheelSlider
//           $value={$hue}
//           $activeKnobColor={derive([$hue], (h) => `hsl(${h * 360}, 100%, 50%)`)}
//           onValueChange={(h) => {
//             patchHSL({ h });
//           }}
//         />
//       </div>

//       <div class={styles.satAndLight}>
//         <div class={styles.slider}>
//           <FlatSlider
//             $label={t("saturation")}
//             $value={$sat}
//             $activeKnobColor={derive(
//               [$hue, $sat],
//               (h, s) => `hsl(${h * 360}, ${s * 100}%, 50%)`
//             )}
//             onValueChange={(s) => {
//               patchHSL({ s });
//             }}
//           />
//         </div>
//         <div class={styles.slider}>
//           <FlatSlider
//             $label={t("lightness")}
//             $value={$light}
//             $activeKnobColor={derive(
//               [$hue, $light],
//               (h, l) => `hsl(${h * 360}, 0%, ${l * 100}%)`
//             )}
//             onValueChange={(l) => {
//               patchHSL({ l });
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// });
