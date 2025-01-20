<script setup>
import gameBg from "@images/game/bg-game-1.png";
import SlotMachinez from "@/components/Game/SlotMachine.vue";
import { onMounted } from "vue";

definePage({
  meta: {
    layout: "blank",
    public: true,
  },
});

const refSlotMachine = ref();
const energy = ref("50/50");
const jackpot = ref("1.000.000 vnđ")
const enable = ref(true);

onMounted(() => {
  setTimeout(() => {
    energy.value = "25 / 100";
    jackpot.value = "1.000 vnđ";
  }, 2000);
})

const onRollClick = () => {
  refSlotMachine.value.roll(['J', 'J', 'J', 'O'])
  enable.value = false;
  setTimeout(() => {enable.value = true}, 4000);
}

</script>

<template>
  <div
    class="tw-bg-[#86C7E5] tw-w-screen tw-h-screen tw-flex tw-items-center tw-justify-center"
  >
    <div
      class="game-container tw-w-auto tw-h-[1920px] tw-aspect-[1080/1920] tw-max-w-full tw-max-h-full tw-bg-[#D9D9D9] tw-bg-cover tw-bg-center tw-bg-no-repeat tw-flex tw-flex-col tw-relative"
      :style="{ backgroundImage: `url(${gameBg})` }"
    >
      <!-- Top Icons -->
      <top-bar />
      <div class="game-content tw-flex-grow">
        <slot-machine 
          ref="refSlotMachine"
          :energy="energy"
          :jackpot="jackpot"
          :disabled="!enable"
          @rollClick="onRollClick"
        ></slot-machine>

      </div>
      <!-- Bottom Icons -->
      <bottom-bar />
    </div>
  </div>
</template>
