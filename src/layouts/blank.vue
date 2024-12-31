<script setup></script>

<template>
  <div class="h-full">
    <RouterView #="{ Component }">
      <Component :is="Component" />
    </RouterView>
  </div>
</template>
