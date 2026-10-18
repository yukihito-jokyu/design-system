import { useCallback, useLayoutEffect, useRef, type Ref } from "react";
import { useDesignMotion, type MotionPreference } from "./motion-provider";
import { assignMotionRef } from "./motion-feedback";

function timing(element: Element, token: string) {
  const style = getComputedStyle(element);
  return {
    duration: parseFloat(style.getPropertyValue(`--cobalt-duration-${token}`)) || 0,
    easing: style.getPropertyValue("--cobalt-ease-out").trim() || "ease-out",
  };
}

// 選択位置を示す面だけを移動し、タブの文字やクリック領域は動かさない。
export function useSelectionIndicator(ref: Ref<HTMLDivElement> | undefined) {
  const effective = useDesignMotion();
  const preference = useRef(effective);
  const stop = useRef<() => void>(() => {});
  useLayoutEffect(() => {
    preference.current = effective;
    if (effective === "off") stop.current();
  }, [effective]);

  const callback = useCallback(
    (list: HTMLDivElement | null) => {
      const release = assignMotionRef(ref, list);
      if (!list) return;
      const marker = list.querySelector<HTMLElement>(".cobalt-tabs-indicator");
      if (!marker)
        return () => {
          if (typeof release === "function") release();
          else assignMotionRef(ref, null);
        };
      let previous: { left: number; top: number; width: number; height: number } | undefined;
      let selected: Element | null = null;
      let animation: Animation | undefined;
      stop.current = () => animation?.cancel();

      const update = () => {
        const active = list.querySelector<HTMLElement>('[role="tab"][data-state="active"]');
        if (!active) {
          list.removeAttribute("data-cobalt-indicator");
          return;
        }
        const bounds = list.getBoundingClientRect();
        const target = active.getBoundingClientRect();
        const line = list.dataset.variant === "line";

        const vertical =
          list.closest('[data-slot="tabs"]')?.getAttribute("data-orientation") === "vertical";

        const next = {
          left:
            target.left -
            bounds.left -
            list.clientLeft +
            (line ? (vertical ? target.width - 2 : 8) : 0),
          top:
            target.top -
            bounds.top -
            list.clientTop +
            (line ? (vertical ? 8 : target.height - 2) : 0),
          width: line ? (vertical ? 3 : target.width - 16) : target.width,
          height: line ? (vertical ? target.height - 16 : 3) : target.height,
        };

        if (
          selected === active &&
          previous &&
          previous.left === next.left &&
          previous.top === next.top &&
          previous.width === next.width &&
          previous.height === next.height
        )
          return;
        const visible = animation?.playState === "running" ? marker.getBoundingClientRect() : null;

        const from = visible
          ? {
              left: visible.left - bounds.left - list.clientLeft,
              top: visible.top - bounds.top - list.clientTop,
              width: visible.width,
              height: visible.height,
            }
          : previous;

        animation?.cancel();
        Object.assign(marker.style, {
          left: `${next.left}px`,
          top: `${next.top}px`,
          width: `${next.width}px`,
          height: `${next.height}px`,
        });
        list.dataset.cobaltIndicator = "ready";
        if (from && selected !== active && preference.current === "on") {
          const options = timing(list, "expand");
          if (options.duration)
            animation = marker.animate(
              [
                {
                  left: `${from.left}px`,
                  top: `${from.top}px`,
                  width: `${from.width}px`,
                  height: `${from.height}px`,
                },
                {
                  left: `${next.left}px`,
                  top: `${next.top}px`,
                  width: `${next.width}px`,
                  height: `${next.height}px`,
                },
              ],
              options,
            );
        }
        previous = next;
        selected = active;
      };

      const observer = new MutationObserver(update);
      observer.observe(list, {
        subtree: true,
        attributes: true,
        attributeFilter: ["data-state", "data-orientation", "data-variant"],
        childList: true,
      });
      const resize = new ResizeObserver(update);
      resize.observe(list);
      for (const tab of list.querySelectorAll('[role="tab"]')) resize.observe(tab);
      update();
      return () => {
        observer.disconnect();
        resize.disconnect();
        animation?.cancel();
        if (typeof release === "function") release();
        else assignMotionRef(ref, null);
      };
    },
    [ref],
  );

  return { ref: callback, effective };
}

// 検索・並べ替え後の位置関係を示す。初回表示やONへの復帰だけでは再生しない。
export function useListMotion<T extends HTMLElement>(
  motion: MotionPreference,
  change: string,
  selector: string,
) {
  const effective = useDesignMotion(motion);
  const ref = useRef<T>(null);
  const previous = useRef<{ change: string; positions: Map<Element, DOMRect> } | null>(null);
  const animations = useRef<Animation[]>([]);
  useLayoutEffect(() => {
    const root = ref.current;
    if (!root) return;
    for (const animation of animations.current) animation.cancel();
    animations.current = [];
    const elements = Array.from(root.querySelectorAll(selector));

    const positions = new Map(
      elements.map((element) => [element, element.getBoundingClientRect()]),
    );

    const old = previous.current;
    previous.current = { change, positions };
    if (effective !== "on" || !old || old.change === change) return;
    const options = timing(root, "expand");
    if (!options.duration) return;
    elements.forEach((element, index) => {
      const from = old.positions.get(element);
      const to = positions.get(element)!;
      const x = from ? from.left - to.left : 0;
      const y = from ? from.top - to.top : 6;
      if (from && Math.abs(x) < 1 && Math.abs(y) < 1) return;
      animations.current.push(
        element.animate(
          [
            { translate: `${x}px ${y}px`, opacity: from ? 1 : 0 },
            { translate: "0 0", opacity: 1 },
          ],
          { ...options, delay: from ? 0 : Math.min(index, 4) * 20, fill: "backwards" },
        ),
      );
    });
  }, [effective, change, selector]);
  useLayoutEffect(
    () => () => {
      for (const animation of animations.current) animation.cancel();
    },
    [],
  );
  return ref;
}

// ステップの進退など、既存の内容が別の内容へ切り替わったときだけ動かす。
export function useStepMotion(motion: MotionPreference, step: number) {
  const effective = useDesignMotion(motion);
  const ref = useRef<HTMLElement>(null);
  const previous = useRef(step);
  const animation = useRef<Animation | undefined>(undefined);
  useLayoutEffect(() => {
    const old = previous.current;
    previous.current = step;
    animation.current?.cancel();
    if (old === step || effective !== "on" || !ref.current) return;
    const options = timing(ref.current, "expand");

    const distance =
      parseFloat(getComputedStyle(ref.current).getPropertyValue("--cobalt-motion-distance")) || 12;

    if (options.duration)
      animation.current = ref.current.animate(
        [
          { translate: `${step > old ? distance : -distance}px 0`, opacity: 0 },
          { translate: "0 0", opacity: 1 },
        ],
        options,
      );
  }, [step, effective]);
  useLayoutEffect(() => () => animation.current?.cancel(), []);
  return ref;
}
