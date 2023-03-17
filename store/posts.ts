import { IPost } from './../types/post'
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

    const createPost = async (newPost: IPost) => {
        const { data }: any = await useFetch(
            'https://jsonplaceholder.typicode.com/posts',
            {
                method: 'POST',
                body: JSON.stringify(newPost),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }
        )
        if (data.value) {
            posts.value.push(data.value)
            console.log(data.value)
        }
    }

    const deletePost = async (post: number) => {
        const { data }: any = await useFetch(
            `https://jsonplaceholder.typicode.com/posts/${post}`,
            {
                method: 'DELETE',
            }
        )
        if (data.value) {
            posts.value.splice(post - 1, 1)
            console.log(`psot #${post} was deleted`)
        }
    }

    return { posts, fetchPosts, createPost, deletePost }
})
