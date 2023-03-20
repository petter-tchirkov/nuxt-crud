<template>
    <div class="edit p-10">
        <h1 class="edit__heading text-5xl mb-10">{{ title }}</h1>
        <form
            class="edit__form flex flex-col w-96"
            @submit.prevent="initializeEditPost">
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
const props = defineProps({ title: String, post: Number })
const postsStore = usePostsStore()
await postsStore.fetchPosts()

const titleInput = ref('')
const bodyInput = ref('')

const initializeEditPost = () => {
    const editedPost: IPost = {
        title: titleInput.value,
        body: bodyInput.value,
        id: props.post as number,
        userId: props.post as number,
        date: useDateFormat(useNow(), 'YYYY.MM.DD') as any,
    }
    postsStore.editPost(editedPost)
}
</script>

<style scoped></style>
