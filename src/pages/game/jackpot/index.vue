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
const itemReward = ref(null);
const resultItemDialogRef = ref(null);

let resizeObserver;

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
    "1% Jackpot Pool"
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

<<<<<<< HEAD
    const { reelSymbols: symbolsReward, rewards } = await playSlotMachine();

    if (rewards && rewards.length) {
      itemReward.value = rewards.find(
        (reward) => reward.type === REWARD_TYPES.ITEM
      );

      if (itemReward.value && Object.keys(itemReward.value).length) {
        console.log("itemReward", itemReward.value);

        resultItemDialogRef.value.openDialog();
      }
    }

    refSlotMachine.value.roll(symbolsReward);
=======
    const playResponse = await playSlotMachine();
    resultData.value = { ...playResponse };
    refSlotMachine.value.roll(resultData.value.reelSymbols);

    enable.value = false;

    await waitForSeconds(4);
    await processRewards();

    enable.value = true;

>>>>>>> a77809c705105ec079f07dacc39926e592e89ce8
  } catch (error) {
    console.log("error", error);
  } finally {
    enable.value = true;
  }
};

<<<<<<< HEAD
const resetRewardsState = () => {
  itemReward.value = null;
};
=======
const processRewards = async () => {
  const rewards = resultData.value?.rewards;
  for(let r in rewards) {
    const reward = rewards[r];
    if(reward.type == "JACKPOT") {
      refSlotMachine.value.setJackpotVisible(true);
      refSlotMachine.value.rollJackpot(reward.jackpot.reward.description);
      await waitForSeconds(4);
      refSlotMachine.value.setButtonCloseVisible(true);
    }
  }

  return true;
}
>>>>>>> a77809c705105ec079f07dacc39926e592e89ce8

onBeforeUnmount(() => {
  if (resizeObserver && gameContentRef.value) {
    resizeObserver.unobserve(gameContentRef.value);
    resizeObserver.disconnect();
  }
});
<<<<<<< HEAD
=======

watch(rewardResult, (newVal) => {
  if (newVal) {
    console.log("newVal", newVal);
  }
});

const waitForSeconds = async (s) => {
  return new Promise((res) => {
    setTimeout(res, s * 1000);
  })
}
>>>>>>> a77809c705105ec079f07dacc39926e592e89ce8
</script>

<template>
  <div ref="gameContentRef" class="game-content tw-flex-grow">
<<<<<<< HEAD
    <div class="tw-absolute tw-top-0 tw-left-0 tw-right-0 tw-bottom-0">
      <slot-machine
        ref="refSlotMachine"
        :energy="energy"
        :jackpot="jackpot"
        :disabled="!enable"
        @rollClick="onRollClick"
      ></slot-machine>
    </div>
=======
    <slot-machine
      ref="refSlotMachine"
      :energy="energy"
      :jackpot="jackpot"
      :disabled="!enable"
      :jackpotRewards="jackpotRewards"
      @rollClick="onRollClick"
    ></slot-machine>
>>>>>>> a77809c705105ec079f07dacc39926e592e89ce8

    <result-item-dialog
      ref="resultItemDialogRef"
      :width="parentDivWidth * 0.79"
      :item="itemReward"
      @onClose="resetRewardsState"
    />
  </div>
</template>
