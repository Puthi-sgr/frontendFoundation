import { createRouter, createWebHistory } from 'vue-router'
import DashboardPage from '../modules/users/views/DashboardPage.vue';
import UserPage from '../modules/users/views/UserPage.vue'
import UserDetailPage from '../modules/users/views/UserDetailPage.vue';
import SettingsPage from '../modules/users/views/SettingPage.vue';

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
        path: '/users/:id',
        name: 'UserDetail',
        component: UserDetailPage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;