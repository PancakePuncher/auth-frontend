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

const alertBool = ref<boolean>();

async function onSubmit(event: FormSubmitEvent<Schema>) {
  try {
    const res = await fetch(
      'https://api.pancakepuncher.com/api/v1/user/get_code',
      {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: event.data.email,
        }),
      },
    );

    if (!res.ok) {
      alertBool.value = false;
    }
    alertBool.value = true;
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
    <UFormField name="email" size="xl" required>
      <UInput
        v-model="email.email"
        trailing-icon="i-lucide-at-sign"
        placeholder="Enter your email"
        class="w-63"
      />
    </UFormField>
    <UAlert
      v-if="alertBool === true"
      title="Check your email!"
      description="If the email exist then a code has been sent to your email."
    />
    <UAlert
      v-if="alertBool === false"
      title="Error"
      color="error"
      description="Error with your request."
    />
    <div class="flex flex-col gap-4 mt-4">
      <UButton type="submit" class="w-63 justify-center">Get Code</UButton>
      <UButton
        to="/user/register"
        color="primary"
        variant="subtle"
        class="w-63 justify-center"
        >Register</UButton
      >
      <UButton
        to="/user/login"
        color="primary"
        variant="subtle"
        class="w-63 justify-center"
        >login</UButton
      >
    </div>
  </UForm>
</template>
