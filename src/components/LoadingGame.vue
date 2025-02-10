<script setup>
import bgLoadingGame from "@images/game/bg-loading-game.png";
import loadingBar from "@images/game/loading-bar.png";

const props = defineProps({
  width: {
    type: Number,
    default: 0,
  },
});

const gameStore = useGameStore();
const isLoading = computed(() => gameStore.isLoading);
const progressLoading = computed(() => gameStore.progressLoading);
</script>

<template>
  <section id="loading">
    <v-overlay
      v-model="isLoading"
      class="tw-justify-center tw-items-center !tw-z-[2000]"
      scrim="rgb(59 130 246 / 50%)"
      opacity="0"
    >
      <v-card
        flat
        class="tw-aspect-[9/16] tw-w-auto tw-h-screen tw-max-w-full tw-max-h-[1920px] !tw-bg-cover !tw-bg-center !tw-bg-no-repeat"
        :style="{ backgroundImage: `url(${bgLoadingGame})` }"
      >
        <v-progress-linear
          color="cyan"
          indeterminate
          class="tw-aspect-[907/154] tw-w-[907px] !tw-h-auto tw-max-w-[80%] tw-bg-cover tw-bg-center tw-bg-no-repeat"
          :style="{ backgroundImage: `url(${loadingBar})` }"
        ></v-progress-linear>
      </v-card>
    </v-overlay>
  </section>
</template>

<style lang="scss" scoped>
.loader {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: inline-block;
  position: relative;
  border: 3px solid;
  border-color: #fff #fff transparent transparent;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}
.loader::after,
.loader::before {
  content: "";
  box-sizing: border-box;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  margin: auto;
  border: 3px solid;
  border-color: transparent transparent #ff3d00 #ff3d00;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  box-sizing: border-box;
  animation: rotationBack 0.5s linear infinite;
  transform-origin: center center;
}
.loader::before {
  width: 32px;
  height: 32px;
  border-color: #fff #fff transparent transparent;
  animation: rotation 1.5s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes rotationBack {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
</style>
