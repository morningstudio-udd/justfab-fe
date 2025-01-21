<script setup>
import gameBg from "@images/game/bg-game-2.png";
import inviteFriends from "@images/game/invite-friends.png";
import btnInvite from "@images/game/btn-invite.png";

definePage({
  meta: {
    layout: "game",
    public: true,
  },
});

const gameContentRef = ref(null);
const inviteDialogRef = ref(null);
const claimInviteDialogRef = ref(null);
const parentDivWidth = ref(0);
let resizeObserver;

onMounted(() => {
  if (gameContentRef.value) {
    resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        parentDivWidth.value = entry.contentRect.width;
      }
    });

    resizeObserver.observe(gameContentRef.value);
  }
});

const submitInvite = () => {
  console.log("submitInvite");
  inviteDialogRef.value.openDialog();
};

onBeforeUnmount(() => {
  if (resizeObserver && gameContentRef.value) {
    resizeObserver.unobserve(gameContentRef.value);
    resizeObserver.disconnect();
  }
});
</script>

<template>
  <div
    ref="gameContentRef"
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

    <invite-dialog ref="inviteDialogRef" :width="parentDivWidth * 0.79" />
    <claim-invite-dialog
      ref="claimInviteDialogRef"
      :width="parentDivWidth * 0.79"
    />
  </div>
</template>
