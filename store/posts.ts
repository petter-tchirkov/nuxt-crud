import { defineStore } from 'pinia'

export const usePostsStore = defineStore('posts', () => {
    let posts = ref([] as Record<string, any>[])
    const fetchPosts = async () => {
        const { data }: any = await useFetch(
            'https://jsonplaceholder.typicode.com/posts'
        )
        if (data.value) {
            posts.value = data.value
        }
    }

    return { posts, fetchPosts }
})
