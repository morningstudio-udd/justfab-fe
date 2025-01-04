<script setup>
definePage({
  meta: {
    layout: "blank",
  },
});

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();

const user = ref();

onMounted(async () => {
  authStore.token = route.params.token;

  await fetchData();
});

const fetchData = async () => {
  try {
    user.value = await getUserInfo();

    if (typeof user.value === "object" && user.value.role === UserRole.ADMIN) {
      router.push("/admin");
    }
  } catch (error) {
    console.error(error);

    user.value = null;
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
