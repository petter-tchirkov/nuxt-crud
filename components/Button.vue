<template>
    <button
        :class="[
            'border-2 border-blue-600 rounded-lg hover:bg-blue-600 hover:text-white',
            size === 'small' ? 'px-4 py-2' : 'px-10 py-4',
        ]"
        >{{ label }}</button
    >
</template>

<script setup lang="ts">
defineProps({ label: String, size: String })
</script>

<style scoped></style>
