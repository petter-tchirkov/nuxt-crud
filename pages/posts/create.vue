<template>
    <div class="create p-10">
        <NuxtLink to="/">
            <Button
                label="Back to Home"
                size="small"
        /></NuxtLink>
        <h1 class="create__heading text-5xl mb-10">Create a new post</h1>
        <form
            class="create__form flex flex-col w-96"
            action="#">
            <input
                v-model="newPost.title"
                class="border-cyan-800 border-2 rounded-xl p-2 mb-10"
                type="text" />
            <textarea
                v-model="newPost.body"
                class="border-cyan-800 border-2 rounded-xl p-2 mb-10" />

            <Button
                label="Create Post"
                @click.prevent="postsStore.createPost(newPost)" />
        </form>
    </div>
</template>

<script setup lang="ts">
import { IPost } from '~~/types/post'
import { usePostsStore } from '~~/store/posts'
const postsStore = usePostsStore()
await postsStore.fetchPosts()

const newPost: IPost = {
    title: 'post title',
    body: 'post body',
    id: postsStore.posts.length + 1,
    userId: postsStore.posts.length + 1,
}
</script>

<style scoped></style>
