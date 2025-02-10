import { defineStore } from "pinia";

export const useGameStore = defineStore("game", () => {
  const isLoading = ref(false);
  const progressLoading = ref(0);

  // Function to simulate loading progress
  const startLoading = () => {
    progressLoading.value = 0;
    isLoading.value = true;

    const interval = setInterval(() => {
      if (progressLoading.value >= 95) {
        clearInterval(interval);
      } else {
        progressLoading.value += Math.floor(Math.random() * 10 + 5); // Random increment
      }
    }, 200);
  };

  const completeLoading = () => {
    progressLoading.value = 100;
    setTimeout(() => (isLoading.value = false), 500); // Delay before hiding the loading screen
  };

  return {
    isLoading,
    progressLoading,
    startLoading,
    completeLoading,
  };
});
