<script setup>
import bgCoin from "@images/game/bg-coin.png";
import bgGold from "@images/game/bg-gold.png";
import bgAvt from "@images/game/bg-avt.png";
</script>

<template>
  <div class="top-bar tw-flex tw-items-start tw-px-1 tw-pt-1">
    <div
      class="top-icon tw-mr-[1%] tw-w-[41.2%] tw-aspect-[446/218] tw-bg-contain tw-bg-center tw-bg-no-repeat tw-relative"
      :style="{ backgroundImage: `url(${bgAvt})` }"
    >
      <div
        class="username tw-font-bold tw-text-white tw-absolute tw-top-[30%] -tw-translate-y-[30%] tw-left-0 tw-right-0 tw-ml-[50%] tw-text-xs sm:tw-text-sm md:tw-text-base lg:tw-text-xl xl:tw-text-[32px] tw-line-clamp-1"
      >
        Facaby King
      </div>
      <div
        class="tw-font-bold tw-text-white tw-absolute tw-top-[60%] -tw-translate-y-[60%] tw-left-0 tw-right-0 tw-text-center tw-ml-[50%]"
      >
        12500
      </div>
    </div>
    <div
      class="top-icon tw-mr-[4%] tw-mt-[2%] tw-w-[24.9%] tw-aspect-[269/104] tw-bg-contain tw-bg-center tw-bg-no-repeat tw-relative"
      :style="{ backgroundImage: `url(${bgGold})` }"
    >
      <div
        class="tw-font-bold tw-text-white tw-absolute tw-top-[50%] -tw-translate-y-1/2 tw-left-0 tw-right-0 tw-text-center tw-ml-[37%]"
      >
        12500
      </div>
    </div>
    <div
      class="top-icon tw-mt-[2%] tw-w-[24.1%] tw-aspect-[261/100] tw-bg-contain tw-bg-center tw-bg-no-repeat tw-relative"
      :style="{ backgroundImage: `url(${bgCoin})` }"
    >
      <div
        class="tw-font-bold tw-text-white tw-absolute tw-top-[50%] -tw-translate-y-1/2 tw-left-0 tw-right-0 tw-text-center tw-ml-[37%]"
      >
        12500
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.username,
.num-gold,
.num-score {
  /* -webkit-text-stroke: 2px black; */
  text-shadow: 0 0 2px black;
}
</style>
