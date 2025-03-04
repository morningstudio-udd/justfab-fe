<script setup>
import { onMounted } from 'vue';

  onMounted(async () =>{
    const initData = window.Telegram.WebApp.initData; // Extract the Telegram-provided data

    if (!initData) {
        console.error("No Telegram init data found!");
        return;
    }

    c

    // Send data to your backend for verification
    // const response = await fetch("https://your-server.com/auth", {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ initData }),
    // });

    // const result = await response.json();
    // console.log("User Authenticated:", result);
  })


</script>