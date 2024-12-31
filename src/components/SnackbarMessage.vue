<script setup>
const appStore = useAppStore();
</script>

<template>
  <VSnackbar
    v-model="appStore.isNotiSnackbarVisible"
    vertical
    :timeout="appStore.notiSnackbarContent?.timeout"
    :color="appStore.notiSnackbarContent?.color"
  >
    {{ appStore.notiSnackbarContent?.content }}

    <template #actions>
      <VBtn color="secondary" @click="appStore.isNotiSnackbarVisible = false">
        Close
      </VBtn>
    </template>
  </VSnackbar>
</template>
