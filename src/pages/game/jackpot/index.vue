<script setup>
import ResultItemDialog from "@/components/Dialog/ResultItemDialog.vue";
import gameBg from "@images/game/bg-game-1.png";

definePage({
  meta: {
    layout: "game",
    requiresAuth: true,
  },
});

const userStore = useUserStore();

const refSlotMachine = ref();

const jackpot = ref();
const jackpotRewards = ref([]);
const enable = ref(true);
const gameContentRef = ref(null);
const parentDivWidth = ref(0);
const currentRewards = ref(null);
const itemReward = ref(null);
const resultItemDialogRef = ref(null);

let resizeObserver;

const energy = computed(
  () => `${userStore.userData?.energy} / ${userStore.userData?.maxEnergy}`
);
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

  const { rewards, pool } = await getJackpotRewards();
  jackpotRewards.value = rewards;
  jackpot.value = pool.toString();
});

const onRollClick = async () => {
  if (!enable.value) return;
  try {
    enable.value = false;

    const {
      reelSymbols: symbolsReward,
      rewards,
      user,
    } = await playSlotMachine();

    currentRewards.value = rewards;

    refSlotMachine.value.roll(symbolsReward);

    await waitForSeconds(4);

    userStore.userData = { ...userStore.userData, ...user };
    await processRewards();
  } catch (error) {
    console.log("error", error);
  } finally {
    enable.value = true;
  }
};

const resetRewardsState = () => {
  itemReward.value = null;
  currentRewards.value = null;
};

const processRewards = async () => {
  for (const reward of currentRewards.value) {
    switch (reward.type) {
      case REWARD_TYPES.JACKPOT: {
        jackpot.value = reward.jackpot.updatedPool.toString();

        const description = reward.jackpot.reward.description;

        refSlotMachine.value.setJackpotVisible(true);
        refSlotMachine.value.rollJackpot(description);
        await waitForSeconds(4);
        refSlotMachine.value.setButtonCloseVisible(true);
        break;
      }

      case REWARD_TYPES.ITEM:
        itemReward.value = reward;
        resultItemDialogRef.value.openDialog();
        break;

      default:
        console.warn(`Unknown reward type: ${reward.type}`);
        break;
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
