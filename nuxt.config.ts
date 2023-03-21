// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    pages: true,
    modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt'],
    plugins: [{ src: '~/plugins/notifications.client.ts', mode: 'client' }],
})
