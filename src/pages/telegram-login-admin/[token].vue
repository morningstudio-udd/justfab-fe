<script setup>
import { nextTick } from "vue";

definePage({
  meta: {
    layout: "blank",
    public: true,
  },
});

const route = useRoute();
const router = useRouter();
const appStore = useAppStore();
const authStore = useAuthStore();
const userStore = useUserStore();

const user = ref();

onMounted(async () => {
  authStore.token = route.params.token;
  await fetchData();
});

const fetchData = async () => {
  try {
    await getUserInfo();

    await nextTick();

    if (
      typeof userStore.userData === "object" &&
      userStore.userData.role === ROLES.ADMIN
    ) {
      await delay(3000);

      router.push("/admin");
    }
  } catch (error) {
    console.error(error);

    appStore.showNotiSnackbar({
      color: "error",
      message:
        error.message || t("Error occurred. Please contact the administrator."),
    });

    userStore.userData = null;
    router.push("/");
  }
};

watch(
  () => [route.params.token, authStore.token],
  async (token) => {
    if (token) {
      await fetchData();
    }
  }
);
</script>

<template>
  <div v-if="user && Object.keys(user).length">
    Welcome {{ user.displayName }} ({{ user.username }}) <br />
    Your balance:<br />
    <ul>
      <li>- {{ user.points }} points</li>
      <li>- {{ user.energy }} / {{ user.maxEnergy }} energy</li>
    </ul>
  </div>
  <div v-else>loging in...</div>
</template>
