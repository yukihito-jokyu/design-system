import { useCallback, useLayoutEffect, useRef, type Ref } from "react";
import { useDesignMotion, type MotionPreference } from "./motion-provider";

// React 19のcallback refの後始末とobject refの両方を維持する。
export function assignMotionRef<T>(ref: Ref<T> | undefined, element: T | null) {
  if (typeof ref === "function") return ref(element);
  if (ref) ref.current = element;
}

type Feedback =
  | "check"
  | "switch"
  | "radio"
  | "toggle"
  | "status"
  | "complete"
  | "invalid"
  | "calendar"
  | "ready"
  | "message";

// CSSの状態遷移と競合しないよう、補助動作には独立したscale/translate/rotateを使う。
// 値と曲線の正本はstyles/registry.json。未読込時は動きを加えない。
function playFeedback(
  element: HTMLElement,
  feedback: Feedback,
  animate: (target: Element, frames: Keyframe[], duration: string) => void,
) {
  const state = element.getAttribute("data-state");
  if (feedback === "check") {
    if (state === "unchecked") return;
    const indicator = element.querySelector(".cobalt-checkbox-indicator");
    if (indicator)
      animate(
        indicator,
        [{ scale: ".5" }, { scale: "1.16", offset: 0.65 }, { scale: "1" }],
        "feedback",
      );
    const path = element.querySelector<SVGGeometryElement>(".cobalt-checkbox-check path");
    if (state === "checked" && path) {
      const length = path.getTotalLength();
      animate(
        path,
        [
          { strokeDasharray: `${length}`, strokeDashoffset: length },
          { strokeDasharray: `${length}`, strokeDashoffset: 0 },
        ],
        "selection",
      );
    }
  } else if (feedback === "switch") {
    const thumb = element.querySelector(".cobalt-switch-thumb");
    if (thumb)
      animate(
        thumb,
        [
          { scale: "1 1" },
          { scale: ".84 1.12", offset: 0.25 },
          { scale: "1.1 .95", offset: 0.65 },
          { scale: "1 1" },
        ],
        "feedback",
      );
  } else if (feedback === "radio") {
    const indicator = element.querySelector(".cobalt-radio-indicator");
    if (state === "checked" && indicator)
      animate(
        indicator,
        [{ scale: ".35" }, { scale: "1.2", offset: 0.65 }, { scale: "1" }],
        "feedback",
      );
  } else if (feedback === "toggle") {
    if (state !== "on" && element.getAttribute("aria-current") !== "page") return;
    const icon = element.querySelector("svg");
    animate(
      icon ?? element,
      [{ scale: ".88" }, { scale: "1.08", offset: 0.65 }, { scale: "1" }],
      "feedback",
    );
  } else if (feedback === "status") {
    const variant = element.getAttribute("data-variant");
    const mark = element.querySelector(".cobalt-badge-mark");
    if (variant === "destructive" || (!mark && variant !== "success")) {
      animate(element, [{ opacity: 0.65 }, { opacity: 1 }], "selection");
      return;
    }
    animate(
      mark ?? element,
      [
        { scale: mark ? ".7" : ".98", opacity: 0.5 },
        { scale: mark ? "1.12" : "1.01", opacity: 1, offset: 0.65 },
        { scale: "1", opacity: 1 },
      ],
      "celebrate",
    );
  } else if (feedback === "complete") {
    const indicator = element.querySelector(".cobalt-progress-indicator");
    if (state === "complete" && indicator)
      animate(indicator, [{ opacity: 0.55 }, { opacity: 1 }], "celebrate");
  } else if (feedback === "invalid") {
    if (element.getAttribute("aria-invalid") === "true")
      animate(
        element,
        [
          { translate: "0" },
          { translate: "-2px 0", offset: 0.25 },
          { translate: "2px 0", offset: 0.5 },
          { translate: "-1px 0", offset: 0.75 },
          { translate: "0" },
        ],
        "selection",
      );
  } else if (feedback === "calendar") {
    if (
      element.getAttribute("data-selected-single") === "true" ||
      element.getAttribute("data-range-end") === "true"
    )
      animate(
        element,
        [{ scale: ".86" }, { scale: "1.06", offset: 0.7 }, { scale: "1" }],
        "feedback",
      );
  } else if (feedback === "ready" && state === "ready") {
    animate(element, [{ opacity: 0.5 }, { opacity: 1 }], "entry");
  } else if (feedback === "message" && element.getAttribute("data-status") === "sent") {
    animate(
      element,
      [
        { translate: "0 2px", opacity: 0.8 },
        { translate: "0 0", opacity: 1 },
      ],
      "menu",
    );
  }
}

export function useMotionFeedback<T extends HTMLElement>({
  motion = "inherit",
  ref: forwardedRef,
  feedback,
}: {
  motion?: MotionPreference;
  ref?: Ref<T>;
  feedback: Feedback;
}) {
  const effective = useDesignMotion(motion);
  const current = useRef({ effective, feedback });
  const animations = useRef(new Map<Element, Set<Animation>>());

  const cancel = useCallback(() => {
    for (const group of animations.current.values())
      for (const animation of group) animation.cancel();
    animations.current.clear();
  }, []);

  useLayoutEffect(() => {
    current.current = { effective, feedback };
    if (effective === "off") cancel();
  }, [effective, feedback, cancel]);

  const ref = useCallback(
    (element: T | null) => {
      const release = assignMotionRef(forwardedRef, element);
      if (!element) return;

      const attributes =
        feedback === "status"
          ? ["data-variant"]
          : feedback === "invalid"
            ? ["aria-invalid"]
            : feedback === "toggle"
              ? ["data-state", "aria-current"]
              : feedback === "calendar"
                ? ["data-selected-single", "data-range-end"]
                : feedback === "message"
                  ? ["data-status"]
                  : ["data-state"];

      const values = attributes.map((attribute) => element.getAttribute(attribute));

      const observer = new MutationObserver(() => {
        let changed = false;
        attributes.forEach((attribute, index) => {
          const value = element.getAttribute(attribute);
          if (values[index] !== value) changed = true;
          values[index] = value;
        });
        // 初回描画やON/OFFの変更だけでは再生しない。
        if (
          !changed ||
          current.current.effective !== "on" ||
          element.matches(":disabled, [aria-disabled=true]")
        )
          return;
        cancel();
        const style = getComputedStyle(element);
        playFeedback(element, current.current.feedback, (target, frames, duration) => {
          const milliseconds = parseFloat(style.getPropertyValue(`--cobalt-duration-${duration}`));
          const easing = style.getPropertyValue("--cobalt-ease-out").trim();
          if (!milliseconds || !easing || typeof target.animate !== "function") return;
          const animation = target.animate(frames, { duration: milliseconds, easing });
          const group = animations.current.get(target) ?? new Set<Animation>();
          group.add(animation);
          animations.current.set(target, group);
          void animation.finished.then(
            () => group.delete(animation),
            () => group.delete(animation),
          );
        });
      });

      observer.observe(element, { attributes: true, attributeFilter: attributes });
      return () => {
        observer.disconnect();
        cancel();
        if (typeof release === "function") release();
        else assignMotionRef(forwardedRef, null);
      };
    },
    [forwardedRef, feedback, cancel],
  );

  return { ref, effective };
}

// Radixが計測中にanimationを止める部品でも、位置確定後に一度だけ登場させる。
// 完了・中断で印を外すため、ONへの復帰だけでは再生しない。
export function useMotionEntry<T extends HTMLElement>(forwardedRef?: Ref<T>) {
  const effective = useDesignMotion();
  const preference = useRef(effective);
  const root = useRef<T | null>(null);
  useLayoutEffect(() => {
    preference.current = effective;
    if (effective === "off") root.current?.removeAttribute("data-cobalt-entry");
  }, [effective]);

  const ref = useCallback(
    (element: T | null) => {
      const release = assignMotionRef(forwardedRef, element);
      root.current = element;
      if (!element) return;

      const begin = () => {
        if (
          preference.current === "on" &&
          element.isConnected &&
          element.dataset.state !== "closed"
        )
          element.dataset.cobaltEntry = "enter";
      };

      let state = element.dataset.state;

      const observer = new MutationObserver(() => {
        const next = element.dataset.state;
        if (next === state) return;
        state = next;
        if (next === "closed") element.removeAttribute("data-cobalt-entry");
        else begin();
      });

      observer.observe(element, { attributes: true, attributeFilter: ["data-state"] });

      const finish = (event: AnimationEvent) => {
        if (event.target === element && event.animationName.startsWith("cobalt-"))
          element.removeAttribute("data-cobalt-entry");
      };

      element.addEventListener("animationend", finish);
      begin();
      return () => {
        observer.disconnect();
        element.removeEventListener("animationend", finish);
        element.removeAttribute("data-cobalt-entry");
        if (typeof release === "function") release();
        else assignMotionRef(forwardedRef, null);
      };
    },
    [forwardedRef],
  );

  return { ref, effective };
}
