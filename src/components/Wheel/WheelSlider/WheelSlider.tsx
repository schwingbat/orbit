import {
  createRef,
  createState,
  derive,
  type State,
  type ViewContext,
} from "@manyducks.co/dolla";
import { ColorStore } from "../../../stores/ColorStore";
import styles from "./WheelSlider.module.css";
import colorsImage from "./colors.png";

type WheelSliderProps = {
  $value: State<number>;
  $activeKnobColor: State<string>;
  onValueChange: (value: number) => void;
};

export function WheelSlider(props: WheelSliderProps, ctx: ViewContext) {
  ctx.setName("Wheel:Hue");

  const { $isDark } = ctx.use(ColorStore);

  const [$interacting, setInteracting] = createState(false);
  const $wheelColor = derive([$isDark], (dark) => (dark ? "#fff" : "#000"));
  const $knobColor = derive(
    [$interacting, $wheelColor, props.$activeKnobColor],
    (interacting, wheelColor, activeKnobColor) => {
      if (interacting) {
        return activeKnobColor;
      } else {
        return wheelColor;
      }
    },
  );

  const trackRef = createRef<HTMLElement>();

  ctx.watch([props.$value], (value) => {
    ctx.log("value", value);
  });

  ctx.watch([$interacting], (value) => {
    ctx.log("interacting", value);
  });

  function onInteractStart(e: Event) {
    e.preventDefault();
    setInteracting(true);

    window.addEventListener("mousemove", onInteract);
    window.addEventListener("touchmove", onInteract);
  }

  function onInteract(e: any) {
    e.preventDefault();

    // Get center of hue wheel.
    const rect = trackRef()!.getBoundingClientRect();
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
    setInteracting(false);

    window.removeEventListener("mousemove", onInteract);
    window.removeEventListener("touchmove", onInteract);
  }

  ctx.onMount(() => {
    window.addEventListener("mouseup", onInteractEnd);
    window.addEventListener("touchend", onInteractEnd);
  });

  ctx.onUnmount(() => {
    window.removeEventListener("mouseup", onInteractEnd);
    window.removeEventListener("touchend", onInteractEnd);
  });

  return (
    <div
      class={styles.container}
      style={{
        "--wheel-color": $wheelColor,
        "--knob-color": $knobColor,
      }}
    >
      <img
        class={{
          [styles.colors]: true,
          [styles.visible]: $interacting,
        }}
        src={colorsImage}
        alt=""
      />

      <div
        ref={trackRef}
        class={styles.track}
        style={{
          transform: derive(
            [props.$value],
            (value) => `rotate(${value * 360}deg)`,
          ),
        }}
      >
        <div class={styles.knobRotator}>
          <div
            class={{
              [styles.knob]: true,
              [styles.active]: $interacting,
            }}
            onmousedown={onInteractStart}
            ontouchstart={onInteractStart}
          />
        </div>
      </div>
    </div>
  );
}
