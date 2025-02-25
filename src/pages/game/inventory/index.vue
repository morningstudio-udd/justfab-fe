<script setup>
import gbGame from "@images/game/bg-game-2.png";
import gameBgInventory from "@images/game/bg-game-inventory.png";
import bgBar1 from "@images/game/bar-1.png";
import btnAddInventory from "@images/game/btn-add-inventory.png";
import bgSlot from "@images/game/bg-slot-inventory.png";
import btnByQuality from "@images/game/btn-by-quality.png";
import btnMerge from "@images/game/btn-merge.png";
import kapybara from "@images/game/kapybara-inventory.png";
import hpIndex from "@images/game/hp-index.png";
import defenseIndex from "@images/game/defense-index.png";
import attackIndex from "@images/game/attack-index.png";
import btnFeed from "@images/game/btn-feed.png";
import bgLayer1 from "@images/game/bg-layer-1.png";
import bgRibbon from "@images/game/bg-ribbon.png";
import slot1 from "@images/game/slot-1.png";
import slot2 from "@images/game/slot-2.png";
import slot3 from "@images/game/slot-3.png";
import slot4 from "@images/game/slot-4.png";
import slot5 from "@images/game/slot-5.png";
import slot6 from "@images/game/slot-6.png";
import food from "@images/game/food.svg";
import voucher from "@images/game/voucher.png";
import rarityMythic from "@images/game/rarity-mythic.png";
import { watch } from "vue";

definePage({
  meta: {
    layout: "game",
    requiresAuth: true,
    subject: "User",
    action: "read",
  },
});

let resizeObserver = null;

const route = useRoute();
const userStore = useUserStore();
const adminStore = useAdminStore();
const authStore = useAuthStore();
const gameStore = useGameStore();

const inventoryData = ref();
const foodSvgRef = ref();
const foodBarSvgRef = ref();
const itemsContainerRef = ref();
const itemsContainerWidth = ref(0);
const itemsContainerHeight = ref(0);
const voucherSvgRef = ref();
const unclaimRewards = ref([]);
// const itemsContainerGapX = ref(0);
// const itemsContainerGapY = ref(0);
// const itemsContainerPaddingX = ref(0);
// const itemsContainerPaddingY = ref(0);
const lastHeight = ref(0);

const userInventory = computed(() => inventoryData.value?.items);
const fontSizeBase = computed(() => gameStore.baseFontSize);
const itemsContainerGapX = computed(() =>
  Math.round(itemsContainerWidth.value * 0.05)
);
const itemsContainerGapY = computed(() =>
  Math.round(itemsContainerHeight.value * 0.1)
);
const itemsContainerPaddingX = computed(() =>
  Math.round(itemsContainerWidth.value * 0.05)
);
const itemsContainerPaddingY = computed(() =>
  Math.round(itemsContainerHeight.value * 0.1)
);
const hasPoolPercentage = computed(() => {
  if (!unclaimRewards.value) return false;
  return unclaimRewards.value.find(
    (reward) => reward.reward.type === REWARD_TYPES.POOL_PERCENTAGE
  );
});

// const updateSize = (entries) => {
//   requestAnimationFrame(() => {
//     for (let entry of entries) {
//       const newWidth = Math.round(entry.contentRect.width);
//       const newHeight = Math.round(entry.contentRect.height);

//       if (
//         newWidth !== itemsContainerWidth.value ||
//         Math.abs(newHeight - lastHeight.value) > 5
//       ) {
//         itemsContainerWidth.value = newWidth;
//         itemsContainerHeight.value = newHeight;
//         lastHeight.value = newHeight;

//         nextTick(() => {
//           console.log(
//             "Updated itemsContainerHeight:",
//             itemsContainerHeight.value
//           );
//         });
//       }
//     }
//   });
// };

const { observe } = useMixin();

const handleResize = (newWidth, newHeight) => {
  if (
    newWidth !== itemsContainerWidth.value ||
    Math.abs(newHeight - lastHeight.value) > 5
  ) {
    itemsContainerWidth.value = newWidth;
    itemsContainerHeight.value = newHeight;
    lastHeight.value = newHeight;
  }
};

onMounted(async () => {
  // if (itemsContainerRef.value) {
  //   resizeObserver = new ResizeObserver(updateSize);
  //   resizeObserver.observe(itemsContainerRef.value);
  // }
  if (itemsContainerRef.value) {
    observe(itemsContainerRef.value, handleResize);
  }

  const p1 = getInventory();

  const p2 = getUserInfo();

  const p3 = getUnclaim();

  await Promise.all([p1, p2, p3]);
});

// onUnmounted(() => {
//   if (resizeObserver) {
//     resizeObserver.disconnect();
//   }
// });

const getInventory = async () => {
  try {
    const response = await getUserInventory(userStore.userData?._id);
    inventoryData.value = response;
  } catch (error) {
    console.error(error);
  }
};

const getUnclaim = async () => {
  try {
    const response = await getUnclaimedRewards();
    unclaimRewards.value = response;
  } catch (error) {
    console.error(error);
  }
};

const submitByQuality = () => {
  console.log("submitByQuality");
};

const submitMerge = () => {
  console.log("submitMerge");
};
</script>

<template>
  <div class="game-content tw-flex-grow tw-flex tw-flex-col">
    <!-- <div class="tw-flex tw-flex-col tw-h-full"> -->
    <div
      class="tw-aspect-[1080/932] tw-w-ful tw-flex tw-flex-col tw-bg-cover tw-bg-center tw-bg-no-repeat tw-relative"
      :style="{ backgroundImage: `url(${gameBgInventory})` }"
    >
      <div class="tw-w-full tw-flex-grow tw-items-start tw-px-[12%] tw-pt-[1%]">
        <div
          class="tw-h-full tw-grid tw-grid-cols-4 tw-grid-rows-3 tw-gap-x-[4%] tw-gap-y-[6%]"
        >
          <div
            class="tw-aspect-square tw-w-full tw-bg-cover tw-bg-center tw-bg-no-repeat tw-relative tw-flex tw-justify-center tw-items-center roll-in-left"
            :style="{ backgroundImage: `url(${slot1})` }"
          ></div>
          <div class="tw-col-span-2 tw-row-span-3">
            <div
              class="tw-aspect-[274/91] tw-w-3/4 tw-mx-auto tw-mt-[4%] tw-bg-cover tw-bg-center tw-bg-no-repeat tw-relative tw-flex tw-justify-center tw-items-center"
              :style="{ backgroundImage: `url(${bgRibbon})` }"
            ></div>

            <div
              class="tw-aspect-[371/417] tw-w-full -tw-ml-[8%] tw-mt-[13%] tw-bg-cover tw-bg-center tw-bg-no-repeat tw-relative tw-flex tw-justify-center tw-items-center bounce-in-top"
              :style="{ backgroundImage: `url(${kapybara})` }"
            ></div>
          </div>
          <div
            class="tw-aspect-square tw-w-full tw-bg-cover tw-bg-center tw-bg-no-repeat tw-relative tw-flex tw-justify-center tw-items-center roll-in-right"
            :style="{ backgroundImage: `url(${slot2})` }"
          ></div>
          <div
            class="tw-aspect-square tw-w-full tw-bg-cover tw-bg-center tw-bg-no-repeat tw-relative tw-flex tw-justify-center tw-items-center roll-in-left"
            :style="{ backgroundImage: `url(${slot3})` }"
          ></div>
          <div
            class="tw-aspect-square tw-w-full tw-bg-cover tw-bg-center tw-bg-no-repeat tw-relative tw-flex tw-justify-center tw-items-center roll-in-right"
            :style="{ backgroundImage: `url(${slot4})` }"
          ></div>
          <div
            class="tw-aspect-square tw-w-full tw-bg-cover tw-bg-center tw-bg-no-repeat tw-relative tw-flex tw-justify-center tw-items-center roll-in-left"
            :style="{ backgroundImage: `url(${slot5})` }"
          ></div>
          <div
            class="tw-aspect-square tw-w-full tw-bg-cover tw-bg-center tw-bg-no-repeat tw-relative tw-flex tw-justify-center tw-items-center roll-in-right"
            :style="{ backgroundImage: `url(${slot6})` }"
          ></div>
        </div>
      </div>

      <div
        class="tw-w-full tw-grid tw-items-center tw-grid-cols-3 tw-px-[4%] tw-aspect-[1080/100] -tw-mb-[2%]"
      >
        <!-- <div class=""></div>

        <div class="">
          <div
            class="tw-aspect-[260/64] tw-w-[78%] tw-bg-contain tw-bg-bottom tw-bg-no-repeat tw-relative tw-rounded-md tw-mx-auto"
            :style="{ backgroundImage: `url(${bgLayer1})` }"
          ></div>
        </div>

        <div class="tw-text-right">
          <v-btn
            flat
            color="transparent"
            class="tw-aspect-[179/100] tw-w-[54%] !tw-h-auto tw-bg-cover tw-bg-bottom tw-bg-no-repeat tw-relative tw-rounded-[10%]"
            :style="{ backgroundImage: `url(${btnFeed})` }"
          ></v-btn>
        </div> -->
      </div>

      <div
        class="tw-w-full tw-aspect-[1080/100] tw-flex tw-justify-center tw-items-center"
      >
        <div
          class="tw-aspect-[282/116] tw-w-[26%] tw-bg-contain tw-bg-bottom tw-bg-no-repeat tw-relative tw-rounded-md disable-element tw-flex tw-justify-center tw-items-center tw-pt-[2%] tw-pl-[2%]"
          :style="{ backgroundImage: `url(${hpIndex})` }"
        >
          ???
        </div>
        <div
          class="tw-aspect-[282/116] tw-w-[26%] tw-bg-contain tw-bg-bottom tw-bg-no-repeat tw-relative tw-rounded-md disable-element tw-flex tw-justify-center tw-items-center tw-pt-[2%] tw-pl-[2%]"
          :style="{ backgroundImage: `url(${defenseIndex})` }"
        >
          ???
        </div>
        <div
          class="tw-aspect-[284/116] tw-w-[26%] tw-bg-contain tw-bg-bottom tw-bg-no-repeat tw-relative tw-rounded-md disable-element tw-flex tw-justify-center tw-items-center tw-pt-[2%] tw-pl-[2%]"
          :style="{ backgroundImage: `url(${attackIndex})` }"
        >
          ???
        </div>
      </div>

      <div
        class="tw-w-full tw-aspect-[1080/100] tw-flex tw-justify-between tw-items-center tw-px-[4%] -tw-mb-[0.5%]"
      >
        <v-btn
          flat
          color="transparent"
          class="tw-aspect-[213/76] tw-w-[21.4%] !tw-h-auto tw-bg-contain tw-bg-center tw-bg-no-repeat tw-relative tw-rounded-md disable-element"
          :style="{ backgroundImage: `url(${btnByQuality})` }"
          @click.stop="submitByQuality"
        ></v-btn>

        <v-btn
          flat
          color="transparent"
          class="tw-aspect-[214/76] tw-w-[21.5%] !tw-h-auto tw-bg-contain tw-bg-center tw-bg-no-repeat tw-relative tw-rounded-md disable-element"
          :style="{ backgroundImage: `url(${btnMerge})` }"
          @click.stop="submitMerge"
        ></v-btn>
      </div>
    </div>

    <div
      ref="itemsContainerRef"
      class="tw-bg-[#23212e] tw-aspect-[1080/420] tw-flex-auto tw-w-full tw-max-w-screen tw-box-border tw-overflow-y-scroll tw-px-[5%]"
      :style="{
        'padding-top': `${itemsContainerPaddingY}px`,
        'padding-bottom': `${itemsContainerPaddingY}px`,
        'padding-left': `${itemsContainerPaddingX}px`,
        'padding-right': `${itemsContainerPaddingX}px`,
      }"
    >
      <!-- <div
      ref="itemsContainerRef"
      class="tw-bg-[#23212e] tw-aspect-[1080/420] tw-flex-auto tw-w-full tw-max-w-screen tw-box-border tw-overflow-y-scroll tw-px-[5%]"
    > -->
      <div
        class="tw-grid tw-grid-cols-4"
        :style="{
          'row-gap': `${itemsContainerGapX}px`,
          'column-gap': `${itemsContainerGapY}px`,
        }"
      >
        <div
          class="tw-aspect-[178/178] tw-w-full tw-bg-cover tw-bg-center tw-bg-no-repeat tw-relative tw-flex tw-justify-center tw-items-center"
          :style="{ backgroundImage: `url(${bgSlot})` }"
        >
          <v-img :src="food" class="!tw-max-w-[60%] tw-w-full tw-h-auto" />

          <svg
            viewBox="0 0 50 50"
            xmlns="http://www.w3.org/2000/svg"
            class="tw-w-full tw-h-full tw-absolute"
            ref="foodSvgRef"
          >
            <text
              x="80%"
              y="75%"
              dominant-baseline="middle"
              text-anchor="end"
              font-family="DynaPuff"
              :font-size="`${gameStore.setFontSizeBasedOnViewBox(
                foodSvgRef,
                15
              )}px`"
              font-weight="700"
              fill="#fff"
              stroke="#000000"
              stroke-width="1.5"
              paint-order="stroke fill"
              text-overflow="ellipsis"
              white-space="nowrap"
              overflow="hidden"
              width="100%"
            >
              {{ userStore.userData?.food || 0 }}
            </text>
          </svg>
        </div>

        <div
          class="tw-aspect-[178/178] tw-w-full tw-bg-cover tw-bg-center tw-bg-no-repeat tw-relative tw-flex tw-justify-center tw-items-center"
          :style="{ backgroundImage: `url(${rarityMythic})` }"
          v-if="hasPoolPercentage"
        >
          <v-img :src="voucher" class="!tw-max-w-[70%] tw-w-full tw-h-auto" />

          <svg
            viewBox="0 0 50 50"
            xmlns="http://www.w3.org/2000/svg"
            class="tw-w-full tw-h-full tw-absolute"
            ref="voucherSvgRef"
          >
            <text
              x="80%"
              y="75%"
              dominant-baseline="middle"
              text-anchor="end"
              font-family="DynaPuff"
              :font-size="`${gameStore.setFontSizeBasedOnViewBox(
                voucherSvgRef,
                15
              )}px`"
              font-weight="700"
              fill="#fff"
              stroke="#000000"
              stroke-width="1.5"
              paint-order="stroke fill"
              text-overflow="ellipsis"
              white-space="nowrap"
              overflow="hidden"
              width="100%"
            >
              0.001%
            </text>
          </svg>
        </div>

        <div
          v-if="userInventory && userInventory.length"
          v-for="item in userInventory"
          :key="item._id"
          class="tw-aspect-[178/178] tw-w-full tw-bg-cover tw-bg-center tw-bg-no-repeat tw-relative tw-flex tw-justify-center tw-items-center"
          :style="{
            backgroundImage: `url(${
              ITEM_RARITIES[item.item?.rarity].background
            })`,
          }"
        >
          <v-img
            :src="srcAsset(item.item?.photoUrl)"
            class="!tw-max-w-[75%] tw-w-full tw-h-auto"
          />
        </div>

        <div class="tw-col-span-full tw-h-[0.1vh]"></div>
      </div>
    </div>

    <div
      class="tw-w-full tw-aspect-[1080/145] tw-flex tw-justify-center tw-items-center tw-px-[6%] tw-gap-[4%]"
      :style="{ backgroundImage: `url(${bgBar1})` }"
    >
      <!-- <v-btn
        color="transparent"
        class="tw-aspect-[326/113] tw-w-[30%] !tw-h-auto tw-bg-cover tw-bg-center tw-bg-no-repeat tw-relative tw-rounded-md"
        :style="{ backgroundImage: `url(${btnAddInventory})` }"
      ></v-btn> -->
      <v-progress-linear
        color="#91F8FD"
        bg-color="#000"
        bg-opacity="0.6"
        model-value="100"
        rounded="0"
        class="foodbar !tw-h-[60%] disable-element"
      >
        <svg
          viewBox="0 0 80 40"
          xmlns="http://www.w3.org/2000/svg"
          class="tw-h-full"
          ref="foodBarSvgRef"
        >
          <text
            x="50%"
            y="50%"
            dominant-baseline="middle"
            text-anchor="middle"
            font-family="DynaPuff"
            :font-size="`${gameStore.setFontSizeBasedOnViewBox(
              foodBarSvgRef,
              50
            )}px`"
            font-weight="700"
            fill="#fff"
            stroke="#000000"
            stroke-width="3"
            paint-order="stroke fill"
            text-overflow="ellipsis"
            white-space="nowrap"
            overflow="hidden"
            width="100%"
          >
            ???
          </text>
        </svg>
      </v-progress-linear>

      <v-btn
        flat
        color="transparent"
        class="tw-aspect-[179/100] tw-w-[19%] !tw-h-auto tw-bg-cover tw-bg-bottom tw-bg-no-repeat tw-relative tw-rounded-[10%] disable-element"
        :style="{ backgroundImage: `url(${btnFeed})` }"
      ></v-btn>
    </div>
    <!-- </div> -->
  </div>
</template>

<style lang="postcss">
.foodbar {
  @apply tw-border-solid tw-border-[#FFFFFF];
  border-width: clamp(1.5px, 1.5vw, 2px);
  .v-progress-linear\_\_determinate {
    @apply tw-h-full;
    box-shadow: inset 0 0 0 clamp(1.5px, 1.5vw, 2px) #12a6d4;
  }
}
</style>
