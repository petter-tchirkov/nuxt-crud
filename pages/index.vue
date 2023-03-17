<template>
    <div class="flex flex-col justify-center pt-4">
        <div class="posts pt-40 px-4 grid gap-4">
            <Button
                label="Create Post"
                @click="createModalShown = !createModalShown" />
            <CreatePostForm
                title="Create a new Post"
                v-show="createModalShown" />
            <NuxtLink
                :to="`/posts/${post.id}`"
                v-for="post in postsStore.posts as IPost[]"
                :key="post.id">
                <div
                    class="post__item flex flex-col gap-3 p-2 bg-gray-200 hover:bg-gray-300 border border-cyan-400 hover:border-cyan-800 transition-all rounded-xl cursor-pointer">
                    <span>{{ post.id }}</span>
                    <h2 class="post__title text-3xl text-center">{{
                        post.title
                    }}</h2>
                    <p class="post__body text-center">{{ post.body }}</p>
                    <div class="post__actions flex justify-around">
                        <Button
                            label="delete"
                            @click.prevent.stop="postsStore.deletePost(post.id)"
                            size="small" />
                    </div>
                </div>
            </NuxtLink>
        </div>
    </div>
</template>

<script setup lang="ts">
import { usePostsStore } from '~~/store/posts'
import { IPost } from '~~/types/post'
const postsStore = usePostsStore()
const createModalShown = ref(false)

const { data } = useAsyncData('posts', async () => {
    return postsStore.fetchPosts()
})
</script>

<style scoped></style>
