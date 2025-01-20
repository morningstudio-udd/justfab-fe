<script setup>
import gameBg from "@images/game/bg-game-2.png";
import inviteFriends from "@images/game/invite-friends.png";
import btnInvite from "@images/game/btn-invite.png";

definePage({
  meta: {
    layout: "blank",
    public: true,
  },
});

const gameContainerRef = ref(null);
const inviteDialogRef = ref(null);
const parentDivWidth = ref(0);
let resizeObserver;

onMounted(() => {
  if (gameContainerRef.value) {
    // Khởi tạo ResizeObserver
    resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        parentDivWidth.value = entry.contentRect.width;
      }
    });

    resizeObserver.observe(gameContainerRef.value);
  }
});

const submitInvite = () => {
  console.log("submitInvite");
  inviteDialogRef.value.openDialog();
};

onBeforeUnmount(() => {
  // Dọn dẹp ResizeObserver
  if (resizeObserver && gameContainerRef.value) {
    resizeObserver.unobserve(gameContainerRef.value);
    resizeObserver.disconnect();
  }
});
</script>

<template>
  <div
    class="tw-bg-[#86C7E5] tw-w-screen tw-h-screen tw-flex tw-items-center tw-justify-center"
  >
    <div
      class="game-container tw-w-auto tw-h-[1920px] tw-aspect-[1080/1920] tw-max-w-full tw-max-h-full tw-bg-[#D9D9D9] tw-bg-cover tw-bg-center tw-bg-no-repeat tw-flex tw-flex-col tw-relative"
      :style="{ backgroundImage: `url(${gameBg})` }"
      ref="gameContainerRef"
    >
      <!-- Top Icons -->
      <top-bar />

      <div
        class="game-content tw-flex-grow tw-flex tw-justify-center tw-items-center"
      >
        <div
          class="tw-aspect-[1012/1320] tw-w-[95%] tw-h-auto tw-bg-cover tw-bg-center tw-bg-no-repeat tw-flex tw-flex-col"
          :style="{ backgroundImage: `url(${inviteFriends})` }"
        >
          <div class="tw-flex-auto">
            <!-- <div class="tw-font-bold">1000</div> -->
            <svg
              viewBox="0 0 68 15"
              xmlns="http://www.w3.org/2000/svg"
              class="tw-w-full tw-h-full"
            >
              <text
                x="70%"
                y="73%"
                dominant-baseline="middle"
                text-anchor="start"
                font-family="DynaPuff"
                font-size="20%"
                font-weight="700"
                padding-left="1%"
                fill="#fff"
                stroke="#B24400"
                stroke-width="0.7"
                paint-order="stroke fill"
                text-overflow="ellipsis"
                white-space="nowrap"
                overflow="hidden"
                width="100%"
              >
                1000
              </text>
            </svg>
          </div>
          <div
            class="tw-mb-[3%] tw-w-full tw-flex tw-justify-center tw-items-center"
          >
            <v-btn
              color="transparent"
              class="tw-aspect-[380/96] tw-w-[35.2%] !tw-h-auto tw-bg-contain tw-bg-center tw-bg-no-repeat tw-relative tw-rounded-[10%] tw-overflow-hidden"
              :style="{ backgroundImage: `url(${btnInvite})` }"
              @click.stop="submitInvite"
            ></v-btn>
          </div>
          <!-- <div class="tw-aspect-[1080/150]"></div> -->
        </div>
      </div>

      <!-- Bottom Icons -->
      <bottom-bar />

      <invite-dialog ref="inviteDialogRef" :width="parentDivWidth * 0.79" />
    </div>
  </div>
</template>
