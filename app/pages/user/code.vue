<script setup lang="ts">
import * as z from 'zod';
import type { FormSubmitEvent } from '@nuxt/ui';

definePageMeta({
  title: 'Registration Code',
});

const emailSchema = z.object({
  email: z.email('Email is required'),
});

type Schema = z.output<typeof emailSchema>;

const email = reactive<Partial<Schema>>({
  email: '',
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
          username: event.data.email,
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
    :schema="emailSchema"
    :state="email"
    class="flex flex-col items-center min-w-sm min-h-1/2 justify-center space-y-4"
    @submit="onSubmit"
  >
    <UFormField name="username" size="xl" required>
      <UInput
        v-model="email.email"
        trailing-icon="i-lucide-at-sign"
        placeholder="Enter your email"
        class="w-63"
      />
    </UFormField>
    <div class="flex flex-col gap-4 mt-4">
      <UButton type="submit" class="w-63 justify-center">Get Code</UButton>
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
