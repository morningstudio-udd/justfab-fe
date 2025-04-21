<script setup>
import bgReferred from "@images/game/bg-referred.png";
import completedDailyReward from "@images/game/completed-daily-reward.png";

const gameStore = useGameStore();
const userStore = useUserStore();

const specialLevels = [
  { count: 1 },
  { count: 2 },
  { count: 3 },
  { count: 10 },
  { count: 20 },
  { count: 50 },
  { count: 100 },
  { count: 200 },
  { count: 500 },
  { count: 1000 },
  { count: 2000 },
  { count: 3000 },
];

const gameContentRef = ref(null);
const inviteDialogRef = ref(null);
const claimInviteDialogRef = ref(null);
const parentDivWidth = ref(0);
const invitedSvgRef = ref(null);
const recruited = ref(0);
const notClaimed = ref([]);

const referred = ref([]);

const canClaimLevels = computed(() => {
  const specialCounts = new Set(specialLevels.map((sp) => sp.count));

  return [
    ...new Set(
      notClaimed.value
        .map((item) => item.level)
        .filter((level) => specialCounts.has(level))
    ),
  ];
});

const claimedLevels = computed(() => {
  const notClaimedSet = new Set(notClaimed.value.map((item) => item.level));

  return specialLevels
    .map((sp) => sp.count)
    .filter((count) => count <= recruited.value && !notClaimedSet.has(count));
});

onMounted(async () => {
  // const { referredUsers } = await getReferralTree(userStore.userData?._id);
  // referred.value = referredUsers;
  await getRecruited();
});

const getRecruited = async () => {
  try {
    const { onboarded, rewards } = await getRecruitedUsers();
    recruited.value = onboarded;
    notClaimed.value = rewards;
    if (notClaimed.value.length > 0) {
      const rw = notClaimed.value
        .filter((item) => !specialLevels.some((sp) => sp.count === item.level))
        .map((item) => item.reward);
      if (rw.length > 0) {
        gameStore.handleRewards(rw, notClaimed.value[0].reason);
      }
    }
  } catch (error) {
    console.log("error", error);
  }
};
</script>

<template>
  <div class="tw-flex tw-flex-col tw-gap-[2%]">
    <div
      v-for="(level, index) in specialLevels"
      :key="index"
      class="tw-bg-cover tw-bg-center tw-bg-no-repeat tw-aspect-[608/152] tw-w-full tw-flex tw-items-center tw-text-[#AE613A]"
      :class="{
        'tw-cursor-pointer': canClaimLevels.includes(level.count),
        'disable-element':
          !canClaimLevels.includes(level.count) &&
          !claimedLevels.includes(level.count),
      }"
      :style="{ backgroundImage: `url(${bgReferred})` }"
      @click.prevent="
        canClaimLevels.includes(level.count)
          ? submitClaimInvited(level.count)
          : ''
      "
    >
      <div class="tw-w-[78%] tw-ml-auto tw-mb-[4%] tw-line-clamp-2">
        Invite {{ level.count }} Friend To Unlock The Rewards
      </div>

      <div
        v-if="claimedLevels.includes(level.count)"
        class="task-completed tw-absolute tw-left-0 tw-top-0 tw-w-full tw-h-full tw-flex tw-justify-center tw-items-center"
      >
        <div class="tw-h-1/2 tw-w-auto tw-aspect-square">
          <v-img :src="completedDailyReward" cover />
        </div>
      </div>
    </div>
  </div>
</template>
