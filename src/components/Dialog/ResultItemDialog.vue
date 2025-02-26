<script setup>
import bgPopup from "@images/game/bg-popup.png";
import energy from "@images/game/energy.svg";
import btnClaim from "@images/game/btn-claim.svg";
import { emitter } from "@plugins/mitt";
import voucher from "@images/game/voucher.png";
import rarityMythic from "@images/game/rarity-mythic.png";

const props = defineProps({
  width: {
    type: Number,
    default: 0,
  },
});

const gameStore = useGameStore();

const resultDialog = ref(false);
const currentItem = ref(null);

const fontSizeBase = computed(() => gameStore.baseFontSize);
const widthDialog = computed(() => `${props.width}px`);

const emit = defineEmits(["onConfirm", "onClose"]);

onMounted(() => {
  emitter.on("show-reward", handleShowReward);
});

const openDialog = (item) => {
  currentItem.value = item;

  resultDialog.value = true;
};

const closeDialog = () => {
  emit("onClose");
  resultDialog.value = false;
};

const submitDialog = () => {
  emit("onConfirm");
  resultDialog.value = false;
};

const handleShowReward = (item) => {
  console.log("item", item);
  // if (resultDialog.value) {
  //   closeDialog();
  // }
  openDialog(item);
};

defineExpose({ openDialog, resultDialog, closeDialog });
</script>

<template>
  <v-dialog
    v-model="resultDialog"
    class=""
    content-class="popup-invite"
    max-width="731"
    :width="widthDialog"
    persistent
  >
    <v-card
      class="!tw-rounded-2xl tw-px-4 tw-py-2 !tw-shadow-none !tw-bg-cover tw-bg-center tw-bg-no-repeat tw-aspect-[731/705]"
      :style="{ backgroundImage: `url(${bgPopup})` }"
      color="transparent"
      flat
    >
      <v-card-text class="tw-text-center !tw-p-[3%]">
        <div
          class="tw-flex tw-flex-col tw-justify-center tw-items-center tw-h-full"
        >
          <div
            class="tw-aspect-[178/178] tw-w-[45%] tw-mb-[3%] tw-bg-cover tw-bg-center tw-bg-no-repeat tw-relative tw-flex tw-justify-center tw-items-center"
            :style="{ backgroundImage: `url(${rarityMythic})` }"
            v-if="currentItem?.type === REWARD_TYPES.POOL_PERCENTAGE"
          >
            <v-img :src="voucher" class="!tw-max-w-[75%] tw-w-full tw-h-auto" />
          </div>

          <div
            v-if="currentItem?.item?.item?.photoUrl"
            class="tw-aspect-[178/178] tw-w-[45%] tw-mb-[3%] tw-bg-cover tw-bg-center tw-bg-no-repeat tw-relative tw-flex tw-justify-center tw-items-center"
            :style="{
              backgroundImage: `url(${
                ITEM_RARITIES[currentItem?.item.item?.rarity].background
              })`,
            }"
          >
            <v-img
              :src="srcAsset(currentItem?.item?.item?.photoUrl)"
              class="!tw-max-w-[75%] tw-w-full tw-h-auto"
            />
          </div>

          <div
            class="tw-font-[DynaPuff] tw-mb-[10%]"
            :style="{
              fontSize: `${fontSizeBase * 1.2}px`,
            }"
          >
            {{ currentItem?.item?.item?.name }}
          </div>

          <v-btn
            flat
            color="transparent"
            class="tw-aspect-[352/113] tw-w-[51.23%] !tw-h-auto tw-bg-contain tw-bg-center tw-bg-no-repeat tw-relative tw-rounded-[10%] tw-overflow-hidden"
            :style="{ backgroundImage: `url(${btnClaim})` }"
            @click.stop="closeDialog"
          ></v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style lang="postcss" scoped></style>
