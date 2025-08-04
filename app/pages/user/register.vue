<script setup lang="ts">
import * as z from 'zod';
import type { FormSubmitEvent } from '@nuxt/ui';

definePageMeta({
  title: 'Register New User',
});

const maxUsernameLength = 18;
const showPassword = ref(false);
const alertBool = ref();

const regSchema = z
  .object({
    display_name: z
      .string()
      .min(1, 'Username is required')
      .max(
        maxUsernameLength,
        'Username Exceeds limit -- are you doing something nefarious?',
      ),
    email: z.email('Invalid Email').min(1, 'Email is required'),
    password: z.string('Invalid Password').min(1, 'Password is required'),
    confirmPassword: z.string().min(1, 'Password is required'),
    setupCode: z.string().min(1, 'Secret is required'),
  })
  .refine((info) => info.password === info.confirmPassword, {
    error: 'Passwords do not match!',
    path: ['confirmPassword'],
  });

type Schema = z.output<typeof regSchema>;

const newUserInfo = reactive<Partial<Schema>>({
  display_name: '',
  email: '',
  password: '',
  confirmPassword: '',
  setupCode: '',
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
          display_name: event.data.display_name,
          email: event.data.email,
          password: event.data.password,
          setupCode: event.data.setupCode,
        }),
      },
    );

    if (!res.ok) {
      alertBool.value = false;
    }
    await navigateTo('/user/login');
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
    :schema="regSchema"
    :state="newUserInfo"
    class="flex flex-col items-center min-w-sm min-h-1/2 justify-center space-y-4"
    @submit="onSubmit"
  >
    <UFormField name="email" size="xl" required>
      <UInput
        v-model="newUserInfo.email"
        trailing-icon="i-lucide-at-sign"
        placeholder="Email"
        class="w-63"
      />
    </UFormField>
    <UFormField name="username" size="xl" required>
      <UInput
        v-model="newUserInfo.display_name"
        placeholder="Username"
        :maxlength="maxUsernameLength"
        aria-describedby="character-count"
        :ui="{ trailing: 'pointer-events-none' }"
        class="w-63"
      >
        <template #trailing>
          <div
            id="character-count"
            class="text-xs text-muted tabular-nums"
            aria-live="polite"
            role="status"
          >
            {{ newUserInfo.display_name?.length }}/{{ maxUsernameLength }}
          </div>
        </template></UInput
      >
    </UFormField>
    <UFormField name="password" size="xl" required>
      <UInput
        v-model="newUserInfo.password"
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
    <UFormField name="confirmPassword" size="xl" required>
      <UInput
        v-model="newUserInfo.confirmPassword"
        placeholder="Confirm Password"
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
            aria-controls="confirmPassword"
            @click="showPassword = !showPassword"
        /></template>
      </UInput>
    </UFormField>
    <UFormField name="setupCode" size="xl" required>
      <UInput
        v-model="newUserInfo.setupCode"
        placeholder="Registration Secret"
        class="w-63"
      />
    </UFormField>
    <UAlert
      v-if="alertBool === false"
      title="Error"
      color="error"
      description="Error with your request."
    />
    <div class="flex flex-col gap-4 mt-4">
      <UButton type="submit" class="w-63 justify-center">Register</UButton>
      <UButton
        to="/user/login"
        color="primary"
        variant="subtle"
        class="w-63 justify-center"
        >login</UButton
      >
      <UButton
        to="/user/code"
        color="primary"
        variant="subtle"
        class="w-63 justify-center"
        >Get Registration Code</UButton
      >
    </div>
  </UForm>
</template>
