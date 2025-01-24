<script setup>
import gameBg from "@images/game/bg-game-2.png";
import inviteFriends from "@images/game/invite-friends.png";
import btnInvite from "@images/game/btn-invite.png";
import invitedReward1 from "@images/game/invited-reward-1.png";
import invitedReward2 from "@images/game/invited-reward-2.png";
import invitedReward3 from "@images/game/invited-reward-3.png";
import invitedReward4 from "@images/game/invited-reward-4.png";
import invitedReward5 from "@images/game/invited-reward-5.png";
import invitedReward6 from "@images/game/invited-reward-6.png";
import invitedReward7 from "@images/game/invited-reward-7.png";
import invitedReward8 from "@images/game/invited-reward-8.png";
import invitedReward9 from "@images/game/invited-reward-9.png";
import invitedReward10 from "@images/game/invited-reward-10.png";
import invitedReward11 from "@images/game/invited-reward-11.png";
import invitedReward12 from "@images/game/invited-reward-12.png";

definePage({
  meta: {
    layout: "game",
    public: true,
  },
});

const invitedRewards = [
  invitedReward1,
  invitedReward2,
  invitedReward3,
  invitedReward4,
  invitedReward5,
  invitedReward6,
  invitedReward7,
  invitedReward8,
  invitedReward9,
  invitedReward10,
  invitedReward11,
  invitedReward12,
];

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

const submitClaimInvited = () => {
  console.log("submitClaimInvited");
  claimInviteDialogRef.value.openDialog();
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
        <div class="tw-flex-auto tw-aspect-[1080/650] tw-w-full"></div>
        <div class="tw-aspect-[1080/80] tw-w-full">
          <svg
            viewBox="0 0 68 15"
            xmlns="http://www.w3.org/2000/svg"
            class="tw-w-full tw-h-full"
          >
            <text
              x="100%"
              y="55%"
              dominant-baseline="middle"
              text-anchor="start"
              font-family="DynaPuff"
              font-size="60%"
              font-weight="700"
              fill="#fff"
              stroke="#B24400"
              stroke-width="1.5"
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

        <div class="tw-flex-auto tw-aspect-[1080/300] tw-w-full tw-px-[12%]">
          <div
            class="tw-h-full tw-grid tw-grid-cols-6 tw-grid-rows-2 tw-gap-[2%]"
          >
            <v-img
              v-for="(src, index) in invitedRewards"
              :key="index"
              :src="src"
              class="tw-w-full tw-h-full"
              @click.stop="submitClaimInvited"
            />
          </div>
        </div>
      </div>
      <div
        class="tw-mb-[3%] tw-w-full tw-flex tw-justify-center tw-items-center"
      >
        <v-btn
          flat
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

<style lang="postcss" scoped>
.received {
  filter: grayscale(100%);
  opacity: 0.7;
}
</style>
