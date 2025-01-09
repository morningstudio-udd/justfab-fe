<script setup>
const route = useRoute();
const router = useRouter();

const DefaultLayout = defineAsyncComponent(() =>
  import("./components/DefaultLayout.vue")
);
const DefaultLayoutWithSidebar = defineAsyncComponent(() =>
  import("./components/DefaultLayoutWithSidebar.vue")
);

onMounted(async () => {
  await fetchData();
});

const fetchData = async () => {
  try {
    await getUserInfo();
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div class="admin-layout">
    <Component
      :is="
        route.meta.nav === 'vertical' ? DefaultLayoutWithSidebar : DefaultLayout
      "
    />

    <AssetsManagerDialog />
  </div>
</template>
