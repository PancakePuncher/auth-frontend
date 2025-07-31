<script setup lang="ts">
import * as z from 'zod';
import type { FormSubmitEvent } from '@nuxt/ui';

definePageMeta({
  title: 'User Login',
});

const showPassword = ref(false);

const userSchema = z.object({
  username: z.string().min(1, 'Invalid input'),
  password: z.string().min(1, 'Invalid input'),
});

type Schema = z.output<typeof userSchema>;

const userInfo = reactive<Partial<Schema>>({
  username: '',
  password: '',
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    const res = await fetch(
      'https://api.pancakepuncher.com/api/v1/user/register',
      {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: event.data.username,
          password: event.data.password,
        }),
      },
    );

    const outcome = await res.json();
    console.log(outcome);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log('Error:', error.message);
    } else {
      console.error('Unknown Error:', error);
    }
  }
}
</script>

<template>
  <UForm
    :schema="userSchema"
    :state="userInfo"
    class="flex flex-col items-center min-w-sm min-h-1/2 justify-center space-y-4"
    @submit="onSubmit"
  >
    <UFormField
      name="username"
      size="xl"
      class="flex flex-row justify-center w-full"
      required
    >
      <UInput v-model="userInfo.username" placeholder="Username" class="w-63" />
    </UFormField>
    <UFormField name="password" size="xl" required>
      <UInput
        v-model="userInfo.password"
        placeholder="Password"
        :type="showPassword ? 'text' : 'password'"
        :ui="{ trailing: 'pe-1' }"
        class="w-63"
      >
        <template #trailing>
          <UButton
            color="neutral"
            variant="link"
            size="sm"
            :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
            :aria-label="showPassword ? 'Hide password' : 'Show password'"
            :aria-pressed="showPassword"
            aria-controls="password"
            @click="showPassword = !showPassword" /></template
      ></UInput>
    </UFormField>
    <div class="flex flex-col gap-4 mt-4">
      <UButton type="submit" class="w-63 justify-center">Login</UButton>
      <UButton
        to="/user/register"
        color="primary"
        variant="subtle"
        class="w-63 justify-center"
        >Register</UButton
      >
    </div>
  </UForm>
</template>
