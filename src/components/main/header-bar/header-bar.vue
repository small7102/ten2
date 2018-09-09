<template>
    <div class="header-bar">
        <div class="left">
            <sider-trigger :collapsed="collapsed" icon="md-menu"></sider-trigger>
            <custom-crumb :list="breadcrumbList">               
            </custom-crumb>
        </div>
        <user-info class="right" :userName="userName"></user-info>
    </div>
</template>

<script>
import SiderTrigger from './sider-trigger'
import collapse from 'iview';
import UserInfo from 'src/components/base/user-info'
import CustomCrumb from './custom-crumb'
import { mapState, mapGetters } from 'vuex';

export default {
    name: 'HeaderBar',
    components: {
        SiderTrigger,
        UserInfo,
        CustomCrumb
    },
    data(){
        return {
            collapsed: true,
        }
    },
    computed:{
        ...mapGetters(['userName','breadcrumbList'])
    },
    mounted(){
        console.log(this.breadcrumbList)
    }
}
</script>

<style lang="stylus" scoped>
    .header-bar
        display flex
        align-items center
        justify-content space-between
        .left
            display flex
            align-items center   
</style>


