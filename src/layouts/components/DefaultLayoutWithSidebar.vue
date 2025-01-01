<script setup>
const appStore = useAppStore();
</script>

<template>
  <div class="page-wrapper toggled">
    <AppBar />

    <LeftSidebar />

    <v-main
      class="page-content bg-gray-50 dark:bg-slate-800"
      :class="appStore.expandVerticalNav ? `ps-64` : 'ps-14'"
    >
      <router-view />
      <!-- <default-footer /> -->
    </v-main>
  </div>
</template>
