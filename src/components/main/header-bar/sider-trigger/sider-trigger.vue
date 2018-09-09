<style lang="stylus" scoped>
    .sider-trigger-a
            width 40px
            display inline-block
            text-align center
            color #5c6b77
            padding-right 60px
</style>


<template>
  <a type="text" :class="['sider-trigger-a', collapsed ? 'collapsed' : '']"><Icon :type="icon" :size="size" /></a>
</template>

<script>
export default {
  name: "siderTrigger",
  props: {
    collapsed: Boolean,
    icon: {
      type: String,
      default: "navicon-round"
    },
    size: {
      type: Number,
      default: 26
    }
  }
};
</script>

