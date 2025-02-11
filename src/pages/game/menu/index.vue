<script setup>
import bgConnectWallet from "@images/game/bg-connect-wallet.png";
import inputConnectWallet from "@images/game/input-connect-wallet.png";
import btnConnectWallet from "@images/game/btn-connect-wallet.png";

definePage({
  meta: {
    layout: "game",
    requiresAuth: true,
    subject: "User",
    action: "read",
  },
});

onMounted(() => {});
</script>

<template>
  <div
    class="game-content tw-flex-auto tw-flex tw-items-center tw-justify-center"
  >
    <div
      class="tw-aspect-[936/759] tw-w-[80%] tw-grid tw-grid-cols-3 tw-grid-rows-4 tw-gap-[6%]"
    >
      <div class="menu tw-col-span-1 tw-row-span-2">
        {{ $t("Invite Fab") }}
      </div>

      <div class="menu tw-col-span-1 tw-row-span-2">
        {{ $t("Connect Futurepass") }}
      </div>

      <div class="menu tw-col-span-1 tw-row-span-2">
        {{ $t("???") }}
      </div>

      <div class="menu tw-col-span-1 tw-row-span-2">
        {{ $t("???") }}
      </div>

      <div class="menu tw-col-span-2 tw-row-span-1">
        {{ $t("???") }}
      </div>

      <div class="menu tw-col-span-1 tw-row-span-1">
        {{ $t("???") }}
      </div>

      <div class="menu tw-col-span-1 tw-row-span-1">
        {{ $t("Setting") }}
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.menu {
  @apply tw-bg-[#FFEFBF] tw-border-solid tw-border-[#953B0E] tw-flex tw-items-center tw-justify-center tw-text-[#953C0F] tw-font-semibold tw-text-center;
  border-width: clamp(3px, 0.3vw, 6px);
  box-shadow: 0 0 20px 0 #ffefbf;
  border-radius: clamp(16px, 1.5vw, 46px);
  /* font-size: clamp(16px, 0.8em, 1em); */
}
</style>
