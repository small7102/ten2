<template>
    <div class="crumb">
        <Breadcrumb>
        <breadcrumbItem v-for="item in list" :to="item.to" :key="`bread-crumb-${item.name}`">
            {{item.meta.title}}
        </breadcrumbItem>
    </Breadcrumb>
    </div>
</template>

<script>
export default {
    name: 'CustomCrumb',
    props: {
        list: {
            type: Array,
            default: ()=>[]
        }
    },
    created(){
        console.log(this.list)
    }
}
</script>

<style lang="stylus">
    .crumb
        display: inline-block
</style>


