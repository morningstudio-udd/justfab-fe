import { defineStore } from "pinia";

export const useGameStore = defineStore("game", () => {
  const isLoading = ref(false);
  const baseFontSize = ref(16);
  const gameContainer = ref(null);

  const setLoading = (value) => {
    isLoading.value = value;
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
    baseFontSize,
    gameContainer,
    setLoading,
    setResponsiveFont,
    setResponsiveFontPercentage,
    setFontSizeBasedOnViewBox,
  };
});
