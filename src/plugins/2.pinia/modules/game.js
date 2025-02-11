import { defineStore } from "pinia";

export const useGameStore = defineStore("game", () => {
  const isLoading = ref(false);
  const progressLoading = ref(0);
  const baseFontSize = ref(16);
  const gameContainer = ref(null);

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

  const setResponsiveFont = (parent = gameContainer.value, scale = 0.03) => {
    if (!parent) return;
    const parentWidth = parent.offsetWidth;

    const calculatedFontSize = parentWidth * scale;

    const fontSize = Math.min(36, Math.max(14, calculatedFontSize));

    return fontSize;
  };

  const setResponsiveFontPercentage = (parent, percent) => {
    if (!parent) return;
    const parentWidth = parent.offsetWidth;
    console.log("Parent width: ", parentWidth);

    const fontSize = parentWidth * (percent / 100);

    return fontSize;
  };

  const setFontSizeBasedOnViewBox = (svgElement, percent) => {
    if (!svgElement) return;
    const viewBox = svgElement.getAttribute("viewBox").split(" ");
    const viewBoxHeight = parseFloat(viewBox[3]);

    return viewBoxHeight * (percent / 100);
  };

  return {
    isLoading,
    progressLoading,
    baseFontSize,
    gameContainer,
    startLoading,
    completeLoading,
    setResponsiveFont,
    setResponsiveFontPercentage,
    setFontSizeBasedOnViewBox,
  };
});
