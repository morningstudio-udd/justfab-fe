<script setup>
const preLoading = ref(true);

onMounted(async () => {
  await fetchData();
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
