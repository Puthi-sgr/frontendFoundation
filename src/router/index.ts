import { createRouter, createWebHistory } from 'vue-router'
import DashboardPage from '../pages/DashboardPage.vue';
import UserPage from '../pages/UserPage.vue'
import UserDetailPage from '../pages/UserDetailPage.vue';
import SettingsPage from '../pages/SettingPage.vue'

//The route SoC is rendering THE PAGE not COMPONENT
//The This route here does not care about how the api works it just renders tell the vue router to render the corresponding page.
//Vue router does not care about how api works, if there are params, vue just pick from the url and plug it in to the API if prompt by the dev
const routes = [
    {
        path: '/',
        name: 'Dashboard',
        component: DashboardPage
    },
    {
        path: '/users',
        name: 'Users',
        component: UserPage
    },
    {
        path: '/settings',
        name: 'Settings',
        component: SettingsPage
    },
    {
        path: '/users/:index',
        name: 'UserDetail',
        component: UserDetailPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;