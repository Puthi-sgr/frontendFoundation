<template>
    <div class="user-activity-banner">
        <h3>User Activity</h3>
        <p>The User is active {{ numberOfSeconds }} seconds ago</p>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, onUpdated } from 'vue'

const numberOfSeconds = ref<number>(0);
const intervalId = ref<number | null>(null);


//Hey during mounting of this component, I want a continuous interval that runs every second and within that interval I want this state (numberOFSeconds) to increment by 1
onMounted(() => {
    intervalId.value = setInterval(() => {
        numberOfSeconds.value += 1;
        console.log(`User active for ${numberOfSeconds.value} seconds`);
    }, 1000);
})

//When you switch router and stuff, now you gotta clean up the mess you created during your mount type shit
onUnmounted(() => {
    //The reason with check !null is because we set a type for the intervalId as number | null meaning that the ID can be null at some point(Initially)
    if (intervalId.value !== null) {
        clearInterval(intervalId.value);
        console.log("Type shitt im outttt")
    }
})
onUpdated(() => {
    console.log("UserActivityBanner component updated");
})
</script>

<style scoped>
.user-activity-banner {
    background-color: #f0f0f0;
    padding: 1rem;
    border-radius: 4px;
    text-align: center;
}
</style>