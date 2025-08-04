<script setup lang="ts">
import * as z from 'zod';
import type { FormSubmitEvent } from '@nuxt/ui';

definePageMeta({
  title: 'User Login',
});

const showPassword = ref(false);
const alertBool = ref();

const userSchema = z.object({
  email: z.email(),
  password: z.string().min(1, 'Password is required'),
});

type Schema = z.output<typeof userSchema>;

const userInfo = reactive<Partial<Schema>>({
  email: '',
  password: '',
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    const res = await fetch(
      'https://api.pancakepuncher.com/api/v1/user/login',
      {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: event.data.email,
          password: event.data.password,
        }),
      },
    );
    if (!res.ok) {
      alertBool.value = false;
    }
    await navigateTo('/');
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
    <UFormField name="email" size="xl" required>
      <UInput
        v-model="userInfo.email"
        trailing-icon="i-lucide-at-sign"
        placeholder="Email"
        class="w-63"
      />
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
    <UAlert
      v-if="alertBool === false"
      title="Error"
      color="error"
      description="Login failed"
    />
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
