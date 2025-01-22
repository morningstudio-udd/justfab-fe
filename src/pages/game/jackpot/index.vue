<script setup>
import ResultItemDialog from "@/components/Dialog/ResultItemDialog.vue";
import gameBg from "@images/game/bg-game-1.png";

definePage({
  meta: {
    layout: "game",
    public: true,
    requiresAuth: true,
  },
});

const refSlotMachine = ref();
const energy = ref("50/50");
const jackpot = ref("1.000.000 vnđ");
const jackpotRewards = ref([]);
const enable = ref(true);
const gameContentRef = ref(null);
const parentDivWidth = ref(0);
const currentRewards = ref(null);
const itemReward = ref(null);
const resultItemDialogRef = ref(null);

let resizeObserver;

const bottomValue = computed(() => {
  return `${parentDivWidth.value / (1080 / 170)}px`;
});

onMounted(async () => {
  if (gameContentRef.value) {
    resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        parentDivWidth.value = entry.contentRect.width;
      }
    });

    resizeObserver.observe(gameContentRef.value);
  }

  // should get from api jackpot/rewards
  jackpotRewards.value = [
    "5.000 Gold",
    "10.000 Gold",
    "Items (Legendary)",
    "Items (Mythic)",
    "0.001% Jackpot Pool",
    "0.005% Jackpot Pool",
    "0.01% Jackpot Pool",
    "0.02% Jackpot Pool",
    "0.05% Jackpot Pool",
    "0.1% Jackpot Pool",
    "0.5% Jackpot Pool",
    "1% Jackpot Pool",
  ];

  // setTimeout(() => {
  //   energy.value = "25 / 100";
  //   jackpot.value = "1.000 vnđ";
  // }, 2000);
});

const onRollClick = async () => {
  if (!enable.value) return;
  try {
    enable.value = false;

    const { reelSymbols: symbolsReward, rewards } = await playSlotMachine();

    currentRewards.value = rewards;
    if (currentRewards.value && currentRewards.value.length) {
      itemReward.value = currentRewards.value.find(
        (reward) => reward.type === REWARD_TYPES.ITEM
      );

      if (itemReward.value && Object.keys(itemReward.value).length) {
        console.log("itemReward", itemReward.value);

        resultItemDialogRef.value.openDialog();
      }
    }

    refSlotMachine.value.roll(symbolsReward);

    await waitForSeconds(4);
    await processRewards();
  } catch (error) {
    console.log("error", error);
  } finally {
    enable.value = true;
  }
};

const resetRewardsState = () => {
  itemReward.value = null;
};
const processRewards = async () => {
  for (let r in currentRewards.value) {
    const reward = currentRewards.value[r];
    if (reward.type == "JACKPOT") {
      refSlotMachine.value.setJackpotVisible(true);
      refSlotMachine.value.rollJackpot(reward.jackpot.reward.description);
      await waitForSeconds(4);
      refSlotMachine.value.setButtonCloseVisible(true);
    }
  }

  return true;
};

onBeforeUnmount(() => {
  if (resizeObserver && gameContentRef.value) {
    resizeObserver.unobserve(gameContentRef.value);
    resizeObserver.disconnect();
  }
});

const waitForSeconds = async (s) => {
  return new Promise((res) => {
    setTimeout(res, s * 1000);
  });
};
</script>

<template>
  <div ref="gameContentRef" class="game-content tw-flex-grow">
    <div
      class="tw-absolute tw-top-0 tw-left-0 tw-right-0"
      :style="{ bottom: bottomValue }"
    >
      <slot-machine
        ref="refSlotMachine"
        :energy="energy"
        :jackpot="jackpot"
        :disabled="!enable"
        :jackpotRewards="jackpotRewards"
        @rollClick="onRollClick"
      ></slot-machine>
    </div>

    <result-item-dialog
      ref="resultItemDialogRef"
      :width="parentDivWidth * 0.79"
      :item="itemReward"
      @onClose="resetRewardsState"
    />
  </div>
</template>
