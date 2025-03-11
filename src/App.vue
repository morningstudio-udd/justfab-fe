<script setup>
import { cookies } from "@/plugins/useCookies";

const preLoading = ref(false);

const route = useRoute();
const authStore = useAuthStore();

onMounted(async () => {
  if (!!(cookies.get("user_role") && authStore.token)) {
    await fetchData();
  }
});

const fetchData = async () => {
  try {
    preLoading.value = true;

    await getUserInfo();
  } catch (error) {
    console.error(error);
  } finally {
    preLoading.value = false;
  }
};
</script>

<template>
  <VApp>
    <template v-if="preLoading">
      <v-skeleton-loader />
    </template>
    <div v-else class="layout-wrapper">
      <RouterView />

      <AlertMessage />
      <SnackbarMessage />
      <LoadingOverlay />
    </div>
  </VApp>
</template>

<style scoped></style>
