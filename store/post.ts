import { IPost } from './../types/post'
import { defineStore } from 'pinia'

export const usePostStore = defineStore('post', () => {
    let post = ref<IPost | null>(null)
    const fetchPost = async (postNumber: any) => {
        const { data }: any = await useFetch(
            `https://jsonplaceholder.typicode.com/posts/${postNumber}`
        )
        if (data.value) {
            post.value = data.value
        }
    }

    return { post, fetchPost }
})
