<script setup>
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

definePage({
  meta: {
    layout: "blank",
    public: true,
  },
});

const userStore = useUserStore();
const adminStore = useAdminStore();

const inventoryData = ref();

const userInventory = computed(() => inventoryData.value.items);

onMounted(async () => {
  await getInventory();
});

const getInventory = async () => {
  try {
    const p1 = getUserInventory(userStore.userData?._id).then(
      (response) => (inventoryData.value = response)
    );

    const p2 = getAllItems().then((response) => {
      adminStore.allItems = response.data;
    });

    await Promise.all([p1, p2]);
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div
    class="tw-bg-[#86C7E5] tw-w-screen tw-h-screen tw-flex tw-items-center tw-justify-center"
  >
    <div
      class="game-container tw-w-auto tw-h-[1920px] tw-aspect-[1080/1920] tw-max-w-[100vw] tw-max-h-[100vh] tw-bg-[#D9D9D9] tw-bg-cover tw-bg-center tw-bg-no-repeat tw-flex tw-flex-col tw-relative"
      :style="{ backgroundImage: `url(${gameBgInventory})` }"
    >
      <v-img
        :src="kapybara"
        class="!tw-absolute tw-top-0 tw-left-0 tw-w-full tw-h-full"
      />

      <!-- Top Icons -->
      <top-bar />

      <div class="tw-flex-grow">
        <div class="tw-flex tw-flex-col tw-h-full">
          <div class="tw-flex-grow">
            <div
              class="tw-w-full tw-flex tw-justify-between tw-items-start tw-px-[14%]"
            >
              <div class="tw-w-1/3 tw-grid tw-grid-rows-3 tw-gap-[20%]">
                <div
                  class="tw-aspect-[177/178] tw-w-[68%] tw-bg-cover tw-bg-center tw-bg-no-repeat tw-relative tw-flex tw-justify-center tw-items-center"
                  :style="{ backgroundImage: `url(${slot1})` }"
                ></div>

                <div
                  class="tw-aspect-[177/178] tw-w-[68%] tw-bg-cover tw-bg-center tw-bg-no-repeat tw-relative tw-flex tw-justify-center tw-items-center"
                  :style="{ backgroundImage: `url(${slot3})` }"
                ></div>

                <div
                  class="tw-aspect-[177/178] tw-w-[68%] tw-bg-cover tw-bg-center tw-bg-no-repeat tw-relative tw-flex tw-justify-center tw-items-center"
                  :style="{ backgroundImage: `url(${slot5})` }"
                ></div>
              </div>

              <div class="tw-w-1/3">
                <div
                  class="tw-aspect-[274/91] tw-w-full tw-bg-cover tw-bg-center tw-bg-no-repeat tw-relative tw-flex tw-justify-center tw-items-center"
                  :style="{ backgroundImage: `url(${bgRibbon})` }"
                ></div>
              </div>

              <div class="tw-w-1/3 tw-grid tw-grid-rows-3 tw-gap-[20%]">
                <div
                  class="tw-aspect-[177/178] tw-w-[68%] tw-bg-cover tw-bg-center tw-bg-no-repeat tw-relative tw-flex tw-justify-center tw-items-center tw-ml-auto"
                  :style="{ backgroundImage: `url(${slot2})` }"
                ></div>

                <div
                  class="tw-aspect-[177/178] tw-w-[68%] tw-bg-cover tw-bg-center tw-bg-no-repeat tw-relative tw-flex tw-justify-center tw-items-center tw-ml-auto"
                  :style="{ backgroundImage: `url(${slot4})` }"
                ></div>

                <div
                  class="tw-aspect-[177/178] tw-w-[68%] tw-bg-cover tw-bg-center tw-bg-no-repeat tw-relative tw-flex tw-justify-center tw-items-center tw-ml-auto"
                  :style="{ backgroundImage: `url(${slot6})` }"
                ></div>
              </div>
            </div>
          </div>

          <div
            class="tw-w-full tw-flex tw-justify-between tw-items-center tw-px-[4%] tw-aspect-[1080/100] -tw-mb-[2%]"
          >
            <div class="tw-w-1/3"></div>

            <div class="tw-w-1/3">
              <div
                class="tw-aspect-[260/64] tw-w-[78%] tw-bg-contain tw-bg-bottom tw-bg-no-repeat tw-relative tw-rounded-md tw-mx-auto"
                :style="{ backgroundImage: `url(${bgLayer1})` }"
              ></div>
            </div>

            <div class="tw-w-1/3">
              <div
                class="tw-aspect-[179/100] tw-w-[54%] tw-bg-contain tw-bg-bottom tw-bg-no-repeat tw-relative tw-rounded-md tw-ml-auto"
                :style="{ backgroundImage: `url(${btnFeed})` }"
              ></div>
            </div>
          </div>

          <div
            class="tw-w-full tw-aspect-[1080/100] tw-flex tw-justify-center tw-items-center -tw-mb-[1%]"
          >
            <div
              class="tw-aspect-[282/116] tw-w-[26%] tw-bg-contain tw-bg-bottom tw-bg-no-repeat tw-relative tw-rounded-md"
              :style="{ backgroundImage: `url(${hpIndex})` }"
            ></div>
            <div
              class="tw-aspect-[282/116] tw-w-[26%] tw-bg-contain tw-bg-bottom tw-bg-no-repeat tw-relative tw-rounded-md"
              :style="{ backgroundImage: `url(${defenseIndex})` }"
            ></div>
            <div
              class="tw-aspect-[284/116] tw-w-[26%] tw-bg-contain tw-bg-bottom tw-bg-no-repeat tw-relative tw-rounded-md"
              :style="{ backgroundImage: `url(${attackIndex})` }"
            ></div>
          </div>

          <div
            class="tw-w-full tw-aspect-[1080/100] tw-flex tw-justify-between tw-items-center tw-px-[4%]"
          >
            <v-btn
              color="transparent"
              class="tw-aspect-[213/76] !tw-h-[70%] tw-bg-contain tw-bg-center tw-bg-no-repeat tw-relative tw-rounded-md"
              :style="{ backgroundImage: `url(${btnByQuality})` }"
            ></v-btn>

            <v-btn
              color="transparent"
              class="tw-aspect-[214/76] !tw-h-[70%] tw-bg-contain tw-bg-center tw-bg-no-repeat tw-relative tw-rounded-md"
              :style="{ backgroundImage: `url(${btnMerge})` }"
            ></v-btn>
          </div>

          <div
            class="tw-w-full tw-aspect-[1080/485] tw-grid tw-grid-cols-4 tw-gap-[10%] tw-px-[8%] tw-py-[5%] tw-overflow-y-scroll"
          >
            <div
              v-for="item in adminStore.allItems"
              :key="item._id"
              class="tw-aspect-[177/178] tw-bg-cover tw-bg-center tw-bg-no-repeat tw-relative tw-flex tw-justify-center tw-items-center"
              :style="{ backgroundImage: `url(${bgSlot})` }"
            >
              <v-img
                :src="srcAsset(item.photoUrl)"
                class="!tw-max-w-[75%] tw-w-full tw-h-auto"
              />
            </div>
          </div>

          <div
            class="tw-w-full tw-aspect-[1080/148] tw-flex tw-justify-center tw-items-center"
            :style="{ backgroundImage: `url(${bgBar1})` }"
          >
            <v-btn
              color="transparent"
              class="tw-aspect-[326/113] tw-w-[30%] !tw-h-auto tw-bg-cover tw-bg-center tw-bg-no-repeat tw-relative tw-rounded-md"
              :style="{ backgroundImage: `url(${btnAddInventory})` }"
            ></v-btn>
          </div>
        </div>
      </div>

      <!-- Bottom Icons -->
      <bottom-bar />
    </div>
  </div>
</template>
