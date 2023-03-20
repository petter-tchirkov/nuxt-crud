import { defineNuxtPlugin } from '#app'
import Notification from '@kyvg/vue3-notification'

export default defineNuxtPlugin(({ vueApp }) => {
    vueApp.use(Notification)
})
