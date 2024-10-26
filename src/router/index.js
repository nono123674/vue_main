import { createRouter, createWebHistory } from 'vue-router'
import login from '@/views/login/index.vue'
import layout from '@/views/layout/index.vue'
import workspace from '@/views/workspace/index.vue'
import project from '@/views/project/index.vue'
import allProject from '@/views/project/allProject.vue'
import managedProject from '@/views/project/managedProject.vue'
import joinedProject from '@/views/project/joinedProject.vue'
import createProject from '@/views/createProject/index.vue'
import editProject from '@/views/editProject/index.vue'
import projectDetail from '@/views/projectDetail/index.vue'
import alltask from '@/views/projectDetail/alltask.vue'
import createTask from '@/views/createTask/index.vue'
import task_details from '@/views/task_details/index.vue'
import not_found from '@/views/login/not_found.vue'

const router = createRouter({
    history: createWebHistory(
        import.meta.env.BASE_URL),
    routes: [{
            path: '/',
            component: layout,
            meta: {
                requireAuth: true
            },
            children: [{
                    path: '',
                    component: workspace
                },
                {
                    path: 'project',
                    component: project,
                    children: [{
                            path: '',
                            component: allProject
                        },
                        {
                            path: 'managed',
                            component: managedProject
                        },
                        {
                            path: 'joined',
                            component: joinedProject
                        }
                    ]
                },
                {
                    path: 'createProject',
                    component: createProject
                },
                {
                    path: 'editProject/:id',
                    component: editProject
                },
                {
                    path: 'project/:id',
                    component: projectDetail,
                    children: [{
                        path: '',
                        component: alltask
                    }]
                },
                {
                    path: 'create_task',
                    component: createTask
                },
                {
                    path: 'task', //动态路由，任务id
                    component: task_details,
                    name: 'task_details',
                },
            ]
        },
        {
            path: '/login',
            component: login,
            meta: {
                requireAuth: false
            }
        },
        {
            path: '/:catchAll(.*)',
            //name: '/not_found'
            component: not_found
        }
    ]
})

export default router