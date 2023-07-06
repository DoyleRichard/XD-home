<script setup lang="ts">
    import { ref } from 'vue';
    const message = ref<string>('123')
</script>

<template>
    <div>{{ message }}</div>
</template>

<style lang="scss" scoped>
</style>