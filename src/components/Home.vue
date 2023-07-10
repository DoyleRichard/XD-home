<script setup lang="ts">
    import { ref } from 'vue';
    const hello = ref<string>('hello World!')
</script>

<template>
    <div>{{ hello }}</div>
</template>

<style scoped lang="scss">

</style>
