import { store } from "@/plugins/2.pinia";
import { useAbility } from "@casl/vue";
import { USER_ABILITY_RULES } from "./constant";

export const paginationMeta = (options, total) => {
  const start = (options.page - 1) * options.itemsPerPage + 1;
  const end = Math.min(options.page * options.itemsPerPage, total);

  return `Hiển thị từ ${
    total === 0 ? 0 : start
  } tới ${end} trên tổng số ${total}`;
};

/**
 * Promise based setTimeout
 *
 * @param {*} ms
 * @returns
 */
export const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 *
 * Select all text in a input
 *
 * @param {*} target
 */
export const selectAllText = (target) => {
  console.log(target);
  nextTick(() => {
    const textareaElement = target;
    if (textareaElement) {
      textareaElement.focus();
      textareaElement.select();
    }
  });
};
