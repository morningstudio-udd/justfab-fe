<script setup>
import { getUserInfo, token } from "@api/user";

definePage({
  meta: {
    layout: "blank",
  },
});

const route = useRoute();
const router = useRouter();

const user = ref();

onMounted(async () => {
  token.value = route.params.token;
  user.value = await getUserInfo();
  console.log(user.value);
});
</script>

<template>
  <div v-if="user">
    Welcome {{ user.displayName }} ({{ user.username }}) <br />
    Your balance {{ user.points }} points<br />
  </div>
  <div v-else >
    loging in...
  </div>
</template>
