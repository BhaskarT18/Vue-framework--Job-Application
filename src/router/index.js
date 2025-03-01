import { createRouter, createWebHistory } from "vue-router";
import HomeView from '../view/HomeView.vue'
import JobView from "../view/JobView.vue";
import NotFoundJob from "../view/NotFoundJob.vue";
const router= createRouter(
    {
        history: createWebHistory(import.meta.env.Base_url),
        routes:[
            {
                path:'/',
                name: 'home',
                component : HomeView,
            },
            {
                path:'/jobs',
                name: 'jobs',
                component :JobView,
            },
            {
                path:'/:catchAll(.*)',
                name: 'notfound',
                component :NotFoundJob,
            },
        ]
    }
)


export default router;