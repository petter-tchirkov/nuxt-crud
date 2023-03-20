import { IPost } from './../types/post'
import { useNotification } from '@kyvg/vue3-notification'
import { defineStore } from 'pinia'

export const usePostsStore = defineStore('posts', () => {
    let posts = ref([] as IPost[])
    const { notify } = useNotification()
    const fetchPosts = async () => {
        const { data } = await useFetch(
            'https://jsonplaceholder.typicode.com/posts'
        )
        if (data.value) {
            posts.value.map((post) => {
                post.date = useDateFormat(
                    Math.floor(Math.random() * Date.now()),
                    'YYYY.MM.DD'
                ) as any
            })
            posts.value = data.value as IPost[]
        }
    }

    const createPost = async (newPost: IPost) => {
        const { data } = await useFetch(
            'https://jsonplaceholder.typicode.com/posts',
            {
                method: 'POST',
                body: newPost,
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }
        )
        if (data.value) {
            posts.value.push(data.value as IPost)
            notify({
                title: 'Success',
                text: 'Post Created',
                type: 'success',
            })
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
            setTimeout(() => {
                notify({
                    title: 'Success',
                    text: 'Post Removed',
                    type: 'success',
                })
            }, 1000)
        }
    }

    const editPost = async (editedPost: IPost) => {
        const { data }: any = await useFetch(
            `https://jsonplaceholder.typicode.com/posts/${editedPost.id}`,
            {
                method: 'PATCH',
                body: {
                    title: editedPost.title,
                    body: editedPost.body,
                },
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            }
        )
        if (data.value) {
            posts.value[editedPost.id - 1] = editedPost
            setTimeout(() => {
                notify({
                    title: 'Success',
                    text: 'Post Edited',
                    type: 'success',
                })
            }, 1000)
        }
    }

    return { posts, fetchPosts, createPost, deletePost, editPost }
})
