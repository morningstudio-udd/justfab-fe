<script setup>
const props = withDefaults(defineProps(), {
  location: "bottom end",
});

const { locale } = useI18n({ useScope: "global" });
</script>

<template>
  <IconBtn>
    <VIcon size="24" icon="tabler-language" />

    <!-- Menu -->
    <VMenu activator="parent" :location="props.location" offset="12px">
      <!-- List -->
      <VList :selected="[locale]" color="primary" min-width="175px">
        <!-- List item -->
        <VListItem
          v-for="lang in props.languages"
          :key="lang.i18nLang"
          :value="lang.i18nLang"
          @click="locale = lang.i18nLang"
        >
          <!-- Language label -->
          <VListItemTitle>{{ lang.label }}</VListItemTitle>
        </VListItem>
      </VList>
    </VMenu>
  </IconBtn>
</template>
