<template>
    <div class="flex-box">
        <span class="example">{{ msg }}</span>
        <button @click="changeMsg">更改文案</button>
        <img src="./assets/img/1.png" alt="">
    </div>
</template>

<script>
export default {
data() {
    return {
        msg: 'Hello world!',
    }
},
methods: {
    changeMsg() {
        this.msg = 'new msg'
    }
}
}
</script>

<style lang="scss" scoped>
.flex-box{
    display: flex;
    align-items: center;
}
.example{
    background-color: var(--mainColor);
    user-select: none;
    color: #333;
}
img{
    width: 50px;
}
</style>