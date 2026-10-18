import { createContext, useContext, useSyncExternalStore, type ReactNode } from "react";

export type MotionPreference = "inherit" | "on" | "off";
const MotionContext = createContext<"on" | "off">("on");
const reducedMotionQuery = "(prefers-reduced-motion: reduce)";

function subscribeReducedMotion(notify: () => void) {
  const query = window.matchMedia(reducedMotionQuery);
  query.addEventListener("change", notify);
  return () => query.removeEventListener("change", notify);
}

function getReducedMotion() {
  return window.matchMedia(reducedMotionQuery).matches;
}

function useMotionPreference(motion: MotionPreference) {
  const inherited = useContext(MotionContext);
  return motion === "inherit" ? inherited : motion;
}

// 部品の指定を親から継承し、OSが動きを減らす設定ならOFFにする。
export function useDesignMotion(motion: MotionPreference = "inherit"): "on" | "off" {
  const preference = useMotionPreference(motion);
  const reduced = useSyncExternalStore(subscribeReducedMotion, getReducedMotion, () => false);
  return reduced ? "off" : preference;
}

// DOM要素を増やさずに設定を渡す。子の部品ではON/OFFを上書きできる。
export function MotionProvider({
  motion = "inherit",
  children,
}: {
  motion?: MotionPreference;
  children: ReactNode;
}) {
  const preference = useMotionPreference(motion);
  return <MotionContext.Provider value={preference}>{children}</MotionContext.Provider>;
}
