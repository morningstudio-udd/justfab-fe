<script setup>
import bgCoin from "@images/game/bg-coin.png";
import bgGold from "@images/game/bg-gold.png";
import bgAvt from "@images/game/bg-avt.png";

const userStore = useUserStore();
const gameStore = useGameStore();

const currentGold = ref(userStore.userData?.gold || 0);
const currentCoin = ref(userStore.userData?.token || 0);
const goldSvgRef = ref(null);
const coinSvgRef = ref(null);
const nameSvgRef = ref(null);
const expSvgRef = ref(null);

const displayName = computed(() =>
  truncateString(userStore.userData?.displayName)
);

watch(
  () => userStore.userData?.gold,
  (newGold, oldGold) => {
    console.log("newGold, oldGold", newGold, oldGold);
    if (newGold !== oldGold) {
      console.log("newGold !== oldGold");
      animateCounter(oldGold, newGold, 1000, (currentValue) => {
        currentGold.value = currentValue;
      });
    }
  }
);

watch(
  () => userStore.userData?.token,
  (newCoin, oldCoin) => {
    console.log("newCoin, oldCoin", newCoin, oldCoin);
    if (newCoin !== oldCoin) {
      console.log("newCoin !== oldCoin");
      animateCounter(oldCoin, newCoin, 1000, (currentValue) => {
        currentCoin.value = currentValue;
      });
    }
  }
);
</script>

<template>
  <div class="top-bar tw-flex tw-items-start tw-px-1 tw-pt-1 tw-z-10">
    <div
      class="top-icon tw-mr-[1%] tw-w-[41.2%] tw-aspect-[446/218] tw-bg-contain tw-bg-center tw-bg-no-repeat tw-relative"
      :style="{ backgroundImage: `url(${bgAvt})` }"
    >
      <div
        class="username tw-font-bold tw-text-white tw-absolute tw-top-[30%] -tw-translate-y-[30%] tw-left-0 tw-right-0 tw-ml-[50%] tw-line-clamp-1 tw-overflow-hidden tw-text-ellipsis"
      >
        <svg
          viewBox="0 0 68 15"
          xmlns="http://www.w3.org/2000/svg"
          class="tw-w-full tw-h-full"
          ref="nameSvgRef"
        >
          <text
            x="1%"
            y="50%"
            dominant-baseline="middle"
            text-anchor="start"
            font-family="DynaPuff"
            :font-size="`${gameStore.setFontSizeBasedOnViewBox(
              nameSvgRef,
              60
            )}px`"
            font-weight="700"
            padding-left="1%"
            fill="#fff"
            stroke="#000"
            stroke-width="1.8"
            paint-order="stroke fill"
            text-overflow="ellipsis"
            white-space="nowrap"
            overflow="hidden"
            width="100%"
          >
            {{ displayName }}
          </text>
        </svg>
      </div>

      <div
        class="tw-font-bold tw-text-white tw-absolute tw-top-[60%] -tw-translate-y-[60%] tw-left-0 tw-right-0 tw-text-center tw-ml-[50%] tw-flex tw-justify-center tw-items-center"
      >
        <svg
          viewBox="0 0 68 18"
          xmlns="http://www.w3.org/2000/svg"
          class="tw-w-full tw-h-full"
          ref="expSvgRef"
        >
          <text
            x="50%"
            y="50%"
            dominant-baseline="middle"
            text-anchor="middle"
            font-family="DynaPuff"
            :font-size="`${gameStore.setFontSizeBasedOnViewBox(
              expSvgRef,
              60
            )}px`"
            font-weight="700"
            fill="#fff"
            stroke="#000"
            stroke-width="1.8"
            paint-order="stroke fill"
          >
            ???
          </text>
        </svg>
      </div>
    </div>

    <div
      class="top-icon tw-mr-[4%] tw-mt-[2%] tw-w-[25%] tw-aspect-[269/104] tw-bg-contain tw-bg-center tw-bg-no-repeat tw-relative"
      :style="{ backgroundImage: `url(${bgGold})` }"
    >
      <div
        class="tw-font-bold tw-text-white tw-absolute tw-top-[50%] -tw-translate-y-1/2 tw-left-0 tw-right-0 tw-text-center tw-ml-[37%] -tw-mt-[1%] tw-flex tw-justify-center tw-items-center"
      >
        <svg
          viewBox="0 0 68 23"
          xmlns="http://www.w3.org/2000/svg"
          class="tw-w-full tw-h-full"
          ref="goldSvgRef"
        >
          <text
            x="50%"
            y="50%"
            dominant-baseline="middle"
            text-anchor="middle"
            font-family="DynaPuff"
            :font-size="`${gameStore.setFontSizeBasedOnViewBox(
              goldSvgRef,
              60
            )}px`"
            font-weight="700"
            fill="#fff"
            stroke="#000"
            stroke-width="1.8"
            paint-order="stroke fill"
          >
            {{ currentGold }}
          </text>
        </svg>
      </div>
    </div>
    <div
      class="top-icon tw-mt-[2%] tw-w-[24.1%] tw-aspect-[261/100] tw-bg-contain tw-bg-center tw-bg-no-repeat tw-relative"
      :style="{ backgroundImage: `url(${bgCoin})` }"
    >
      <div
        class="tw-font-bold tw-text-white tw-absolute tw-top-[50%] -tw-translate-y-1/2 tw-left-0 tw-right-0 tw-text-center tw-ml-[37%] tw-mt-[1%] tw-flex tw-justify-center tw-items-center"
      >
        <svg
          viewBox="0 0 68 25"
          xmlns="http://www.w3.org/2000/svg"
          class="tw-w-full tw-h-full"
          ref="coinSvgRef"
        >
          <text
            x="50%"
            y="50%"
            dominant-baseline="middle"
            text-anchor="middle"
            font-family="DynaPuff"
            :font-size="`${gameStore.setFontSizeBasedOnViewBox(
              coinSvgRef,
              60
            )}px`"
            font-weight="700"
            fill="#fff"
            stroke="#000"
            stroke-width="1.8"
            paint-order="stroke fill"
          >
            {{ currentCoin }}
          </text>
        </svg>
      </div>
    </div>
  </div>
</template>
