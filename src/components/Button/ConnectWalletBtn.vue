<script setup>
import btnConnectWallet from "@images/game/btn-connect-wallet.png";

const walletAddress = ref(null);

const connectWallet = async () => {
  try {
    const response = await authClient.signInPass({
      type: "eoa", // 'eoa' là Ethereum Account (Web3 Wallet)
    });

    if (response?.address) {
      walletAddress.value = response.address;
      console.log("Connected wallet:", response.address);
    }
  } catch (error) {
    console.error("Error connecting wallet:", error);
  }
};

const disconnectWallet = async () => {
  try {
    await authClient.signOutPass({
      flow: "redirect",
      postRedirectUri: "http://localhost:5177",
    });

    walletAddress.value = null;
    console.log("Disconnected wallet");
  } catch (error) {
    console.error("Error disconnecting wallet:", error);
  }
};
</script>

<template>
  <v-btn
    @click="connectWallet"
    color="transparent"
    flat
    class="tw-mx-auto tw-bg-cover tw-bg-center tw-bg-no-repeat tw-aspect-[387/104] tw-w-[53%] !tw-h-auto !tw-rounded-[12%] tw-overflow-hidden"
    :style="{ backgroundImage: `url(${btnConnectWallet})` }"
  >
  </v-btn>
</template>
