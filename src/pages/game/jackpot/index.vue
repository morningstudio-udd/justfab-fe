<script setup>
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
const resultData = ref(null);
const gameContentRef = ref(null);
const parentDivWidth = ref(0);

let resizeObserver;

const rewardResult = computed(() => resultData.value?.rewards);

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
  // refSlotMachine.value.roll(["J", "J", "J", "O"]);
  // enable.value = false;
  // setTimeout(() => {
  //   enable.value = true;
  // }, 4000);
  try {
    enable.value = false;

    const playResponse = await playSlotMachine();
    resultData.value = { ...playResponse };
    refSlotMachine.value.roll(resultData.value.reelSymbols);

    enable.value = false;

    await waitForSeconds(4);
    await processRewards();

    enable.value = true;

  } catch (error) {
    console.log("error", error);
  } finally {
    enable.value = true;
  }
};

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

onBeforeUnmount(() => {
  if (resizeObserver && gameContentRef.value) {
    resizeObserver.unobserve(gameContentRef.value);
    resizeObserver.disconnect();
  }
});

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
</script>

<template>
  <div ref="gameContentRef" class="game-content tw-flex-grow">
    <slot-machine
      ref="refSlotMachine"
      :energy="energy"
      :jackpot="jackpot"
      :disabled="!enable"
      :jackpotRewards="jackpotRewards"
      @rollClick="onRollClick"
    ></slot-machine>

    <ResultDialog :width="parentDivWidth * 0.79" />
  </div>
</template>
