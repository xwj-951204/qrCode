import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes = [{
        path: '/',
        name: 'home',
        component: HomeView
    },
    {
        path: '/test',
        name: 'test',
        component: function() {
            return import ('../views/Test.vue')
        }
    }, {
        path: '/check/:num/',
        name: 'check',
        meta: {
            title: '测试页面'
        },
        component: () =>
            import ( /* webpackChunkName: "editor" */ '../views/Check.vue')
    }
]

const router = createRouter({
    history: createWebHashHistory(),
    routes
})

export default router