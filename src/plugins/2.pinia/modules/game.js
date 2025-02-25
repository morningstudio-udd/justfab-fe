import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { emitter } from "@plugins/mitt";

export const useGameStore = defineStore("game", () => {
  const userStore = useUserStore();

  const isLoading = ref(false);
  const baseFontSize = ref(16);
  const gameContainer = ref(null);
  const resultItemDialogRef = ref(null);

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

  const handleRewards = (rewards) => {
    for (const reward of rewards) {
      switch (reward.type) {
        case REWARD_TYPES.JACKPOT: {
          break;
        }
        case REWARD_TYPES.GOLD:
          console.log("Reward: ", REWARD_TYPES.GOLD);
          userStore.userData.gold += reward.value;
          break;
        case REWARD_TYPES.ITEM:
          emitter.emit("show-reward", reward);
          break;
        case REWARD_TYPES.ENERGY:
          console.log("Reward: ", REWARD_TYPES.ENERGY);
          userStore.userData.energy += reward.value;
          break;
        case REWARD_TYPES.POOL_PERCENTAGE:
          emitter.emit("show-reward", reward);
          break;
        default:
          console.warn(`Unknown reward type: ${reward.type}`);
          break;
      }
    }
  };

  return {
    isLoading,
    baseFontSize,
    gameContainer,
    resultItemDialogRef,
    setLoading,
    setResponsiveFont,
    setResponsiveFontPercentage,
    setFontSizeBasedOnViewBox,
    handleRewards,
  };
});
