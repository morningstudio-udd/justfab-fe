<script setup>
import { cookies } from "@/plugins/useCookies";

definePage({
  meta: {
    layout: "blank",
  },
});

const route = useRoute();
const authStore = useAuthStore();
const userStore = useUserStore();

onMounted(async () => {
  // authStore.token = route.params.token;
  cookies.set("token", route.params.token);

  await fetchData();
});

const fetchData = async () => {
  try {
    await getUserInfo();
  } catch (error) {
    console.error(error);
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
  <div v-if="userStore.userData && Object.keys(userStore.userData).length">
    Welcome {{ userStore.userData.displayName }} ({{
      userStore.userData.username
    }}) <br />
    Your balance:<br />
    <ul>
      <li>- {{ userStore.userData.points }} points</li>
      <li>
        - {{ userStore.userData.energy }} /
        {{ userStore.userData.maxEnergy }} energy
      </li>
    </ul>
  </div>
  <div v-else>loging in...</div>
</template>
