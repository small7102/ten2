import Main from 'components/main'
import Login from 'components/login'
import MyComponent from 'components/my-component'

export default [
    {
        path: '/login',
        name: 'login',
        meta: {
            title: 'Login-登录',
            hideInMenu: true
        },
        component: Login
    },
    {
        path: '/',
        name: '_home',
        redirect: '/home',
        component: Main,
        meta: {
            hideInMenu: true,
            notCache: true
        },
        children: [
            {
                path: '/home',
                name: 'home',
                meta: {
                    hideInMenu: true,
                    title: '首页',
                    notCache: true
                },
                component: () => import('components/home')
            }
        ]
    },
    {
        path: '',
        name: 'doc',
        meta: {
            title: '文档',
            href: 'https://lison16.github.io/iview-admin-doc/#/',
            icon: 'ios-book'
        }
    },
    {
        path: '/user',
        name: 'user',
        meta: {
            hide: true
        },
        component: Main,
        children: [
            {
                path: 'setting',
                name: 'setting',
                meta: {
                    icon: 'md-person',
                    title: '个人中心'
                },
                component: () => import('components/home')
            }
        ]
    },
    {
        path: '/plugins',
        name: 'plugins',
        meta: {
            icon: '',
            title: '插件'
        },
        component: Main,
        children: [
            {
                path: 'vuex',
                name: 'vuex',
                meta: {
                    icon: '',
                    title: 'vuex'
                },
                children: [
                    {
                        path: 'state',
                        name: 'state',
                        meta: {
                            icon: '',
                            title: 'state'
                        },
                        component: () => import('components/home'),
                    },
                    {
                        path: 'getter',
                        name: 'getter',
                        meta: {
                            icon: '',
                            title: 'getter'
                        },
                        component: () => import('components/home'),
                    },
                    {
                        path: 'mutations',
                        name: 'mutations',
                        meta: {
                            icon: '',
                            title: 'mutations'
                        },
                        component: () => import('components/home'),
                    },
                    {
                        path: 'actions',
                        name: 'actions',
                        meta: {
                            icon: '',
                            title: 'actions'
                        },
                        component: () => import('components/home'),
                    }
                ]
            },
            {
                path: 'vour-router',
                name: 'router',
                meta: {
                    icon: '',
                    title: 'vue-router'
                },
                component: () => import('components/home')
            }
        ]
    },
    {
        path: '/frame',
        name: 'frame',
        meta: {
            icon: '',
            title: '框架'
        },
        component: Main,
        children: [
            {
                path: 'vue',
                name: 'vue',
                meta: {
                    icon: '',
                    title: 'vue'
                },
                component: () => import('components/home')
            },
            {
                path: 'react',
                name: 'react',
                meta: {
                    icon: '',
                    title: 'react'
                },
                component: () => import('components/home')
            },
            {
                path: 'angular',
                name: 'angular',
                meta: {
                    icon: '',
                    title: 'angular'
                },
                component: () => import('components/home')
            }
        ]
    },
    {
        path: '/component',
        name: 'component',
        meta: {
            hide: true
        },
        component: Main,
        children: [
            {
                path: 'component_page',
                name: 'component_page',
                meta: {
                    icon: 'ios-navigate',
                    title: '组件'
                },
                component: MyComponent
            }
        ]
    }
]

