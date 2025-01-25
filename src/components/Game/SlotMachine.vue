<script setup>
const slotMachineUrl = import.meta.env.VITE_SLOT_MACHINE_URL;

const refIframe = ref();
const iframeContent = ref();
const slotMachine = ref();
// const jackpot = defineModel('jackpot');
// const energy = defineModel('energy');
// const enable = defineModel('enable');

const props = defineProps({
  jackpot: String,
  energy: String,
  jackpotRewards: {
    type: Array,
  },
  disabled: {
    type: Boolean,
  },
});

let inDuty = false;

watch(
  () => props.energy,
  (v) => {
    if (slotMachine.value != null) {
      slotMachine.value.LabelEnergy.string = v;
    }
  }
);

watch(
  () => props.jackpot,
  (v) => {
    if (slotMachine.value != null) {
      slotMachine.value.LabelJackpot.string = v;
    }
  }
);

watch(
  () => props.jackpotRewards,
  (v) => {
    if (slotMachine.value != null) {
      slotMachine.value.Jackpot.setPrizes(v);
    }
  },
  {
    deep: true,
  }
);

const onIframeLoaded = () => {
  iframeContent.value = refIframe.value.contentWindow;
  iframeContent.value.SlotMachine = {};
  iframeContent.value.SlotMachine.onload = (sm) => {
    slotMachine.value = sm;
    sm.ButtonRoll.node.off("click");
    sm.ButtonRoll.node.on("click", onRollButtonClick);
    sm.LabelJackpot.string = props.jackpot;
    sm.LabelEnergy.string = props.energy;
    sm.ButtonClose.node.active = false;
    sm.ButtonClose.node.on("click", onCloseButtonClick);
    sm.Jackpot.setPrizes(props.jackpotRewards);
    sm.Jackpot.node.active = false;
  };
};

const onCloseButtonClick = () => {
  setJackpotVisible(false);
  setButtonCloseVisible(false);
};

const onRollButtonClick = () => {
  console.log(props.disabled);
  if (props.disabled) return;
  emit("rollClick");
};

const roll = (symbols) => {
  slotMachine.value.roll(symbols);
};

const setJackpotVisible = (v) => {
  slotMachine.value.Jackpot.node.active = v;
};

const setButtonCloseVisible = (v) => {
  slotMachine.value.ButtonClose.node.active = v;
};

const setJackpotPrizes = (prizes) => {
  slotMachine.value.Jackpot.setPrizes(prizes);
};

const rollJackpot = (prize) => {
  slotMachine.value.Jackpot.roll(prize);
};

const emit = defineEmits(["rollClick"]);
defineExpose({
  roll,
  setJackpotPrizes,
  setJackpotVisible,
  setButtonCloseVisible,
  rollJackpot,
});
</script>

<template>
  <iframe
    class="tw-w-full tw-h-full tw-border-none"
    :src="slotMachineUrl"
    ref="refIframe"
    allowtransparency="true"
    @load="onIframeLoaded"
  />
</template>
