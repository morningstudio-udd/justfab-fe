<script setup>
import bgBottomBar from "@images/game/bg-bottom-bar.png";
import bgBottomBar2 from "@images/game/bg-bottom-bar-2.png";
import iconJackpot from "@images/game/icon-jackpot.png";
import iconTreasure from "@images/game/icon-treasure.png";
import iconBag from "@images/game/icon-bag.png";
import iconDaily from "@images/game/icon-daily.png";
import iconRef from "@images/game/icon-ref.png";
import lock from "@images/game/lock.svg";

const navItems = ref([
  {
    to: "/game/connect-wallet",
    icon: iconTreasure,
    class: "tw-aspect-[232/170] tw-w-[19%]",
    imgClass: "!tw-max-w-[50%]",
    isLocked: true,
  },
  {
    to: "/game/inventory",
    icon: iconBag,
    class: "tw-aspect-[209/170] tw-w-[19%]",
    imgClass: "!tw-max-w-[55%]",
  },
  {
    to: "/game/jackpot",
    icon: iconJackpot,
    class: "tw-aspect-[231/170] tw-grow",
    imgClass: "!tw-max-w-[90%]",
  },
  {
    to: "/game/daily",
    icon: iconDaily,
    class: "tw-aspect-[207/170] tw-w-[19%]",
    imgClass: "!tw-max-w-[40%]",
  },
  {
    to: "/game/referral",
    icon: iconRef,
    class: "tw-aspect-[202/170] tw-w-[19%]",
    imgClass: "!tw-max-w-[50%]",
  },
]);
</script>

<template>
  <div
    class="bottom-bar tw-w-full tw-max-w-full tw-aspect-[1080/170] tw-flex tw-z-10"
    nav
  >
    <div
      v-for="(item, index) in navItems"
      :key="index"
      class="bottom-nav"
      :class="item.class"
      v-ripple="{ class: `text-white` }"
    >
      <span v-if="item.isLocked">
        <div
          class="nav-item tw-bg-left tw-bg-[auto_100%] tw-bg-repeat-x tw-w-full tw-h-full tw-relative tw-flex tw-justify-center tw-items-center"
          :style="{ backgroundImage: `url(${bgBottomBar2})` }"
          :class="{ 'nav-locked': item.isLocked }"
        >
          <v-img
            :src="item.icon"
            cover
            class="tw-w-300"
            :class="item.imgClass"
          />
        </div>

        <!-- <v-img :src="lock" cover class="locked-icon" v-if="item.isLocked" /> -->
      </span>

      <router-link
        :to="item.to"
        :exact-active-class="`bottom-nav-active`"
        v-else
      >
        <div
          class="nav-item tw-bg-left tw-bg-[auto_100%] tw-bg-repeat-x tw-w-full tw-h-full tw-relative tw-flex tw-justify-center tw-items-center"
          :style="{ backgroundImage: `url(${bgBottomBar2})` }"
          :class="{ 'nav-locked': item.isLocked }"
        >
          <v-img
            :src="item.icon"
            cover
            class="tw-w-300"
            :class="item.imgClass"
          />
        </div>

        <!-- <v-img :src="lock" cover class="locked-icon" v-if="item.isLocked" /> -->
      </router-link>
    </div>
    <!-- <div
      class="bottom-nav tw-aspect-[232/170] tw-w-[19%]"
      v-ripple="{ class: `text-white` }"
    >
      <router-link to="/game/test">
        <div
          class="nav-item tw-bg-left tw-bg-[auto_100%] tw-bg-repeat-x tw-w-full tw-h-full tw-relative tw-flex tw-justify-center tw-items-center"
          :style="{ backgroundImage: `url(${bgBottomBar2})` }"
        >
          <v-img
            :src="iconTreasure"
            cover
            class="tw-aspect-[114/102] tw-w-300 !tw-max-w-[50%]"
          />
        </div>
      </router-link>
    </div>
    <div
      class="bottom-nav tw-aspect-[209/170] tw-w-[19%]"
      v-ripple="{ class: `text-white` }"
    >
      <router-link to="/game/inventory">
        <div
          class="nav-item tw-bg-left tw-bg-[auto_100%] tw-bg-repeat-x tw-w-full tw-h-full tw-relative tw-flex tw-justify-center tw-items-center"
          :style="{ backgroundImage: `url(${bgBottomBar2})` }"
        >
          <v-img
            :src="iconBag"
            cover
            class="tw-aspect-[111/122] tw-w-300 !tw-max-w-[55%]"
          />
        </div>
      </router-link>
    </div>
    <div
      class="bottom-nav tw-aspect-[231/170] tw-grow tw-relative"
      v-ripple="{ class: `text-white` }"
    >
      <router-link to="/game/jackpot">
        <div
          class="nav-item tw-bg-left tw-bg-[auto_100%] tw-bg-repeat-x tw-w-full tw-h-full tw-relative tw-flex tw-justify-center tw-items-center"
          :style="{ backgroundImage: `url(${bgBottomBar2})` }"
        >
          <v-img
            :src="iconJackpot"
            cover
            class="tw-aspect-[192/95] tw-w-300 !tw-max-w-[90%]"
          />
        </div>
      </router-link>
    </div>
    <div
      class="bottom-nav tw-aspect-[207/170] tw-w-[19%]"
      v-ripple="{ class: `text-white` }"
    >
      <router-link to="/game/daily">
        <div
          class="nav-item tw-bg-left tw-bg-[auto_100%] tw-bg-repeat-x tw-w-full tw-h-full tw-relative tw-flex tw-justify-center tw-items-center"
          :style="{ backgroundImage: `url(${bgBottomBar2})` }"
        >
          <v-img
            :src="iconDaily"
            cover
            class="tw-aspect-[77/112] tw-w-300 !tw-max-w-[40%]"
          />
        </div>
      </router-link>
    </div>
    <div
      class="bottom-nav tw-aspect-[202/170] tw-w-[19%]"
      v-ripple="{ class: `text-white` }"
    >
      <router-link to="/game/referral">
        <div
          class="nav-item tw-bg-left tw-bg-[auto_100%] tw-bg-repeat-x tw-w-full tw-h-full tw-relative tw-flex tw-justify-center tw-items-center"
          :style="{ backgroundImage: `url(${bgBottomBar2})` }"
        >
          <v-img
            :src="iconRef"
            cover
            class="tw-aspect-[115/76] tw-w-300 !tw-max-w-[50%]"
          />
        </div>
      </router-link>
    </div> -->
  </div>
</template>

<style lang="postcss">
.bottom-nav {
  .nav-item {
    @apply tw-border-0  tw-border-solid tw-border-[#BB6024];
    border-right-width: 0.4vh;
  }
  &:last-child {
    .nav-item {
      @apply tw-border-r-0;
    }
  }
  a {
    @apply tw-block tw-relative tw-w-full tw-h-full;

    .bottom-active {
      @apply tw-hidden;
    }
    &.bottom-nav-active {
      .nav-item {
        @apply tw-scale-110 tw-z-[1];
        border-left-width: 0.4vh;
        &::after {
          content: "";
          @apply tw-absolute tw-w-full tw-h-full tw-bg-[#FF6208]/50;
        }
      }
    }
  }
}

.nav-locked {
  filter: grayscale(100%);
}
.locked-icon {
  @apply !tw-absolute tw-right-1/2 tw-bottom-1/2  tw-w-[30%] tw-h-auto;
  transform: translate(-50%, -50%);
  filter: none;
  z-index: 1;
}
</style>
