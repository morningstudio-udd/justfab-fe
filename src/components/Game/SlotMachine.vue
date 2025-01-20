<script setup>
import { onMounted, watch } from 'vue';

const refIframe = ref();
const iframeContent = ref();
const slotMachine = ref();
// const jackpot = defineModel('jackpot');
// const energy = defineModel('energy');
// const enable = defineModel('enable');

const props = defineProps({
  'jackpot':String, 
  'energy':String, 
  'disabled': {
    type: Boolean
  } 
})

let inDuty = false;

watch(() => props.energy, (v) => {
  if(slotMachine.value != null) {
    slotMachine.value.LabelEnergy.string = v;
  }
})

watch(() => props.jackpot, (v) => {
  if(slotMachine.value != null) {
    slotMachine.value.LabelJackpot.string = v;
  }
})

const onIframeLoaded = () => {
  iframeContent.value = refIframe.value.contentWindow;
  iframeContent.value.SlotMachine = {};
  iframeContent.value.SlotMachine.onload = (sm)=>{
    slotMachine.value = sm;
    sm.ButtonRoll.node.off("click");
    sm.ButtonRoll.node.on("click", onRollButtonClick)
    sm.LabelJackpot.string=props.jackpot;
    sm.LabelEnergy.string=props.energy;
  }
}

const onRollButtonClick = () => {
  console.log(props.disabled)
  if(props.disabled) return;
    emit('rollClick');
  
}

const roll = (symbols) => {
  slotMachine.value.roll(symbols);
}

const emit = defineEmits(['rollClick'])
defineExpose({roll})

</script>

<template>
  <iframe src="slot-machine/index-embeded.html" ref="refIframe" allowtransparency="true" @load="onIframeLoaded"/>
</template>

<style scoped>
  iframe {
    width: 100%;
    height: 100%;
    border: none;
  }
</style>