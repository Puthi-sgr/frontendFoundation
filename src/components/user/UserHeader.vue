<template>
    <header class="user-header">
        <div class="logo">
            <h1>{{ userStore.selectedUser?.name ?? 'User' }} Dashboard</h1>
        </div>
        <nav>
            <ul>
                <li><a href="#">Home</a></li>
                <li><a href="#">Profile</a></li>
                <li><a href="#">Logout</a></li>
            </ul>
        </nav>
    </header>
</template>

<script setup lang="ts">
import { useUserStore } from '../../stores/userStore';

const userStore = useUserStore();
</script>

<style scoped>
.user-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: #333;
    color: white;
}

.logo h1 {
    margin: 0;
}

nav ul {
    list-style: none;
    display: flex;
    gap: 1rem;
    margin: 0;
}

nav a {
    color: white;
    text-decoration: none;
}
</style>