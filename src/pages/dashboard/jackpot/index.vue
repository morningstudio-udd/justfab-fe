<script setup>
import { template } from "@antfu/utils";

definePage({
  meta: {
    layout: "admin",
    requiresAuth: true,
    subject: "Admin",
    action: "manage",
    nav: "vertical",
  },
});

const appStore = useAppStore();
const adminStore = useAdminStore();

const loading = ref(false);

const currentRewards = ref([]);

onMounted(async () => {
  await getCurrentJackpot();
});

const getCurrentJackpot = async () => {
  try {
    loading.value = true;
    const configData = await getJackpot();

    currentRewards.value = configData.rewards;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
};

const submitSave = async () => {
  try {
    loading.value = true;
    const configData = {
      rewards: currentRewards.value,
    };

    const response = await setJackpot(configData);

    appStore.showNotiSnackbar({
      color: "success",
      message: response.message || "Save successfully.",
    });

    await getCurrentJackpot();
  } catch (error) {
    console.error(error);

    appStore.showNotiSnackbar({
      color: "error",
      message:
        error.message || "Error occurred. Please contact the administrator.",
    });
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="tw-flex tw-justify-between tw-items-center tw-mb-6">
    <h1 class="tw-text-2xl tw-font-semibold">{{ $t("Jackpot") }}</h1>

    <v-btn color="primary" @click="submitSave" :disabled="loading">
      <v-icon icon="mdi-content-save-outline" />
      {{ $t("Save") }}
    </v-btn>
  </div>
  <v-card class="!tw-rounded-2xl" :loading="loading">
    <v-card-text>
      <div
        class="tw-grid tw-grid-cols-1 md:tw-grid-cols-2 lg:tw-grid-cols-4 tw-gap-5"
      >
        <div
          v-for="(reward, columnIndex) in currentRewards"
          :key="columnIndex"
          class="tw-grid tw-gap-5"
        >
          <v-text-field
            v-model="reward.chance"
            :label="reward.description"
            outlined
            dense
            clearable
            hide-details="auto"
            suffix="%"
            :key="reward._id"
          />
        </div>
      </div>
    </v-card-text>
  </v-card>
</template>
