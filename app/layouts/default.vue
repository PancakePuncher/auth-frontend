<script setup lang="ts">
import { FooterComponent, HeaderComponent } from '#components';
const route = useRoute();

useHead({
  title: `${route.meta.title}`,
});
</script>

<template>
  <div class="flex flex-col h-screen justify-between items-center">
    <HeaderComponent />
    <slot />
    <FooterComponent />
  </div>
</template>
