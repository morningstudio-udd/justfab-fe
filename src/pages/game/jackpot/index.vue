<script setup>
import { claimEnergy } from "@/api/game";
import ResultItemDialog from "@/components/Dialog/ResultItemDialog.vue";
import gameBg from "@images/game/bg-game-1.png";
import { computed } from "vue";

definePage({
  meta: {
    layout: "game",
    requiresAuth: true,
    subject: "User",
    action: "read",
  },
});

const route = useRoute();
const userStore = useUserStore();

const refSlotMachine = ref();

const jackpot = ref(100000);
const jackpotRewards = ref([]);
const enable = ref(true);
const gameContentRef = ref(null);
const parentDivWidth = ref(0);
const currentRewards = ref(null);
const itemReward = ref(null);
const resultItemDialogRef = ref(null);

let resizeObserver;

const energy = computed(() => userStore.userData?.energy || 0);
const claimEnergyAt = computed(
  () => new Date(userStore.userData?.claimEnergyAt)
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

  const p1 = getUserInfo();
  const p2 = getJackpotRewards().then(({ rewards, pool }) => {
    jackpotRewards.value = rewards;
    jackpot.value = pool;
  });

  await Promise.all([p1, p2]);
});

const onRollClick = async (betX) => {
  if (!enable.value) return;
  try {
    enable.value = false;

    const { playScripts, rewards, user } = await playSlotMachine({ betX });

    userStore.userData.energy = user.energy;
    currentRewards.value = rewards;

    refSlotMachine.value.roll(playScripts);
  } catch (error) {
    console.log("error", error);
  } finally {
    enable.value = true;
  }
};

const onScriptCompleted = async (script) => {
  console.log("complete", script);
  await processRewards(script.rewards);
};

const resetRewardsState = () => {
  itemReward.value = null;
  currentRewards.value = null;
};

const processRewards = async (rewards) => {
  for (const reward of rewards) {
    switch (reward.type) {
      case REWARD_TYPES.JACKPOT: {
        break;
      }
      case REWARD_TYPES.GOLD:
        console.log("Add gold to user", reward.value);
        userStore.userData.gold += reward.value;
        break;
      case REWARD_TYPES.ITEM:
        itemReward.value = reward;
        resultItemDialogRef.value.openDialog();
        break;

      default:
        console.warn(`Unknown reward type: ${reward.type}`);
        break;
    }
  }

  await refSlotMachine.value.rollNextStep();
  return true;
};

onBeforeUnmount(() => {
  if (resizeObserver && gameContentRef.value) {
    resizeObserver.unobserve(gameContentRef.value);
    resizeObserver.disconnect();
  }
});

const onClaimEnergyClick = async (e) => {
  try {
    enable.value = false;

    const { energy: newEnergy, lastClaimed: newClaimEnergyAt } =
      await claimEnergy();

    userStore.userData.claimEnergyAt = newClaimEnergyAt;
    userStore.userData.energy = newEnergy;
  } catch (error) {
    console.log("error", error);
  }
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
        :claimEnergyAt="claimEnergyAt"
        @rollClick="onRollClick"
        @scriptCompleted="onScriptCompleted"
        @claimEnergyClick="onClaimEnergyClick"
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
