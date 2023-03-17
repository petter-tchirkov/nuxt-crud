<template>
    <div class="p-16 flex flex-col items-center">
        <div class="flex flex-col">
            <NuxtLink to="/"> <Button label="Back to Home" /></NuxtLink>
            <EditPostForm title="Edit" />
        </div>
        <h2 class="text-3xl mb-4">Post #{{ post.id }}</h2>
        <h1 class="text-5xl mb-10">{{ post.title }}</h1>
        <p class="text-3xl text-center">{{ post.body }}</p>
    </div>
</template>

<script setup lang="ts">
import { IPost } from '~~/types/post'
import { usePostsStore } from '~~/store/posts'
const postsStore = usePostsStore()
const route = useRoute()

const post = postsStore.posts[Number(route.params.post) - 1] as IPost
</script>

<style scoped></style>
