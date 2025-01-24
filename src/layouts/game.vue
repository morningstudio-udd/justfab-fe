<script setup>
import gameBg from "@images/game/bg-game-2.png";
</script>

<template>
  <div class="h-full blank-layout">
    <div
      class="tw-bg-[#86C7E5] tw-w-screen tw-h-screen tw-flex tw-items-center tw-justify-center"
    >
      <div
        class="game-container tw-w-auto tw-h-screen tw-aspect-[1080/1920] tw-max-w-full tw-max-h-[1920px] tw-bg-[#D9D9D9] tw-bg-cover tw-bg-center tw-bg-no-repeat tw-flex tw-flex-col tw-relative"
        :style="{ backgroundImage: `url(${gameBg})` }"
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
  </div>
</template>
