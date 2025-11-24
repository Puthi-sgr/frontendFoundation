<script setup lang="ts">
import UserPage from './pages/UserPage.vue'
import UserHeader from './components/user/UserHeader.vue';
import UserSummary from './components/user/UserSummary.vue';
</script>

<template>
  <section class="app-layout">
    <UserHeader />
    <div class="main-content">
      <UserSummary /> <!-- Add here for global sidebar -->
      <UserPage />
    </div>
  </section>
</template>

<style scoped>
.app-layout {
  display: flex;
  flex-direction: column;
}

.main-content {
  display: flex;
}

.user-side-widget {
  width: 250px;
  /* Adjust as needed */
  padding: 1rem;
  border-right: 1px solid #ddd;
}
</style>
