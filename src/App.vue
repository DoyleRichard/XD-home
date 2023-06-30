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

<style scoped>
.example {
    color: red;
}
</style>