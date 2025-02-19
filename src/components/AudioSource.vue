<script setup>
const refAudio = ref(null);

const soundVolume = useLocalStorage("soundVolume", 50);

onMounted(() => {
  document.addEventListener(
    "click",
    () => {
      if (!refAudio.value) return;
      refAudio.value.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    },
    { once: true }
  );

  if (refAudio.value) {
    refAudio.value.volume = soundVolume.value / 100;
  }
});

watch(soundVolume, (newVolume) => {
  if (refAudio.value) {
    console.log("change volume", newVolume);
    refAudio.value.volume = newVolume / 100;
  }
});
</script>

<template>
  <audio autoplay ref="refAudio" loop>
    <source src="../assets/sounds/bgm.mp3" type="audio/mpeg" />
    Your browser does not support the audio element.
  </audio>
</template>
