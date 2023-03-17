<template>
    <div class="p-16 flex flex-col items-center">
        <NuxtLink
            to="/"
            class="p-4 border border-cyan-400 rounded-xl text-center mb-16"
            >back to home</NuxtLink
        >
        <h2 class="text-3xl mb-4">Post #{{ post.id }}</h2>
        <h1 class="text-5xl mb-10">{{ post.title }}</h1>
        <p class="text-3xl text-center">{{ post.body }}</p>
    </div>
</template>

<script setup lang="ts">
import { IPost } from '~~/types/post'
import { usePostStore } from '~~/store/post'
const route = useRoute()
const postStore = usePostStore()
console.log(typeof route.params.post)

await postStore.fetchPost(route.params.post)

const post = postStore.post as IPost
</script>

<style scoped></style>
