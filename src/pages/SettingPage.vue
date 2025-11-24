<template>
    <div class="settings-container">
        <div class="settings-card">
            <h1 class="settings-title">This is {{ userStore.selectedUser?.name ?? 'default' }} setting</h1>
            <div class="settings-options">
                <button class="settings-button">Update Profile</button>
                <button class="settings-button">Change Password</button>
                <button class="settings-button">Notification Settings</button>
                <button class="settings-button">Privacy Settings</button>
                <button class="settings-button logout-button">Logout</button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserStore } from '../stores/userStore';

const userStore = useUserStore();

</script>

<style scoped>
.settings-container {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.settings-card {
    background: rgba(255, 255, 255, 0.95);
    border-radius: 16px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
    padding: 2rem;
    max-width: 400px;
    width: 100%;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
}

.settings-title {
    color: #333;
    font-size: 2rem;
    font-weight: 600;
    text-align: center;
    margin: 0;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.settings-options {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2rem;
}

.settings-button {
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 8px;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    font-weight: 500;
    color: #333;
    cursor: pointer;
    transition: all 0.3s ease;
    backdrop-filter: blur(5px);
}

.settings-button:hover {
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
}

.logout-button {
    background: rgba(220, 53, 69, 0.8);
    color: white;
    border: 1px solid rgba(220, 53, 69, 0.3);
}

.logout-button:hover {
    background: rgba(220, 53, 69, 0.9);
    box-shadow: 0 4px 12px rgba(220, 53, 69, 0.3);
}
</style>