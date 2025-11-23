<template>
    <div class="user-page">
        <h1>User Page</h1>
        <UserBadge v-for="(user, index) in users" :key="user.name" :name="user.name" :role="user.role"
            :status="user.status" @status-changed="handleStatusChanged(index, $event)"
            @name-changed="handleNameChanged(index, $event)" />
        <!-- The $event is the payload from the  userBadge component and this parent will use it to work with the handleStatusChanged method -->
    </div>

</template>

<script setup lang="ts">
import UserBadge from '../components/user/UserBadge.vue';
import { reactive } from 'vue';

interface UserModel {
    name: string;
    role: string;
    status: boolean;
}

//index is like "FROM THAT INDEX IN THE ARRAY" 
function handleStatusChanged(index: number, newStatus: boolean) {
    const user = users[index];
    if (user) {
        user.status = newStatus;
    }
}

function handleNameChanged(index: number, newName: string) {
    const user = users[index];
    if (user) {
        user.name = newName;
    }
}

const users = reactive<UserModel[]>([
    { //Reactive is another way to achieve reactivity  but for objects this object will be wrapped in proxy to track changes so JS can know has specifically changed.
        name: "SPuthi",
        role: "Admin",
        status: true
        //These values are just initial values 
    },
    {
        name: "John Doe",
        role: "User",
        status: false
    },
    {
        name: "Jane Smith",
        role: "Moderator",
        status: true
    }
])

</script>

<style scoped>
.user-page {
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    width: 100%;
}
</style>