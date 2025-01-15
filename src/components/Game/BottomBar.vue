<script setup>
import bgBottomBar from "@images/game/bg-bottom-bar.png";
import iconJackpot from "@images/game/icon-jackpot.png";
import iconTreasure from "@images/game/icon-treasure.png";
import iconBag from "@images/game/icon-bag.png";
import iconDaily from "@images/game/icon-daily.png";
import iconRef from "@images/game/icon-ref.png";
</script>

<template>
  <div
    class="bottom-bar tw-w-full tw-max-w-full tw-aspect-[1080/170] tw-bg-[#F6C857] tw-flex tw-bg-cover tw-bg-center tw-bg-no-repeat !tw-border-t-[6px] tw-solid tw-border-[#BB6024]"
    :style="{ backgroundImage: `url(${bgBottomBar})` }"
  >
    <div
      class="bottom-icon tw-aspect-[232/170] tw-w-[19%]"
      v-ripple="{ class: `text-white` }"
    >
      <v-img
        :src="iconTreasure"
        cover
        class="tw-aspect-[114/102] tw-w-300 !tw-max-w-[50%]"
      />
    </div>
    <div
      class="bottom-icon tw-aspect-[209/170] tw-w-[19%]"
      v-ripple="{ class: `text-white` }"
    >
      <v-img
        :src="iconBag"
        cover
        class="tw-aspect-[111/122] tw-w-300 !tw-max-w-[55%]"
      />
    </div>
    <div
      class="bottom-icon tw-aspect-[231/170] tw-grow tw-relative"
      v-ripple="{ class: `text-white` }"
    >
      <v-img
        :src="iconJackpot"
        cover
        class="tw-aspect-[192/95] tw-w-300 !tw-max-w-[90%]"
      />
    </div>
    <div
      class="bottom-icon tw-aspect-[207/170] tw-w-[19%]"
      v-ripple="{ class: `text-white` }"
    >
      <v-img
        :src="iconDaily"
        cover
        class="tw-aspect-[77/112] tw-w-300 !tw-max-w-[40%]"
      />
    </div>
    <div
      class="bottom-icon tw-aspect-[202/170] tw-w-[19%]"
      v-ripple="{ class: `text-white` }"
    >
      <v-img
        :src="iconRef"
        cover
        class="tw-aspect-[115/76] tw-w-300 !tw-max-w-[50%]"
      />
    </div>
  </div>
</template>

<style lang="postcss">
.bottom-icon {
  @apply !tw-bg-transparent !tw-h-full tw-relative tw-rounded-none tw-flex tw-justify-center tw-items-center;
  &::before {
    content: "";
    @apply tw-block tw-w-[3px] tw-h-full tw-bg-[#BB6024] tw-absolute tw-right-0 tw-top-0 last:tw-hidden;
  }
  & > .v-btn\_\_content {
    @apply tw-w-96 tw-max-w-[95%] tw-h-auto;
  }
}
</style>
