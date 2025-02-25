import { store } from "@/plugins/2.pinia";
import { useAbility } from "@casl/vue";
import { USER_ABILITY_RULES } from "./constant";

export function useMixin() {
  let resizeObserver = null;

  const observe = (element, callback) => {
    if (!element || typeof callback !== "function") return;

    resizeObserver = new ResizeObserver((entries) => {
      requestAnimationFrame(() => {
        for (let entry of entries) {
          const newWidth = Math.round(entry.contentRect.width);
          const newHeight = Math.round(entry.contentRect.height);
          callback(newWidth, newHeight);
        }
      });
    });

    resizeObserver.observe(element);
  };

  onUnmounted(() => {
    if (resizeObserver) {
      resizeObserver.disconnect();
    }
  });

  return { observe };
}
