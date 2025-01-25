<script setup>
import gameBg from "@images/game/bg-game-1.png";

definePage({
  meta: {
    layout: "blank",
    public: true,
    unauthenticated: true,
  },
});

const route = useRoute();
const router = useRouter();
const appStore = useAppStore();
const authStore = useAuthStore();
const userStore = useUserStore();

onMounted(async () => {
  if (route.params.token) {
    authStore.token = route.params.token;
    await fetchData();
  } else {
    router.push("/");
  }
});

const fetchData = async () => {
  try {
    await getUserInfo();

    await nextTick();

    if (userStore.userData && userStore.userData.role === ROLES.ADMIN) {
      router.push("/dashboard");
    }
  } catch (error) {
    console.error(error);

    // appStore.showNotiSnackbar({
    //   color: "error",
    //   message:
    //     error.message || t("Error occurred. Please contact the administrator."),
    // });

    userStore.userData = null;
    userStore.token = null;

    router.push("/");
  }
};

// watch(
//   () => [route.params.token, authStore.token],
//   async (token) => {
//     if (token) {
//       await fetchData();
//     }
//   }
// );
</script>

<template>
  <div
    class="tw-bg-[#86C7E5] tw-w-screen tw-h-screen tw-flex tw-items-center tw-justify-center"
  >
    <div
      class="game-container tw-w-auto tw-h-[1920px] tw-aspect-[1080/1920] tw-max-w-full tw-max-h-full tw-bg-[#D9D9D9] tw-bg-cover tw-bg-center tw-bg-no-repeat tw-flex tw-flex-col tw-relative"
      :style="{ backgroundImage: `url(${gameBg})` }"
    >
      <div
        class="game-content tw-flex-grow tw-flex tw-justify-center tw-items-center"
      >
        Loading Admin...
      </div>
    </div>
  </div>
</template>
