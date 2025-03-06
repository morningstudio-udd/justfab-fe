<script setup>
import { onMounted, ref } from 'vue';
import { retrieveLaunchParams } from '@telegram-apps/sdk';

const route = useRoute();
const router = useRouter();
const initDataRef = ref();
definePage({
  meta: {
    layout: "blank",
    public: true,
  },
}); 

onMounted(async () => {
  let hashes = window.location.hash.substring(1).split('&').reduce((acc, curr) => {
    const [key, value] = curr.split('=');
    acc[key] = value;
    return acc;
  }, {});
  try{

    const initData = decodeURIComponent(hashes.tgWebAppData);
    initDataRef.value = initData;
    console.log({initData});
    const data = await authTelegram({initData});
    console.log(data);
  }catch(e){
    console.log(e);
  }
  
  return;
});
</script>

<template>
  <div style>
    login in telegram
    <div>
    <input type="text" v-model="initDataRef" />
  
    </div>
  </div>
</template>