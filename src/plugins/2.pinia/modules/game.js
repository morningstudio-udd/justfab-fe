import { defineStore } from "pinia";
import { useUserStore } from "./user";
import { emitter } from "@plugins/mitt";

export const useGameStore = defineStore("game", () => {
  const userStore = useUserStore();

  const isLoading = ref(false);
  const baseFontSize = ref(16);
  const gameContainer = ref(null);
  const parentWidth = ref(0);

  const resultItemDialogRef = ref(null);
  const arrayResultItemDialogRef = ref([]);

  const setLoading = (value) => {
    isLoading.value = value;
  };

  const setResponsiveFont = (parent = gameContainer.value, scale = 0.03) => {
    if (!parent) return;
    parentWidth.value = parent.offsetWidth;

    const calculatedFontSize = parentWidth.value * scale;

    return Math.min(36, Math.max(10, calculatedFontSize));
  };

  const setResponsiveFontPercentage = (parent, percent) => {
    if (!parent) return;
    parentWidth.value = parent.offsetWidth;
    console.log("Parent width: ", parentWidth.value);

    return parentWidth.value * (percent / 100);
  };

  const setFontSizeBasedOnViewBox = (svgElement, percent) => {
    if (!svgElement) return;
    const viewBox = svgElement.getAttribute("viewBox").split(" ");
    const viewBoxHeight = parseFloat(viewBox[3]);

    return viewBoxHeight * (percent / 100);
  };

  const handleRewards = (rewards, rewardsType = "slot-machine") => {
    console.log("Rewards: ", rewards, rewardsType);
    for (const reward of rewards) {
      switch (reward.type) {
        case REWARD_TYPES.JACKPOT:
        case REWARD_TYPES.TOKEN:
        case REWARD_TYPES.FOOD:
        case REWARD_TYPES.SPIN:
          break;
        case REWARD_TYPES.GOLD:
          console.log("Reward: ", REWARD_TYPES.GOLD);
          // userStore.userData.gold += reward.value;
          if (rewardsType === "slot-machine") {
            userStore.userData.gold += reward.value;
          } else {
            openResultDialog(reward, rewardsType);
          }
          break;
        case REWARD_TYPES.ITEM:
        case REWARD_TYPES.ENERGY:
        case REWARD_TYPES.POOL_PERCENTAGE:
          openResultDialog(reward, rewardsType);
          break;
        default:
          console.warn(`Unknown reward type: ${reward.type}`);
          break;
      }
    }
  };

  const openResultDialog = (item, rewardsType = "slot-machine") => {
    console.log("Item, ", item);
    arrayResultItemDialogRef.value.push({
      id: item._id,
      item,
      open: true,
      rewardsType,
    });
  };

  const closeDialog = (id) => {
    arrayResultItemDialogRef.value = arrayResultItemDialogRef.value.filter(
      (dialog) => dialog.id !== id
    );
  };

  return {
    isLoading,
    baseFontSize,
    gameContainer,
    parentWidth,
    resultItemDialogRef,
    arrayResultItemDialogRef,
    setLoading,
    setResponsiveFont,
    setResponsiveFontPercentage,
    setFontSizeBasedOnViewBox,
    handleRewards,
    openResultDialog,
    closeDialog,
  };
});
