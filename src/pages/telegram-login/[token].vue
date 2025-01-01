<script setup>
import { getUserInfo, token } from "@api/user";

const route = useRoute();
const router = useRouter();
console.log(route, router);

onMounted(async () => {
  console.log(router);
  token.value = router.params.token;
  const user = await getUserInfo();
});
</script>

<template>loging in...</template>
