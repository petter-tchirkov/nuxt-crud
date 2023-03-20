<template>
    <div class="flex flex-col justify-center pt-4">
        <div class="posts pt-40 px-4 grid gap-4">
            <Button
                label="Create Post"
                @click="createModalShown = !createModalShown" />
            <CreatePostForm
                title="Create a new Post"
                v-show="createModalShown" />
            <input
                type="text"
                v-model="filter"
                class="border-2 border-blue-600 rounded p-2"
                placeholder="Filter by Title" />
            <div class="pagination flex gap-4 justify-center">
                <div
                    class="pagination__item border border-blue-600 rounded p-2 hover:bg-blue-600 hover:text-white transition-all cursor-pointer"
                    :class="{ 'bg-blue-300': page === pageNumber }"
                    v-for="page in pages"
                    :key="page"
                    @click="pageClick(page)"
                    >{{ page }}</div
                >
            </div>
            <table class="table-auto">
                <thead class="border-b-4 border-b-blue-600">
                    <tr>
                        <th
                            class="hover:bg-blue-300 transition-all cursor-pointer"
                            v-for="head in tableHeads"
                            :key="head"
                            @click="sortByColumn(head as keyof IPost)"
                            >{{ head }}</th
                        >
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="post in postsStore.posts as IPost[]"
                        :key="post?.id"
                        class="cursor-pointer border-b-2 border-b-blue-600 hover:border-b-blue-300 transition-all"
                        @click="redirect(post.id)">
                        <td class="text-xs border-r-2 border-r-blue-600">{{
                            post?.id
                        }}</td>
                        <td class="text-xs border-r-2 border-r-blue-600">{{
                            post?.title
                        }}</td>
                        <td class="text-xs border-r-2 border-r-blue-600"
                            >{{ post?.body }}
                        </td>
                        <td
                            ><Button
                                label="delete"
                                @click.prevent.stop="
                                    postsStore.deletePost(post?.id)
                                "
                                size="small"
                        /></td>
                    </tr>
                </tbody>
            </table>
        </div>
        <notifications
            position="bottom right"
            ignore-duplicates />
    </div>
</template>

<script setup lang="ts">
import { usePostsStore } from '~~/store/posts'
import { IPost } from '~~/types/post'
const postsStore = usePostsStore()
const router = useRouter()
const createModalShown = ref(false)
const tableHeads = ['id', 'title', 'body', 'actions']

let usersPerPage = 10
let pageNumber = 1
const pages = computed(() => {
    return Math.ceil(postsStore.posts.length / usersPerPage)
})

const paginatedPosts = computed(() => {
    let from = (pageNumber - 1) * usersPerPage
    let to = from + usersPerPage
    return postsStore.posts.slice(from, to)
})

const pageClick = (page: number) => {
    pageNumber = page
    refresh()
}

const filter = ref('')

//filters won't work
const filteredPosts = computed(() => {
    return paginatedPosts.value.filter((post) => {
        return post.title.toLowerCase().indexOf(filter.value.toLowerCase()) > -1
    })
})

const sortColumn = ref('id')
const sortDirection = ref(1)
const sortByColumn = (col: keyof IPost) => {
    sortColumn.value = col
    sortDirection.value = -1 * sortDirection.value

    if (sortDirection.value === 1) {
        postsStore.posts.sort((a, b) => (a[col] > b[col] ? 1 : -1))
    } else {
        postsStore.posts.sort((a, b) => (a[col] < b[col] ? 1 : -1))
    }
    return 0
}

const { data, pending, error, refresh } = await useAsyncData(
    'posts',
    async () => {
        await postsStore.fetchPosts()
    }
)

const redirect = (id: number) => {
    router.push(`/posts/${id}`)
}
</script>

<style scoped></style>
