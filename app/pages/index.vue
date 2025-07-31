<script setup lang="ts">
definePageMeta({
  title: 'Home',
});

async function fetchData() {
  try {
    const res = await fetch(
      'https://api.pancakepuncher.com/api/v1/auth/validate',
      {
        method: 'GET',
        credentials: 'include',
      },
    );
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <div>
    <UButton @click="fetchData">Test</UButton>
  </div>
</template>
