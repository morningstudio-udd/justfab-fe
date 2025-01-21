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

  setTimeout(() => {
    energy.value = "25 / 100";
    jackpot.value = "1.000 vnđ";
  }, 2000);
});

const onRollClick = async () => {
  if (!enable.value) return;
  try {
    enable.value = false;

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
  } catch (error) {
    console.log("error", error);
  } finally {
    enable.value = true;
  }
};

const resetRewardsState = () => {
  itemReward.value = null;
};

onBeforeUnmount(() => {
  if (resizeObserver && gameContentRef.value) {
    resizeObserver.unobserve(gameContentRef.value);
    resizeObserver.disconnect();
  }
});
</script>

<template>
  <div ref="gameContentRef" class="game-content tw-flex-grow">
    <div class="tw-absolute tw-top-0 tw-left-0 tw-right-0 tw-bottom-0">
      <slot-machine
        ref="refSlotMachine"
        :energy="energy"
        :jackpot="jackpot"
        :disabled="!enable"
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
