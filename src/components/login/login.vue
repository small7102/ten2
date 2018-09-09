<template>
    <div class="login">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">欢迎登录</p>
                <Form ref="formInline" :model="formInline" :rules="ruleInline">
                    <FormItem prop="user">
                        <Input type="text" v-model="formInline.user" placeholder="请输入用户名">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem prop="password">
                        <Input type="password" v-model="formInline.password" placeholder="请输入密码">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                        </Input>
                    </FormItem>
                    <FormItem>
                        <Button type="primary" @click="handleSubmit('formInline', submitData)" long size="large" :loading="loading">Signin</Button>
                    </FormItem>
                </Form>
            </Card>
        </div>
    </div>
</template>

<script>
    import {mapActions} from 'vuex'
    import {setToken} from 'src/libs/utils'

    export default {
        name: 'login',
        data () {
            return {
                loading: false,
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '用户名不能为空', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                        { type: 'string', min: 6, message: '密码不能少于6位', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            handleSubmit(name, callback) {
                this.loading=true;
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        callback();
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            submitData(){
                let account = this.formInline.user;
                let passwd = this.formInline.password;
                console.log(this.formInline)
                this.handleLogin(account, passwd).then(()=>{
                    this.$Message.success('Success!');this.$Message.success('Success!');
                    this.loading=false;
                    this.$router.push({name: 'home'})
                })
            },
            ...mapActions([
                "handleLogin"
            ])
        }
    }
</script>

<style lang="stylus" scoped>
    .login
        width 100%
        height 100%
        background-image url(https://file.iviewui.com/admin-dist/img/login-bg.0899ffa6.jpg)
        background-size cover
        background-position center
        position relative
        .login-con
            position absolute
            width 300px
            right 160px
            top 50%
            transform translateY(-60%)
</style>


