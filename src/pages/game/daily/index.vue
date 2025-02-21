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
// import { openLink } from "@telegram-apps/sdk-vue";
// import WebApp from "@twa-dev/sdk";

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

onMounted(async () => {
  const p1 = getTasks();
  const p2 = getTaskGroup();
  const p3 = getSeftTasks();

  await Promise.all([p1, p2, p3]);

  Telegram.WebApp.ready();

  Telegram.WebApp.MainButton.setParams({
    text: "Main Button",
  });
  Telegram.WebApp.MainButton.onClick(function () {
    Telegram.WebApp.showAlert("Main Button was clicked");
  });
  Telegram.WebApp.MainButton.show();
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
  // Telegram.WebApp.showDebug();
  switch (task.type) {
    case TASK_TYPES.TELEGRAM: {
      break;
    }
    case TASK_TYPES.LINK: {
      await completeTask(task._id);

      // if (openLink.isAvailable()) {
      //   openLink(task.target);
      // }

      // openLink.ifAvailable(task.target, {
      //   tryBrowser: "chrome",
      //   tryInstantView: true,
      // });

      // if (window.Telegram?.WebApp) {
      //   window.Telegram.WebApp.openLink(task.target);
      // } else if (Telegram) {
      //   Telegram.WebApp.openLink(task.target);
      // } else {
      //   window.open(task.target, "_blank");
      // }

      await delay(5000);

      await getSeftTasks();
      break;
    }
    default:
      console.warn(`Unknown reward type: ${reward.type}`);
      break;
  }
};

const submitFab = () => {
  console.log("submitFab");
};

const submitNetwork = () => {
  console.log("submitNetwork");
};

const submitFriend = () => {
  console.log("submitFriend");
};

const openTask1 = (url) => {
  window.location.href = url;
};

const openTask2 = (url) => {
  if (window.Telegram?.WebApp?.requestWriteAccess) {
    window.Telegram.WebApp.requestWriteAccess().then(() => {
      window.Telegram.WebApp.openLink(url, {
        try_instant_view: true,
        force_external: true,
      });
    });
  } else {
    window.location.href = url;
  }
};

const openTask3 = (event) => {
  if (window.Telegram?.WebApp?.requestWriteAccess) {
    window.Telegram.WebApp.requestWriteAccess().then(() => {
      window.Telegram.WebApp.openLink("https://example.com");
    });
  } else {
    window.location.href = "https://example.com";
  }
};

const showPopup = () => {
  Telegram.WebApp.showPopup(
    {
      title: "Title",
      message: "Some message",
      buttons: [
        { id: "link", type: "default", text: "Open ton.org" },
        { type: "cancel" },
      ],
    },
    function (btn) {
      if (btn === "link") {
        Telegram.WebApp.openLink("https://morningstudio.vn");
      }
    }
  );
};

const renderText = () => {
  return (
    window.Telegram?.WebApp?.platform +
    "-" +
    window.Telegram?.WebApp?.initData +
    "-" +
    navigator.userAgent
  );
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
                    >
                      <button @click="openTask1(task.target)">Click 1</button>
                      <br />
                      <button @click="openTask2(task.target)">Click 2</button>
                      <br />
                      <button @click="openTask3">Click 3</button>
                      <br />
                      <button @click="showPopup">Launch Popup</button>
                      <br />
                      <a
                        href="javascript:Telegram.WebApp.openLink('https://morningstudio.vn');"
                        >Open link in external browser</a
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

                {{ renderText() }}
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
