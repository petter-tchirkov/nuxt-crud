<template>
    <div class="create p-10">
        <h1 class="create__heading text-5xl mb-10">Create a new post</h1>
        <form
            class="create__form flex flex-col w-96"
            action="#">
            <input
                class="border-cyan-800 border-2 rounded-xl p-2 mb-10"
                type="text"
                placeholder="post title" />
            <textarea
                class="border-cyan-800 border-2 rounded-xl p-2"
                placeholder="post body" />
        </form>
    </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
