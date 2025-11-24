<template>
    <div class="user-detail-page">
        <div class="header">
            <h1>User Detail</h1>
        </div>
        <div v-if="selectedUser" class="user-card">
            <div class="user-info">
                <div class="info-item">
                    <label>Index:</label>
                    <span>{{ index ?? 'N/A' }}</span>
                </div>
                <div class="info-item">
                    <label>Name:</label>
                    <span>{{ selectedUser.name }}</span>
                </div>
                <div class="info-item">
                    <label>Role:</label>
                    <span>{{ selectedUser.role }}</span>
                </div>
                <div class="info-item">
                    <label>Status:</label>
                    <span :class="selectedUser.status ? 'active' : 'inactive'">
                        {{ selectedUser.status ? 'Active' : 'Inactive' }}
                    </span>
                </div>
            </div>
        </div>
        <div v-else class="no-user">
            <p>No user selected.</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../stores/userStore';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router'; //This is vue router


const route = useRoute(); //Vue router is one for the whole app, if u use this, this means grabbing the Vue router, now you can access to what ever vue router is doing
const userStore = useUserStore();

const index = Number(route.params.index);
const { selectedUser } = storeToRefs(userStore);
</script>

<style scoped>
.user-detail-page {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    font-family: 'Arial', sans-serif;
    padding: 20px;
}

.header {
    margin-bottom: 40px;
}

.header h1 {
    font-size: 3rem;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3);
}

.user-card {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 15px;
    padding: 40px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(10px);
    max-width: 600px;
    width: 100%;
}

.user-info {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.info-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.5rem;
}

.info-item label {
    font-weight: bold;
    margin-right: 20px;
}

.info-item span {
    font-weight: normal;
}

.active {
    color: #4caf50;
}

.inactive {
    color: #f44336;
}

.no-user {
    text-align: center;
    font-size: 1.5rem;
    opacity: 0.8;
}
</style>
