<script setup>
import bgPopup from "@images/game/popup-blank.png";
import btnCopyInvte from "@images/game/btn-copy-invite.png";
import btnShareInvite from "@images/game/btn-share-invite.png";
import iconClose from "@images/game/icon-close.png";

const props = defineProps({
  width: {
    type: Number,
    default: 0,
  },
});

const resultDialog = ref(false);

const emit = defineEmits(["onConfirm", "onCancel"]);

const openDialog = () => {
  resultDialog.value = true;
};

const closeDialog = () => {
  emit("onCancel");
  resultDialog.value = false;
};

const submitDialog = () => {
  emit("onConfirm");
  resultDialog.value = false;
};

const submitCopyInvite = () => {
  console.log("submitCopyInvite");
};

const submitShareInvite = () => {
  console.log("submitShareInvite");
};

defineExpose({ openDialog, resultDialog, closeDialog });
</script>

<template>
  <v-dialog
    v-model="resultDialog"
    class=""
    content-class="popup-invite"
    max-width="766"
    :width="width"
    persistent
  >
    <IconBtn
      flat
      icon
      color="transparent"
      variant="elevated"
      class="tw-absolute tw-top-[7%] tw-right-[7%] tw-z-[1]"
      @click="closeDialog"
    >
      <v-img :src="iconClose" width="44" max-width="50%" />
    </IconBtn>

    <v-card
      class="!tw-rounded-2xl tw-px-4 tw-py-2 !tw-shadow-none !tw-bg-cover tw-bg-center tw-bg-no-repeat tw-aspect-[766/566]"
      :style="{ backgroundImage: `url(${bgPopup})` }"
      color="transparent"
      flat
    >
      <v-card-text class="tw-text-center !tw-px-[5%] !tw-pt-[23%]">
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<style lang="postcss" scoped></style>
