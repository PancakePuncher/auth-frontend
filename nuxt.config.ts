// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/eslint', '@nuxt/ui'],

  typescript: {
    typeCheck: true,
  },

  app: {
    head: {
      title: "PancakePuncher's App",
      link: [
        {
          rel: 'apple-touch-icon',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'apple-touch-icon-precomposed',
          href: '/apple-touch-icon-precomposed.png',
        },
      ],
    },
  },

  vite: {
    server: {
      allowedHosts: ['vue.pancakepuncher.com'],
    },
  },
});
