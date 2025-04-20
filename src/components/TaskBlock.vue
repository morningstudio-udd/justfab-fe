<script setup>
import bgTask from "@images/game/bg-task.png";
import energy from "@images/game/energy.svg";
import gold from "@images/game/gold.png";

const props = defineProps({
  task: Object,
});

const gameStore = useGameStore();

const fontSizeBase = computed(() => gameStore.baseFontSize);

const taskRewardIcon = (rewardsType = REWARD_TYPES.GOLD) => {
  switch (rewardsType) {
    case REWARD_TYPES.JACKPOT:
    case REWARD_TYPES.FOOD:
    case REWARD_TYPES.SPIN:
      break;
    case REWARD_TYPES.TOKEN:
      break;
    case REWARD_TYPES.GOLD:
      return gold;
    case REWARD_TYPES.ITEM:
    case REWARD_TYPES.ENERGY:
      return energy;
    case REWARD_TYPES.POOL_PERCENTAGE:
      break;
    default:
      console.warn(`Unknown reward type: ${rewardsType}`);
      break;
  }
};
</script>

<template>
  <div
    :style="{ backgroundImage: `url(${bgTask})` }"
    class="tw-aspect-[956/242] tw-w-full tw-bg-cover tw-bg-center tw-bg-no-repeat"
  >
    <div
      class="tw-w-[80%] tw-h-[70%] tw-ml-auto tw-flex tw-justify-left tw-items-center"
      :style="{
        fontSize: `${fontSizeBase}px !important`,
        '--base-font-size': `${fontSizeBase}px`,
      }"
    >
      {{ task.title }}
    </div>

    <div
      class="tw-w-full tw-h-[30%] tw-text-white tw-font-bold tw-flex tw-items-center tw-px-[4%]"
      :style="{
        fontSize: `${fontSizeBase}px !important`,
      }"
    >
      <v-img
        :src="taskRewardIcon(task.reward.type)"
        width="auto"
        height="100%"
        class="!tw-aspect-square !tw-w-auto !tw-h-full !tw-flex-none"
      />
      <div class="tw-flex-auto">x {{ task.reward.value }}</div>
    </div>
  </div>
</template>
