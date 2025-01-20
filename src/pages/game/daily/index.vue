<script setup>
import gameBg from "@images/game/bg-game-2.png";
import inputDailyTask from "@images/game/input-daily-task.png";
import btnFab from "@images/game/btn-fab.png";
import btnNetwork from "@images/game/btn-network.png";
import btnFriend from "@images/game/btn-friend.png";
import bgGifts from "@images/game/bg-gifts.png";
import gift1 from "@images/game/gift-1.png";
import gift2 from "@images/game/gift-2.png";
import gift3 from "@images/game/gift-3.png";
import gift4 from "@images/game/gift-4.png";
import gift5 from "@images/game/gift-5.png";
import gift6 from "@images/game/gift-6.png";
import gift7 from "@images/game/gift-7.png";
import dailyReward from "@images/game/daily-reward.png";
import bgBoxTask from "@images/game/bg-box-task.png";
import iconCheckedIn from "@images/game/icon-checked-in.png";

definePage({
  meta: {
    layout: "blank",
    public: true,
  },
});

const isOpen = ref(false);

const submitFab = () => {
  console.log("submitFab");
};

const submitNetwork = () => {
  console.log("submitNetwork");
};

const submitFriend = () => {
  console.log("submitFriend");
};
</script>

<template>
  <div
    class="tw-bg-[#86C7E5] tw-w-screen tw-h-screen tw-flex tw-items-center tw-justify-center"
  >
    <div
      class="game-container tw-w-auto tw-h-[1920px] tw-aspect-[1080/1920] tw-max-w-full tw-max-h-screen tw-bg-[#D9D9D9] tw-bg-cover tw-bg-center tw-bg-no-repeat tw-flex tw-flex-col tw-relative"
      :style="{ backgroundImage: `url(${gameBg})` }"
    >
      <!-- Top Icons -->
      <top-bar />

      <div class="game-content tw-flex-auto tw-overflow-hidden">
        <div class="tw-flex tw-flex-col tw-h-full">
          <!-- <div class="-tw-mt-[2.4%]"> -->
          <div class="tw-aspect-[687/136] tw-w-[63.6%] tw-mx-auto">
            <v-img :src="dailyReward" />
          </div>
          <!-- </div> -->

          <div
            class="rewards-container tw-w-full tw-aspect-[1080/580] tw-bg-cover tw-bg-center tw-bg-no-repeat tw-grid tw-grid-cols-7 tw-grid-rows-2 tw-pl-[8.5%] tw-pr-[9.2%] tw-py-[2.5%] tw-gap-x-[4%] tw-gap-y-[8%]"
            :style="{ backgroundImage: `url(${bgGifts})` }"
          >
            <div
              class="tw-col-span-5 tw-row-span-1 tw-grid tw-grid-cols-3 tw-grid-rows-1 tw-gap-[5%]"
            >
              <div class="daily-gift">
                <div class="tw-aspect-[99/102] tw-w-1/2">
                  <v-img :src="gift1" />
                </div>

                <div class="icon-checked-in">
                  <v-img :src="iconCheckedIn" />
                </div>
              </div>

              <div class="daily-gift">
                <div class="tw-aspect-[99/102] tw-w-1/2">
                  <v-img :src="gift2" />
                </div>

                <div class="icon-checked-in">
                  <v-img :src="iconCheckedIn" />
                </div>
              </div>

              <div class="daily-gift">
                <div class="tw-aspect-[99/102] tw-w-1/2">
                  <v-img :src="gift3" />
                </div>

                <div class="icon-checked-in">
                  <v-img :src="iconCheckedIn" />
                </div>
              </div>
            </div>

            <div class="reward tw-row-span-2 tw-col-span-2">
              <div class="special-gift checked-in">
                <div class="tw-aspect-[169/176] tw-w-3/4">
                  <v-img :src="gift7" />
                </div>

                <div class="icon-checked-in">
                  <v-img :src="iconCheckedIn" />
                </div>
              </div>
            </div>

            <div
              class="tw-col-span-5 tw-row-span-1 tw-grid tw-grid-cols-3 tw-grid-rows-1 tw-gap-[5%]"
            >
              <div class="daily-gift">
                <div class="tw-aspect-[99/102] tw-w-1/2">
                  <v-img :src="gift4" />
                </div>

                <div class="icon-checked-in">
                  <v-img :src="iconCheckedIn" />
                </div>
              </div>

              <div class="daily-gift">
                <div class="tw-aspect-[99/102] tw-w-1/2">
                  <v-img :src="gift5" />
                </div>

                <div class="icon-checked-in">
                  <v-img :src="iconCheckedIn" />
                </div>
              </div>

              <div class="daily-gift">
                <div class="tw-aspect-[99/102] tw-w-1/2">
                  <v-img :src="gift6" />
                </div>

                <div class="icon-checked-in">
                  <v-img :src="iconCheckedIn" />
                </div>
              </div>
            </div>
          </div>

          <div
            class="tw-flex-auto tw-flex tw-flex-col tw-overflow-hidden tw-bg-[#c26828] tw-bg-[100%_auto] tw-bg-top tw-bg-no-repeat"
            :style="{ backgroundImage: `url(${bgBoxTask})` }"
          >
            <div class="tw-w-full tw-aspect-[1080/157]">
              <div class="tw-px-[8%] tw-w-full tw-h-full">
                <div
                  class="tw-w-full tw-h-full tw-flex tw-justify-between tw-items-center"
                >
                  <v-btn
                    color="transparent"
                    flat
                    class="tw-aspect-[220/97] tw-w-[24.2%] !tw-h-auto tw-min-w-0 tw-bg-cover tw-bg-bottom tw-bg-no-repeat tw-relative tw-rounded-[10%] tw-overflow-hidden"
                    :style="{ backgroundImage: `url(${btnFab})` }"
                    @click="submitFab"
                  ></v-btn>

                  <v-btn
                    color="transparent"
                    flat
                    class="tw-aspect-[318/97] tw-w-[35.1%] !tw-h-auto tw-min-w-0 tw-bg-cover tw-bg-bottom tw-bg-no-repeat tw-relative tw-rounded-[10%] tw-overflow-hidden"
                    :style="{ backgroundImage: `url(${btnNetwork})` }"
                    @click="submitNetwork"
                  ></v-btn>

                  <v-btn
                    color="transparent"
                    flat
                    class="tw-aspect-[220/97] tw-w-[24.2%] !tw-h-auto tw-min-w-0 tw-bg-cover tw-bg-bottom tw-bg-no-repeat tw-relative tw-rounded-[10%] tw-overflow-hidden"
                    :style="{ backgroundImage: `url(${btnFriend})` }"
                    @click="submitFriend"
                  ></v-btn>
                </div>
              </div>
            </div>

            <div
              class="tw-h-auto tw-max-h-full tw-overflow-y-scroll tw-px-[7%] tw-py-[5%] tw-flex tw-flex-col tw-gap-[1vh]"
            >
              <!-- <template v-for="number in 1">
                <v-select
                  variant="solo-filled"
                  height="auto"
                  class="task-select"
                  flat
                  bg-color="transparent"
                  :style="{ backgroundImage: `url(${inputDailyTask})` }"
                  :menu-icon="
                    isOpen
                      ? 'material-symbols-arrow-drop-down'
                      : 'material-symbols-arrow-right'
                  "
                  @update:menu="isOpen = $event"
                  density="compact"
                >
                </v-select>
              </template> -->

              <v-expansion-panels
                flat
                hide-actions
                multiple
                bg-color="transparent"
              >
                <template v-for="number in 12">
                  <v-expansion-panel class="daily-task">
                    <v-expansion-panel-title
                      static
                      collapse-icon="material-symbols-arrow-drop-down"
                      expand-icon="material-symbols-arrow-right"
                      class="task-title"
                      :style="{ backgroundImage: `url(${inputDailyTask})` }"
                    >
                      <div class="child-element">Abv</div>
                    </v-expansion-panel-title>

                    <v-expansion-panel-text
                      class="task-content tw-mx-[2%] tw-bg-[#FFF0C3]/60 tw-border-[.5vw] tw-border-t-0 tw-border-solid tw-border-[#8D2E02] tw-rounded-b-[1em]"
                    >
                      Some content
                    </v-expansion-panel-text>
                  </v-expansion-panel>
                </template>
              </v-expansion-panels>
            </div>
          </div>
        </div>
      </div>

      <!-- Bottom Icons -->
      <bottom-bar />
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.icon-checked-in {
  @apply tw-aspect-[77/82] tw-w-1/2 tw-absolute tw-hidden tw-z-[1];
}

.daily-gift {
  @apply tw-flex tw-justify-center tw-items-center tw-h-full tw-pt-[40%] tw-relative tw-rounded-2xl tw-overflow-hidden;

  &.checked-in {
    &::before {
      content: "";
      @apply tw-absolute tw-top-[30%] tw-bottom-0 tw-w-full tw-bg-[#FF0000]/50 tw-opacity-50 tw-rounded-b-md tw-z-[1];
    }
    .icon-checked-in {
      @apply tw-block;
    }
  }
}

.special-gift {
  @apply tw-flex tw-justify-center tw-items-center tw-h-full tw-relative;
  &.checked-in {
    &::before {
      content: "";
      @apply tw-absolute tw-top-[15.5%] tw-bottom-0 -tw-left-[1.5%] tw-w-full tw-bg-[#FF0000]/50 tw-rounded-b-md tw-z-[1];
    }
    .icon-checked-in {
      @apply tw-block;
    }
  }
}
</style>

<style lang="postcss">
.daily-task {
  @apply !tw-mt-0 tw-mb-[2%];
  .task-title {
    @apply tw-bg-transparent tw-bg-cover tw-bg-center tw-bg-no-repeat tw-aspect-[946/114] tw-w-full tw-h-auto !tw-min-h-0 !tw-py-0 !tw-pl-[2%] !tw-pr-0;
    font-size: clamp(0.625rem, 2vh, 2.125rem);
  }
  .v-expansion-panel-title__icon {
    @apply tw-h-full tw-w-auto tw-aspect-square tw-justify-center tw-items-center;
    i {
      @apply tw-aspect-square tw-h-[85%] tw-w-auto tw-text-[#8d2e02];
    }
  }
  .task-content {
    border-width: 2%;
    font-size: clamp(0.625rem, 1.5vh, 2.125rem);
  }
}

.task-select {
  @apply tw-bg-contain tw-bg-center tw-bg-no-repeat tw-aspect-[946/114] [&_input]:!tw-border-0 focus:tw-outline-none [&_input]:tw-min-h-0 tw-rounded-md;
  .v-field {
    @apply tw-pr-0;
  }
  .v-select__menu-icon {
    @apply !tw-transform-none tw-text-[230%] tw-text-[#8d2e02] !tw-opacity-100;
  }
  &.v-select--active-menu {
  }
  .dropdown-toggle {
    border: none;
    background-color: turquoise;
  }
  .vs__search::placeholder,
  .vs__dropdown-toggle,
  .vs__dropdown-menu {
    background: red;
    border: none;
    color: #394066;
    text-transform: lowercase;
    font-variant: small-caps;
  }
}
</style>
