import { useSyncExternalStore } from "react";

const COARSE_POINTER_QUERY = "(pointer: coarse)";

function subscribe(onStoreChange: () => void) {
  const query = window.matchMedia(COARSE_POINTER_QUERY);
  query.addEventListener("change", onStoreChange);
  return () => query.removeEventListener("change", onStoreChange);
}

function getSnapshot(): boolean {
  return window.matchMedia(COARSE_POINTER_QUERY).matches;
}

function getServerSnapshot(): boolean {
  return false;
}

// True on touch devices (phones, tablets). iOS Safari composites large
// `filter: blur()` layers and `background-attachment: fixed` at full device
// pixel ratio; on a 3x Retina phone that can exceed the per-tab GPU budget and
// make WebKit drop the whole layer tree, blanking the page. The ambient
// background effects are a desktop nicety, so they're gated on this rather
// than shipped everywhere. Subscribing through useSyncExternalStore means the
// first render already has the right value, so the heavy layers never mount
// even for a single frame on mobile.
export function useCoarsePointer(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
