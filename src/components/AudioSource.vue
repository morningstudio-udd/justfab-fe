<!-- <script setup>
const refAudio = ref(null);
import { emitter } from "@plugins/mitt";

const soundVolume = useLocalStorage("soundVolume", 50);

onMounted(() => {
  // emitter.on("changeVolume", ({ type, value }) => {
  //   if (type === "sound") {
  //     // soundVolume.value = value;
  //     refAudio.value.volume = value / 100;
  //     console.log("change volume", refAudio.value.volume, value);
  //   }
  // });

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
</script> -->
<script setup>
import { ref, onMounted, watch, onBeforeUnmount } from "vue";
import { useLocalStorage } from "@vueuse/core";

const refAudio = ref(null);
const audioContext = ref(null);
const gainNode = ref(null);
const mediaSource = ref(null);
const soundVolume = useLocalStorage("soundVolume", 50);

onMounted(() => {
  if (!window.AudioContext) {
    console.error("Web Audio API is not supported in this browser.");
    return;
  }

  if (!audioContext.value) {
    audioContext.value = new (window.AudioContext ||
      window.webkitAudioContext)();
    gainNode.value = audioContext.value.createGain();
  }

  if (!mediaSource.value && refAudio.value) {
    mediaSource.value = audioContext.value.createMediaElementSource(
      refAudio.value
    );
    mediaSource.value
      .connect(gainNode.value)
      .connect(audioContext.value.destination);
  }

  gainNode.value.gain.value = soundVolume.value / 100;

  document.addEventListener(
    "click",
    () => {
      if (audioContext.value?.state === "suspended") {
        audioContext.value.resume();
      }
      refAudio.value.play().catch((error) => {
        console.error("Error playing audio:", error);
      });
    },
    { once: true }
  );
});

watch(soundVolume, (newVolume) => {
  if (gainNode.value) {
    console.log("change volume", newVolume);
    gainNode.value.gain.value = newVolume / 100;
  }
});

onBeforeUnmount(() => {
  if (audioContext.value) {
    audioContext.value.close();
    audioContext.value = null;
    mediaSource.value = null;
    gainNode.value = null;
  }
});
</script>

<template>
  <audio autoplay ref="refAudio" loop>
    <source src="../assets/sounds/bgm.mp3" type="audio/mpeg" />
    Your browser does not support the audio element.
  </audio>
</template>
