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
  claimEnergyAt: {
    type: Date,
    default: new Date()
  },
  jackpotRewards: {
    type: Array,
  },
  disabled: {
    type: Boolean,
  },
  volume: {
    type: Number,
    default: 1
  }
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
      slotMachine.value.LabelJackpot.string = v.toLocaleString() + "$";
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

watch(
  () => props.volume,
  (v) => {
    if (slotMachine.value != null) {
      console.log("set volume", v);
      slotMachine.value.setVolume(v);
    }
  }
);

const onIframeLoaded = () => {
  iframeContent.value = refIframe.value.contentWindow;
  iframeContent.value.SlotMachine = {};
  iframeContent.value.SlotMachine.onload = (sm) => {
    slotMachine.value = sm;
    sm.ButtonRoll.node.off("click");
    sm.ButtonRoll.node.on("click", onButtonRoolClick);
    sm.LabelJackpot.string = props.jackpot.toLocaleString("en-US") + "$";
    sm.LabelEnergy.string = props.energy;
    sm.BarEnergy.progress = Math.min(1, props.energy / 100);
    sm.ButtonClose.node.active = false;
    sm.ButtonClose.node.on("click", onButtonCloseClick);
    sm.ButtonBetX.node.on("click", onButtonBetXClick);
    sm.LabelBetX.string = "BET X1";
    sm.ButtonClaimEnergy.node.on("click", onButtonClaimEnergyClick);
    sm.Jackpot.setPrizes(props.jackpotRewards);
    sm.Jackpot.node.active = false;
    setInterval(updateEnergyBottle, 1000);
    setTimeout(() => setVolume(props.volume), 50);
    emit("loaded", sm);
  };
};

const updateEnergyBottle = () => {
  let now = new Date();
  let minutes = Math.floor((now - props.claimEnergyAt) / 60000);
  if(minutes > 50) minutes = 50;
  slotMachine.value.LabelClaimEnergy.string = `${minutes}/50`;
}

const XS = [1, 2, 3, 5, 10]
const onButtonBetXClick = () => {
  let id = XS.indexOf(currentX.value);
  id ++;
  if(id >= XS.length) id = 0;
  currentX.value = XS[id];
  slotMachine.value.LabelBetX.string = `BET X${currentX.value}`;
};

const onButtonClaimEnergyClick = () => {
  emit("claimEnergyClick");
};

const onButtonCloseClick = () => {
  setJackpotVisible(false);
  setButtonCloseVisible(false);
};

const onButtonRoolClick = () => {
  console.log(props.disabled);
  if (props.disabled) return;
  emit("rollClick", {betX: currentX.value});
};

let playScripts = [];
let currentStep = 0;
let currentScript = null;
let turns = 0;

const roll = async (scripts) => { 
  currentStep = 0;
  playScripts = scripts;
  turns = 1;
  await rollScriptStep(0);
};

const rollScriptStep = async (step) => {
  setVolume(props.volume);
  currentStep = step;
  currentScript = playScripts[currentStep];
  if(currentScript.type == 'slotMachine') {
    setJackpotVisible(false);
    slotMachine.value.roll(currentScript.reelSymbols);
    if(turns > 1) {
      await waitForSeconds(1);
      slotMachine.value.LabelTurn.show(`turn ${turns}`);
    }
    turns--;
    await waitForSeconds(4);
    for(const r of currentScript.rewards) {
      if(r.type == "SPIN") {
        turns += r.value;
        slotMachine.value.LabelTurn.show(`+${r.value} turns`)
      }
    }
    emit("scriptCompleted", currentScript);
  }else{
    setJackpotVisible(true);
    setButtonCloseVisible(false);
    rollJackpot(currentScript.rewards[0].description);
    await waitForSeconds(4);
    setButtonCloseVisible(true);
    emit("scriptCompleted", currentScript);
  }
  if(currentScript >= playScripts.length - 1) 
    emit("allScriptCompleted");
}

const rollNextStep = async () => {
  if(currentStep >= playScripts.length - 1) {
    // emit("allScriptCompleted");
    return;
  }
  await rollScriptStep(currentStep + 1);
}

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

const setVolume = (v) => {
  slotMachine.value.setVolume(v);
}

const waitForSeconds = async (s) => {
  return new Promise((res) => {
    setTimeout(res, s * 1000);
  });
};

const flyEnergy = (n) => {
  slotMachine.value.flyEnergy(n);
}

const showGoldEffect = () => {
  slotMachine.value.GoldParticle.resetSystem();
}
const showTokenEffect = () => {
  slotMachine.value.TokenParticle.resetSystem();
}
const showFoodEffect = () => {
  slotMachine.value.FoodParticle.resetSystem();
}
const showValue = (v) => {
  slotMachine.value.LabelValue.show(v);
}

const emit = defineEmits(["rollClick", "scriptCompleted", "claimEnergyClick", "loaded"]);
defineExpose({
  roll,
  rollNextStep,
  setJackpotPrizes,
  setJackpotVisible,
  setButtonCloseVisible,
  rollJackpot,
  setVolume,
  flyEnergy,
  showGoldEffect,
  showTokenEffect,
  showFoodEffect,
  showValue
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
