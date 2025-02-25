<script setup>
import bgPopup from "@images/game/bg-popup.png";
import energy from "@images/game/energy.svg";
import btnClaim from "@images/game/btn-claim.svg";
import { emitter } from "@plugins/mitt";

const props = defineProps({
  width: {
    type: Number,
    default: 0,
  },
});

const resultDialog = ref(false);
const currentItem = ref(null);

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
            class="tw-aspect-[349/194] tw-w-[50.8%] tw-mb-[10%]"
            v-if="currentItem?.item?.item?.photoUrl"
          >
            <v-img
              :src="srcAsset(currentItem?.item?.item?.photoUrl)"
              width="100%"
              class=""
            />
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
