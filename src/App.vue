<script setup></script>

<template>
  <VApp>
    <div class="layout-wrapper">
      <RouterView />

      <AlertMessage />
      <SnackbarMessage />
      <LoadingOverlay />
    </div>
  </VApp>
</template>

<style scoped></style>
