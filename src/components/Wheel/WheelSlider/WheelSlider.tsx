import {
  Context,
  createAtom,
  createRef,
  getDebug,
  Getter,
  onMount,
} from "@manyducks.co/dolla";
import styles from "./WheelSlider.module.css";
import colorsImage from "./colors.png";

import { isDark } from "~/colors";

type WheelSliderProps = {
  value: Getter<number>;
  activeKnobColor: Getter<string>;
  onValueChange: (value: number) => void;
};

export function WheelSlider(this: Context, props: WheelSliderProps) {
  const debug = getDebug(this);

  const [isInteracting, setIsInteracting] = createAtom(false);
  const wheelColor = () => (isDark() ? "#fff" : "#000");
  const knobColor = () => {
    if (isInteracting()) {
      return props.activeKnobColor();
    } else {
      return wheelColor();
    }
  };

  debug.log("render WheelSlider");

  let trackRef = createRef();

  function onInteractStart(e: Event) {
    e.preventDefault();
    setIsInteracting(true);

    window.addEventListener("mousemove", onInteract);
    window.addEventListener("touchmove", onInteract);
  }

  function onInteract(e: any) {
    e.preventDefault();

    // Get center of hue wheel.
    const rect = trackRef().getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const x = (e.touches ? e.touches[0].clientX : e.clientX) - centerX;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - centerY;
    let degs = Math.round(90 + Math.atan2(y, x) * (180 / Math.PI));

    if (degs < 0) {
      degs += 360;
    }

    props.onValueChange(degs / 360);
  }

  function onInteractEnd() {
    setIsInteracting(false);

    window.removeEventListener("mousemove", onInteract);
    window.removeEventListener("touchmove", onInteract);
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
        "--wheel-color": wheelColor,
        "--knob-color": knobColor,
      }}
    >
      <img
        class={{
          [styles.colors]: true,
          [styles.visible]: isInteracting,
        }}
        src={colorsImage}
        alt=""
      />

      <div
        ref={trackRef}
        class={styles.track}
        style={{
          transform: () => `rotate(${props.value() * 360}deg)`,
        }}
      >
        <div class={styles.knobRotator}>
          <div
            class={{
              [styles.knob]: true,
              [styles.active]: isInteracting,
            }}
            onMouseDown={onInteractStart}
            onTouchStart={onInteractStart}
          />
        </div>
      </div>
    </div>
  );
}
