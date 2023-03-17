<template>
    <div class="create p-10">
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
            <button
                @click.prevent="createPost"
                class="p-4 border border-cyan-400 rounded-xl text-center mb-16"
                >Create Post</button
            >
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

const createPost = async () => {
    await $fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(newPost),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    }).then((response) => console.log(response))
}
</script>

<style scoped></style>
