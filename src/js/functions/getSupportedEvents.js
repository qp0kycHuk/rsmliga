export const support = {
  pointer: !!("PointerEvent" in window || ("msPointerEnabled" in window.navigator)),
  touch: !!(typeof window.orientation !== "undefined" || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) || "ontouchstart" in window || navigator.msMaxTouchPoints || "maxTouchPoints" in window.navigator > 1 || "msMaxTouchPoints" in window.navigator > 1)
};

export default function getSupportedEvents() {
  return support.touch ?
    { type: 'touch', start: "touchstart", end: "touchend", cancel: "touchcancel", move: "touchmove" } :
    { type: 'mouse', start: "mousedown", end: "mouseup", cancel: "mouseleave", move: "mousemove" }
};