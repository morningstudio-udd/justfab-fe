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
// import { openLink } from "@telegram-apps/sdk";
import { openLink, openPopup, openTelegramLink } from "@telegram-apps/sdk-vue";
import moment from "moment";
import { delay } from "@/utils/mixin";

definePage({
  meta: {
    layout: "game",
    requiresAuth: true,
    subject: "User",
    action: "read",
  },
});

const isOpen = ref(false);
const allTasks = ref([]);
const allTaskGroup = ref([]);
const userTasks = ref([]);
const currentStreak = ref(0);
const lastClaimedAt = ref(null);

const currentIndex = computed(() => {
  return currentStreak.value > 0 ? (currentStreak.value % 7) + 1 : 1;
});

onMounted(async () => {
  const p1 = getTasks();
  const p2 = getTaskGroup();
  const p3 = getSeftTasks();
  const p4 = getDailyReward().then((response) => {
    currentStreak.value = response.streak;
    lastClaimedAt.value = response.lastClaimedAt;
  });

  await Promise.all([p1, p2, p3, p4]);
});

const getTasks = async () => {
  try {
    const tasksResponse = await getAllTasks();

    allTasks.value = tasksResponse;
  } catch (error) {
    console.error(error);
  }
};

const getTaskGroup = async () => {
  try {
    const tasksResponse = await getAllTaskGroups();

    allTaskGroup.value = tasksResponse;
  } catch (error) {
    console.error(error);
  }
};

const getSeftTasks = async () => {
  try {
    const tasksResponse = await getUserTasks();

    userTasks.value = tasksResponse;
  } catch (error) {
    console.error(error);
  }
};

const getTaskByGroup = (groupId) => {
  return allTasks.value.filter((task) => task.group === groupId);
};

const isCompleted = (taskId) => {
  return userTasks.value.some(
    (task) => task.task === taskId && task.status === "COMPLETED"
  );
};

const doTask = async (task) => {
  switch (task.type) {
    case TASK_TYPES.TELEGRAM: {
      if (openTelegramLink.isAvailable()) {
        openTelegramLink(task.target);
      } else {
        window.open(task.target, "_blank");
      }

      break;
    }
    case TASK_TYPES.LINK: {
      if (openLink.isAvailable()) {
        openLink(task.target);
      } else {
        window.open(task.target, "_blank");
      }

      await completeTask(task._id);

      await delay(5000);

      await getSeftTasks();
      break;
    }
    default:
      console.warn(`Unknown reward type: ${reward.type}`);
      break;
  }
};

const submitNetwork = () => {
  console.log("submitNetwork");
};

const submitFriend = () => {
  console.log("submitFriend");
};

const submitFab = ($event) => {
  console.log("submitFab");
  handleNormalClickAnimation($event);
};

const handleDailyCheckIn = ($event) => {
  toggleClass(
    $event,
    "tw-animate-jump tw-animate-once tw-animate-ease-linear tw-animate-duration-[1000ms]",
    1000
  );

  onClaimReward();
};

const onClaimReward = async () => {
  try {
    await claimDailyReward();

    await delay(1000);

    const rewardResponse = await getDailyReward();

    currentStreak.value = rewardResponse.streak;
    lastClaimedAt.value = rewardResponse.lastClaimedAt;
  } catch (error) {
    console.error(error);
  }
};

const canClaimDailyReward = (index) => {
  if (currentStreak.value === 0 && index === 1) {
    return true;
  }

  return index === currentIndex.value && isYesterday(lastClaimedAt.value);
};

const isYesterday = (lastClaimedAt) => {
  return moment(lastClaimedAt).isSame(moment().subtract(1, "day"), "day");
};
</script>

<template>
  <div class="game-content tw-flex-auto tw-overflow-hidden">
    <div class="tw-flex tw-flex-col tw-h-full">
      <!-- <div class="-tw-mt-[2.4%]"> -->
      <div class="tw-aspect-[687/136] tw-w-[63.6%] tw-mx-auto">
        <v-img :src="dailyReward" />
      </div>
      <!-- </div> -->

      <div
        class="rewards-container tw-w-full tw-aspect-[1080/580] tw-bg-cover tw-bg-center tw-bg-no-repeat tw-grid tw-grid-cols-7 tw-grid-rows-2 tw-pl-[8.5%] tw-pr-[9.2%] tw-py-[2.5%] tw-gap-x-[4%] tw-gap-y-[8%] tw-animate-rotate-x tw-animate-duration-1000 tw-animate-ease-out"
        :style="{ backgroundImage: `url(${bgGifts})` }"
      >
        <div
          class="tw-col-span-5 tw-row-span-1 tw-grid tw-grid-cols-3 tw-grid-rows-1 tw-gap-[5%]"
        >
          <div
            class="daily-gift"
            :class="{
              'checked-in': currentIndex > 1,
              'tw-cursor-pointer': canClaimDailyReward(1),
            }"
            @click="canClaimDailyReward(2) ? handleDailyCheckIn($event) : null"
          >
            <div class="tw-aspect-[99/102] tw-w-1/2">
              <v-img :src="gift1" />
            </div>

            <div class="icon-checked-in">
              <v-img :src="iconCheckedIn" />
            </div>
          </div>

          <div
            class="daily-gift"
            :class="{
              'checked-in': currentIndex > 2,
              'tw-cursor-pointer': canClaimDailyReward(2),
            }"
            @click="canClaimDailyReward(2) ? handleDailyCheckIn($event) : null"
          >
            <div class="tw-aspect-[99/102] tw-w-1/2">
              <v-img :src="gift2" />
            </div>

            <div class="icon-checked-in">
              <v-img :src="iconCheckedIn" />
            </div>
          </div>

          <div
            class="daily-gift"
            :class="{
              'checked-in': currentIndex > 3,
              'tw-cursor-pointer': canClaimDailyReward(3),
            }"
            @click="canClaimDailyReward(3) ? handleDailyCheckIn($event) : null"
          >
            <div class="tw-aspect-[99/102] tw-w-1/2">
              <v-img :src="gift3" />
            </div>

            <div class="icon-checked-in">
              <v-img :src="iconCheckedIn" />
            </div>
          </div>
        </div>

        <div class="reward tw-row-span-2 tw-col-span-2">
          <div
            class="special-gift"
            :class="{
              'checked-in': currentIndex > 7,
              'tw-cursor-pointer': canClaimDailyReward(7),
            }"
            @click="canClaimDailyReward(7) ? handleDailyCheckIn($event) : null"
          >
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
          <div
            class="daily-gift"
            :class="{
              'checked-in': currentIndex > 4,
              'tw-cursor-pointer': canClaimDailyReward(4),
            }"
            @click="canClaimDailyReward(4) ? handleDailyCheckIn($event) : null"
          >
            <div class="tw-aspect-[99/102] tw-w-1/2">
              <v-img :src="gift4" />
            </div>

            <div class="icon-checked-in">
              <v-img :src="iconCheckedIn" />
            </div>
          </div>

          <div
            class="daily-gift"
            :class="{
              'checked-in': currentIndex > 5,
              'tw-cursor-pointer': canClaimDailyReward(5),
            }"
            @click="canClaimDailyReward(5) ? handleDailyCheckIn($event) : null"
          >
            <div class="tw-aspect-[99/102] tw-w-1/2">
              <v-img :src="gift5" />
            </div>

            <div class="icon-checked-in">
              <v-img :src="iconCheckedIn" />
            </div>
          </div>

          <div
            class="daily-gift"
            :class="{
              'checked-in': currentIndex > 6,
              'tw-cursor-pointer': canClaimDailyReward(6),
            }"
            @click="canClaimDailyReward(6) ? handleDailyCheckIn($event) : null"
          >
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
                class="tw-aspect-[220/97] tw-w-[24.2%] !tw-h-auto tw-min-w-0 tw-bg-cover tw-bg-bottom tw-bg-no-repeat tw-relative tw-rounded-[10%] tw-overflow-hidden jump-in-anim"
                :style="{
                  backgroundImage: `url(${btnFab})`,
                }"
                @click="submitFab($event)"
              ></v-btn>

              <v-btn
                color="transparent"
                flat
                class="tw-aspect-[318/97] tw-w-[35.1%] !tw-h-auto tw-min-w-0 tw-bg-cover tw-bg-bottom tw-bg-no-repeat tw-relative tw-rounded-[10%] tw-overflow-hidden jump-in-anim"
                :style="{ backgroundImage: `url(${btnNetwork})` }"
                @click="submitNetwork"
              ></v-btn>

              <v-btn
                color="transparent"
                flat
                class="tw-aspect-[220/97] tw-w-[24.2%] !tw-h-auto tw-min-w-0 tw-bg-cover tw-bg-bottom tw-bg-no-repeat tw-relative tw-rounded-[10%] tw-overflow-hidden jump-in-anim"
                :style="{ backgroundImage: `url(${btnFriend})` }"
                @click="submitFriend"
              ></v-btn>
            </div>
          </div>
        </div>

        <div
          class="tw-h-auto tw-max-h-full tw-overflow-y-scroll tw-px-[7%] tw-py-[5%] tw-flex tw-flex-col tw-gap-[1vh]"
        >
          <v-expansion-panels
            flat
            hide-actions
            multiple
            bg-color="transparent"
            v-if="allTasks.length"
          >
            <template v-for="group in allTaskGroup" :key="group._id">
              <v-expansion-panel class="daily-task">
                <v-expansion-panel-title
                  static
                  collapse-icon="material-symbols-arrow-drop-down"
                  expand-icon="material-symbols-arrow-right"
                  class="task-title"
                  :style="{ backgroundImage: `url(${inputDailyTask})` }"
                >
                  <div class="child-element">{{ group.name }}</div>
                </v-expansion-panel-title>

                <v-expansion-panel-text class="task-content">
                  <v-list item-props class="task" bg-color="transparent">
                    <v-list-item
                      v-for="task in getTaskByGroup(group._id)"
                      :key="task._id"
                      :title="task.title"
                      :subtitle="task.description"
                      @click="doTask(task)"
                    >
                      <template #append>
                        <v-img
                          :src="iconCheckedIn"
                          v-if="isCompleted(task._id)"
                          width="12"
                        />
                      </template>
                    </v-list-item>
                  </v-list>
                </v-expansion-panel-text>
              </v-expansion-panel>
            </template>
          </v-expansion-panels>
        </div>
      </div>
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
    @apply tw-mx-[2%] tw-bg-[#FFF0C3]/60 !tw-border-[0.3vh] !tw-border-t-0 tw-border-solid tw-border-[#8D2E02] tw-rounded-b-[1em];
    /* border-width: 2%; */
    font-size: clamp(0.625rem, 1.5vh, 2.125rem);
    .task {
      .v-list-item {
        @apply tw-p-0;
      }
    }
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
