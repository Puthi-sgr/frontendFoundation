<script setup lang="ts">
import UserHeader from './core/layout/AppHeader.vue';
</script>

<template>
  <section class="app-layout">
    <UserHeader />
    <div class="main-content">
      <router-view />
    </div>
  </section>
</template>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
}

.main-content {
  display: grid;
}

.user-side-widget {
  width: 250px;
  /* Adjust as needed */
  padding: 1rem;
  border-right: 1px solid #ddd;
}
</style>
