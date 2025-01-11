<script setup>
import cloneDeep from "lodash.clonedeep";
import { emitter } from "@plugins/mitt";

const modelValue = defineModel({
  prop: "modelValue",
  event: "update:modelValue",
});

const props = defineProps({
  itemFusedFrom: {
    type: Array,
    default: () => [],
    required: false,
  },
  itemFusedInto: {
    type: Array,
    default: () => [],
    required: false,
  },
});

const emit = defineEmits(["onSave", "onDelete"]);

const { t } = useI18n();
const adminStore = useAdminStore();

const isEdit = computed(() => Boolean(modelValue.value?._id));

const currentItem = ref({});

onMounted(() => {
  emitter.on("onSelectAsset", changePhotoUrl);
});

const submitSave = () => {
  console.log("item form save");
  emit("onSave", currentItem.value);
};

const submitDelete = () => {
  emit("onDelete");
};

const changePhotoUrl = (asset) => {
  currentItem.value.photoUrl = asset;
};

onUnmounted(() => {
  emitter.off("onSelectAsset", changePhotoUrl);
});

watch(
  modelValue,
  (newVal) => {
    currentItem.value = cloneDeep(newVal) || {};

    if (!currentItem.value.stats) {
      currentItem.value.stats = { hp: 0, attack: 0, defense: 0, luck: 0 };
    }
  },
  { deep: true, immediate: true }
);
</script>

<template>
  <div>
    <v-form>
      <div class="tw-grid tw-gap-4 tw-grid-cols-1">
        <v-text-field
          v-model="currentItem.name"
          :label="$t('Name')"
          outlined
          dense
          clearable
          hide-details="auto"
        />

        <v-textarea
          v-model="currentItem.description"
          :label="$t('Description')"
          outlined
          dense
          clearable
          hide-details="auto"
        />

        <v-text-field
          v-model="currentItem.photoUrl"
          :label="$t('Photo URL')"
          outlined
          dense
          clearable
          hide-details="auto"
        >
          <template #append>
            <v-btn
              color="primary"
              @click="adminStore.assetsManagerDialog = true"
            >
              {{ $t("Upload") }}
            </v-btn>
          </template>
        </v-text-field>

        <v-select
          v-model="currentItem.rarity"
          :label="$t('Rarity')"
          outlined
          dense
          hide-details="auto"
          :items="Object.values(ITEM_RARITIES)"
        />

        <div class="tw-grid tw-gap-4 tw-grid-cols-2 sm:tw-grid-cols-4">
          <v-text-field
            v-model="currentItem.stats.hp"
            :label="$t('HP')"
            outlined
            dense
            clearable
            hide-details="auto"
            type="number"
          />

          <v-text-field
            v-model="currentItem.stats.attack"
            :label="$t('Attack')"
            outlined
            dense
            clearable
            hide-details="auto"
            type="number"
          />

          <v-text-field
            v-model="currentItem.stats.defense"
            :label="$t('Defense')"
            outlined
            dense
            clearable
            hide-details="auto"
            type="number"
          />

          <v-text-field
            v-model="currentItem.stats.luck"
            :label="$t('Luck')"
            outlined
            dense
            clearable
            hide-details="auto"
            type="number"
          />
        </div>

        <v-select
          v-model="currentItem.category"
          :label="$t('Category')"
          outlined
          dense
          hide-details="auto"
          :items="Object.values(ITEM_CATEGORIES)"
        />

        <div>
          <label>{{ $t("Fused from") }}</label>

          <template v-if="itemFusedFrom.length">
            <div
              class="tw-flex tw-flex-wrap tw-gap-4 tw-items-stretch"
              v-for="item in itemFusedFrom"
            >
              <template v-if="item.requiredItems">
                <template
                  v-for="itemId in item.requiredItems"
                  :key="`required-${itemId}`"
                >
                  <item-block
                    :item="adminStore.getItemById(itemId)"
                    class=""
                    :modelValue="adminStore.getItemById(itemId)"
                  >
                  </item-block>
                </template>
              </template>
            </div>
          </template>
        </div>

        <div>
          <label>{{ $t("Fused into") }}</label>

          <template v-if="itemFusedInto.length">
            <div
              class="tw-flex tw-flex-wrap tw-gap-4 tw-items-stretch"
              v-for="item in itemFusedInto"
            >
              <item-block
                :item="adminStore.getItemById(item.resultItem)"
                class=""
                :modelValue="adminStore.getItemById(item.resultItem)"
              >
              </item-block>
            </div>
          </template>
        </div>
      </div>
      <div class="tw-flex tw-flex-wrap tw-mt-4 tw-gap-4 tw-justify-end">
        <v-btn
          color="error"
          variant="outlined"
          :disabled="!currentItem || Object.keys(currentItem).length === 0"
          @click="submitDelete"
        >
          {{ $t("Delete") }}
        </v-btn>

        <v-btn color="primary" @click="submitSave">
          {{ $t("Save") }}
        </v-btn>
      </div>
    </v-form>
  </div>
</template>
