<script setup>
  import { onMounted, ref } from 'vue';
  const refAudio = ref(null);

  onMounted(() => {
    document.addEventListener('click', () => {
      if(!refAudio.value) return;
      refAudio.value.play().catch(error => {
        console.error("Error playing audio:", error);
      });
    }, { once: true });
  })
</script>

<template>
  <audio autoplay ref="refAudio" loop>
    <source src="../assets/sounds/bgm.mp3" type="audio/mpeg">
      Your browser does not support the audio element.
  </audio>
</template>