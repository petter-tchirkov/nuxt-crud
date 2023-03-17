<template>
    <div>
        <div class="post__create">
            <NuxtLink to="/posts/create">Create Post</NuxtLink>
        </div>
        <div class="posts p-40 grid grid-cols-4 gap-4">
            <NuxtLink
                :to="`/posts/${post.id}`"
                :params="{ title: post.title, id: post.id, body: post.body }"
                v-for="post in postsStore.posts"
                :key="post.id">
                <div
                    class="post__item flex flex-col gap-3 p-2 bg-gray-200 hover:bg-gray-300 border border-cyan-400 hover:border-cyan-800 transition-all rounded-xl cursor-pointer">
                    <span>{{ post.id }}</span>
                    <h2 class="post__title text-3xl text-center">{{
                        post.title
                    }}</h2>
                    <p class="post__body text-center">{{ post.body }}</p>
                    <div class="post__btns"> </div>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePostsStore } from '~~/store/posts'
const postsStore = usePostsStore()

await postsStore.fetchPosts()
</script>

<style scoped></style>
