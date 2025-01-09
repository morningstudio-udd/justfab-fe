<script setup>
const appStore = useAppStore();
</script>

<template>
  <div class="page-wrapper toggled">
    <AppBar />

    <LeftSidebar />

    <div class="content-wrapper">
      <v-main
        class="page-content bg-gray-50 dark:bg-slate-800 tw-m-bloc"
        :class="appStore.expandVerticalNav ? `ps-64` : 'ps-14'"
      >
        <router-view />
        <!-- <default-footer /> -->
      </v-main>
    </div>
  </div>
</template>
