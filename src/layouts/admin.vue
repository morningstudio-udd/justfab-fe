<script setup>
const route = useRoute();
const router = useRouter();

const DefaultLayout = defineAsyncComponent(() =>
  import("./components/DefaultLayout.vue")
);
const DefaultLayoutWithSidebar = defineAsyncComponent(() =>
  import("./components/DefaultLayoutWithSidebar.vue")
);

const preLoading = ref(true);

onMounted(async () => {
  console.log("Admin layout mounted");
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
  <div class="admin-layout" v-if="!preLoading">
    <template v-if="preLoading">
      <v-skeleton-loader />
    </template>
    <Component
      v-else
      :is="
        route.meta.nav === 'vertical' ? DefaultLayoutWithSidebar : DefaultLayout
      "
    />

    <AssetsManagerDialog />
  </div>
</template>
