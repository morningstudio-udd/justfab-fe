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
        <router-link class="menu-link" :to="{ path: '/game/referral' }">
          {{ $t("Invite Fab") }}
        </router-link>
      </div>

      <div
        class="menu tw-col-span-1 tw-row-span-2"
        :to="{ path: '/game/connect-wallet' }"
      >
        <router-link class="menu-link" :to="{ path: '/game/connect-wallet' }">
          {{ $t("Connect Futurepass") }}
        </router-link>
      </div>

      <div class="menu tw-col-span-1 tw-row-span-2">
        <span class="menu-link">
          {{ $t("???") }}
        </span>
      </div>

      <div class="menu tw-col-span-1 tw-row-span-2">
        <span class="menu-link">
          {{ $t("???") }}
        </span>
      </div>

      <div class="menu tw-col-span-2 tw-row-span-1">
        <span class="menu-link">
          {{ $t("???") }}
        </span>
      </div>

      <div class="menu tw-col-span-1 tw-row-span-1">
        <span class="menu-link">
          {{ $t("???") }}
        </span>
      </div>

      <div class="menu tw-col-span-1 tw-row-span-1">
        <router-link class="menu-link" :to="{ path: '/game/setting' }">
          {{ $t("Setting") }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<style lang="postcss" scoped>
.menu {
  @apply tw-bg-[#FFEFBF] tw-border-solid tw-border-[#953B0E]  tw-font-semibold tw-text-center;
  border-width: clamp(3px, 0.3vw, 6px);
  box-shadow: 0 0 20px 0 #ffefbf;
  border-radius: clamp(16px, 1.5vw, 46px);
  .menu-link {
    @apply tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center tw-no-underline tw-text-[#953C0F];
  }
}
</style>
