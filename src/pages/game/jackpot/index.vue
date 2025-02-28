<script setup>
import { claimEnergy } from "@/api/game";
import ResultItemDialog from "@/components/Dialog/ResultItemDialog.vue";
import gameBg from "@images/game/bg-game-1.png";
import { emitter } from "@plugins/mitt";

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
const gameStore = useGameStore();

const refSlotMachine = ref();

const jackpot = ref(100000);
const jackpotRewards = ref([]);
const enable = ref(true);
const gameContentRef = ref(null);
const parentDivWidth = ref(0);
const currentRewards = ref(null);
const itemReward = ref(null);
const resultItemDialogRef = ref(null);
const sfxVolume = useLocalStorage("sfxVolume", 50);

let resizeObserver;

const energy = computed(() => userStore.userData?.energy || 0);
const claimEnergyAt = computed(
  () => new Date(userStore.userData?.claimEnergyAt)
);
const bottomValue = computed(() => {
  return `${parentDivWidth.value / (1080 / 170)}px`;
});

const { observe } = useMixin();

const handleResize = (newWidth) => {
  parentDivWidth.value = newWidth;
};

onMounted(async () => {
  // if (gameContentRef.value) {
  //   resizeObserver = new ResizeObserver((entries) => {
  //     for (let entry of entries) {
  //       parentDivWidth.value = entry.contentRect.width;
  //     }
  //   });

  //   resizeObserver.observe(gameContentRef.value);
  // }

  if (gameContentRef.value) {
    observe(gameContentRef.value, handleResize);
  }

  const p1 = getUserInfo();
  const p2 = getJackpotRewards().then(({ rewards, pool }) => {
    jackpotRewards.value = rewards;
    jackpot.value = pool;
  });

  await Promise.all([p1, p2]);

  emitter.on("reset-rewards-state", resetRewardsState);
});

onUnmounted(() => {
  // if (resizeObserver && gameContentRef.value) {
  //   resizeObserver.unobserve(gameContentRef.value);
  //   resizeObserver.disconnect();
  // }

  emitter.off("reset-rewards-state");
});

const onRollClick = async (betX) => {
  if (!enable.value) return;
  try {
    enable.value = false;

    const { playScripts, rewards, user } = await playSlotMachine({ betX });

    userStore.userData.energy = user.energy;
    currentRewards.value = rewards;

    await refSlotMachine.value.roll(playScripts);
  } catch (error) {
    enable.value = true;
    console.log("error", error);
  } finally {
  }

  enable.value = true;
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
  for (const r of rewards) {
    if (r.type == "GOLD") {
      refSlotMachine.value.showGoldEffect();
      refSlotMachine.value.showValue(`+${r.value}`);
    }
    if (r.type == "FOOD") {
      refSlotMachine.value.showFoodEffect();
      refSlotMachine.value.showValue(`+${r.value}`);
    }
    if (r.type == "TOKEN") {
      refSlotMachine.value.showTokenEffect();
      refSlotMachine.value.showValue(`+${r.value}`);
    }
  }

  gameStore.handleRewards(rewards, true);
  await refSlotMachine.value.rollNextStep();
  return true;
};

onBeforeUnmount(() => {});

const onClaimEnergyClick = async (e) => {
  try {
    let oldEnergy = userStore.userData.energy;

    const { energy: newEnergy, lastClaimed: newClaimEnergyAt } =
      await claimEnergy();

    userStore.userData.claimEnergyAt = newClaimEnergyAt;
    userStore.userData.energy = newEnergy;

    refSlotMachine.value.flyEnergy(newEnergy - oldEnergy);
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
        :volume="sfxVolume"
        @rollClick="onRollClick"
        @scriptCompleted="onScriptCompleted"
        @claimEnergyClick="onClaimEnergyClick"
      ></slot-machine>
    </div>
  </div>
</template>
