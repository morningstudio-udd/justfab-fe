<script setup>
import ResultDialog from "@/components/Dialog/ResultDialog.vue";
import gameBg from "@images/game/bg-game-1.png";

definePage({
  meta: {
    layout: "game",
    public: true,
  },
});

const refSlotMachine = ref();
const energy = ref("50/50");
const jackpot = ref("1.000.000 vnđ");
const enable = ref(true);
const gameContentRef = ref(null);
const parentDivWidth = ref(0);
let resizeObserver;

onMounted(() => {
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

const onRollClick = () => {
  refSlotMachine.value.roll(["J", "J", "J", "O"]);
  enable.value = false;
  setTimeout(() => {
    enable.value = true;
  }, 4000);
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
    <slot-machine
      ref="refSlotMachine"
      :energy="energy"
      :jackpot="jackpot"
      :disabled="!enable"
      @rollClick="onRollClick"
    ></slot-machine>

    <ResultDialog :width="parentDivWidth * 0.79" />
  </div>
</template>
