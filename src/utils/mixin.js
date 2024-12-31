import { store } from "@/plugins/2.pinia";


export const paginationMeta = (options, total) => {
  const start = (options.page - 1) * options.itemsPerPage + 1;
  const end = Math.min(options.page * options.itemsPerPage, total);

  return `Hiển thị từ ${
    total === 0 ? 0 : start
  } tới ${end} trên tổng số ${total}`;
};

export const delay = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const selectAllText = (
  target
) => {
  console.log(target);
  nextTick(() => {
    const textareaElement = target;
    if (textareaElement) {
      textareaElement.focus();
      textareaElement.select();
    }
  });
};

export const shuffleArray = (array) =>
  array.sort(() => Math.random() - 0.5);
