
<template>
    <div class="content-top-bar">
        <h2 v-html="topTitle" :class="hasBorder ? 'l-border' : ''" class="title"></h2>
        <slot></slot>
    </div>
</template>

<script>
export default {
    props: {
        topTitle: {
            type: String,
            default: '我是一个标题'
        },
        hasBorder: {
            type: Boolean,
            default: true
        }
    }
}
</script>

<style lang="stylus" scoped>
    .content-top-bar
        display flex
        align-content center
        justify-content space-between
        margin-bottom 20px
    .l-border 
        border-left 2px solid #2395f1
        padding-left 10px
    .title
        font-size 24px
</style>


