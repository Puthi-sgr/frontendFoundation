<template>
    <div class="user-page">
        <h1>User Page</h1>


        <router-link v-for="(user, index) in userStore.filteredUsers" :key="index" :to="`/users/${index}`">
            <UserBadge :name="user.name" :role="user.role" :status="user.status"
                @status-changed="handleStatusChanged(index, $event)" @name-changed="handleNameChanged(index, $event)"
                @select-user="handleSelectUser(index)">
                <router-link :to="`/user/${index}`">Go to User Detail page</router-link>
            </UserBadge>
        </router-link>

        <!-- The $event is the payload from the  userBadge component and this parent will use it to work with the handleStatusChanged method -->
        <button @click="userStore.setFilter('all')">All</button>
        <button @click="userStore.setFilter('active')">Active</button>
        <button @click="userStore.setFilter('admin')">Admins</button>
        <button @click="userStore.setFilter('inactive')">Inactive</button>
        <button @click="userStore.setFilter('user')">Users</button>
    </div>

</template>

<script setup lang="ts">
//We have a centeralized store that we can use now which is the pinia
//The page will be the heavy user why? 
//It will be the main source that pass down the data from the store
//In big apps/best practice, is that smaller components under this page should not have direct access to the store.
import UserBadge from '../components/user/UserBadge.vue';
import { useUserStore } from '../stores/userStore';

//This user page smaller component  will use data down events up approach  due to its small size, for bigger nested comps, component will directly access the store to avoid props drilling

//A store instance that consist of universal truth for USER data
const userStore = useUserStore(); //This is the centralized data, store, tools that this page can grab from


const handleStatusChanged = (index: number, newStatus: boolean) => {
    userStore.toggleStatus(index, newStatus);  //Calls the store method and mutate data , but store is the actual data changer
}

const handleNameChanged = (index: number, newName: string) => {
    userStore.renameUser(index, newName);
}

const handleSelectUser = (index: number) => {
    userStore.selectUser(index);
}

</script>

<style scoped>
.user-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    width: 100%;
}
</style>