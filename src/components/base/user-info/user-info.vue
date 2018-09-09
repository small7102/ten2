import avatar from 'iview';
<template>
    <div class="user-info">
        <Avatar v-if="!hasUserAvatar" style="background-color: #87d068" icon="ios-person" />
        <avatar v-else :src="avatarUrl"/>
        <span v-html="userName"></span>
    </div>
</template>

<script>
export default {
    props: {
        hasUserAvatar: {
            type: Boolean,
            default: false
        },
        avatarUrl: {
            type: String,
            default: ''
        },
        userName: {
            type: String,
            default: "我是一个用户名"
        }
    }
}
</script>

