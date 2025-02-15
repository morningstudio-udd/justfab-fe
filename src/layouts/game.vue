<script setup>
import LoadingGame from "@/components/LoadingGame.vue";
import gameBg from "@images/game/bg-game-2.png";

const gameStore = useGameStore();

const gameContainerRef = ref(null);

const fontSizeBase = computed(() => gameStore.baseFontSize);

onMounted(() => {
  gameStore.gameContainer = gameContainerRef.value;
  gameStore.baseFontSize = gameStore.setResponsiveFont();

  gameStore.setLoadingProgress(false);
});
</script>

<template>
  <div class="h-full blank-layout">
    <div
      class="tw-bg-[#86C7E5] tw-w-screen tw-h-screen tw-flex tw-items-center tw-justify-center"
    >
      <div
        class="game-container tw-w-auto tw-h-[1920px] tw-aspect-[9/16] tw-max-w-full tw-max-h-screen tw-bg-[#D9D9D9] tw-bg-cover tw-bg-center tw-bg-no-repeat tw-flex tw-flex-col tw-relative"
        :style="{
          backgroundImage: `url(${gameBg})`,
          fontSize: `${fontSizeBase}px`,
          '--base-font-size': `${fontSizeBase}px`,
        }"
        ref="gameContainerRef"
      >
        <!-- Top Icons -->
        <top-bar />

        <RouterView #="{ Component }">
          <Component :is="Component" />
        </RouterView>

        <!-- Bottom Icons -->
        <bottom-bar />
      </div>
    </div>

    <AudioSource />
    <LoadingGame />
  </div>
</template>
