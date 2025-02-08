<script setup>
const slotMachineUrl = import.meta.env.VITE_SLOT_MACHINE_URL;

const refIframe = ref();
const iframeContent = ref();
const slotMachine = ref();

const props = defineProps({
  jackpot: {
    type: Number,
    default: 100000
  },
  energy: {
    type: Number,
    default: 0
  },
  claimEnergy: {
    type: Number,
    default: 0
  },
  jackpotRewards: {
    type: Array,
  },
  disabled: {
    type: Boolean,
  },
});

let inDuty = false;
const currentX = ref(1);

watch(
  () => props.claimEnergy,
  (v) => {
    if (slotMachine.value != null) {
      slotMachine.value.LabelClaimEnergy.string = `${v}/50`;
    }
  }
);

watch(
  () => props.energy,
  (v) => {
    if (slotMachine.value != null) {
      slotMachine.value.LabelEnergy.string = v.toString();
      slotMachine.value.BarEnergy.progress = Math.min(1, v / 100);
    }
  }
);

watch(
  () => props.jackpot,
  (v) => {
    if (slotMachine.value != null) {
      slotMachine.value.LabelJackpot.string = v.toString();
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
    sm.ButtonRoll.node.on("click", onButtonRoolClick);
    sm.LabelJackpot.string = props.jackpot;
    sm.LabelEnergy.string = props.energy;
    sm.BarEnergy.progress = Math.min(1, props.energy / 100);
    sm.ButtonClose.node.active = false;
    sm.ButtonClose.node.on("click", onButtonCloseClick);
    sm.ButtonBetX.node.on("click", onButtonBetXClick);
    sm.LabelBetX.string = "BET X1";
    sm.ButtonClaimEnergy.node.on("click", onButtonClaimEnergyClick);
    sm.Jackpot.setPrizes(props.jackpotRewards);
    sm.Jackpot.node.active = false;
  };
};

const XS = [1, 2, 3, 5, 10]
const onButtonBetXClick = () => {
  let id = XS.indexOf(currentX.value);
  id ++;
  if(id >= XS.length) id = 0;
  currentX.value = XS[id];
  slotMachine.value.LabelBetX.string = `BET X${currentX.value}`;
};

const onButtonClaimEnergyClick = () => {
  console.log("claim");
};

const onButtonCloseClick = () => {
  setJackpotVisible(false);
  setButtonCloseVisible(false);
};

const onButtonRoolClick = () => {
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
