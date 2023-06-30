<template>
    <div class="example">{{ msg }}</div>
    <img src="./assets/img/1.png" alt="">
</template>

<script>
export default {
data() {
    return {
        msg: 'Hello world!',
    }
},
}
</script>

<style lang="scss" scoped>
.example{
    background-color: var(--mainColor);
    user-select: none;
    color: #333;
}
</style>