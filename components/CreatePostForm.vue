<template>
    <div class="create p-10">
        <h1 class="create__heading text-5xl mb-10">{{ title }}</h1>
        <form
            class="create__form flex flex-col w-96"
            @submit.prevent="initializeCreatePost">
            <input
                v-model="titleInput"
                class="border-cyan-800 border-2 rounded-xl p-2 mb-10"
                type="text" />
            <textarea
                v-model="bodyInput"
                class="border-cyan-800 border-2 rounded-xl p-2 mb-10" />
            <Button
                :label="title"
                type="submit" />
        </form>
    </div>
</template>

<script setup lang="ts">
import { IPost } from '~~/types/post'
import { usePostsStore } from '~~/store/posts'
defineProps({ title: String, post: Number })
const postsStore = usePostsStore()
await postsStore.fetchPosts()

const titleInput = ref('')
const bodyInput = ref('')

const initializeCreatePost = () => {
    const newPost: IPost = {
        title: titleInput.value,
        body: bodyInput.value,
        id: postsStore.posts.length++,
        userId: postsStore.posts.length,
    }
    postsStore.createPost(newPost)
}
</script>

<style scoped></style>
