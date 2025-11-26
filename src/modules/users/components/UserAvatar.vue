<!--
1. First I want to define what does this component do exactly?
- okay it shows a initial of the username inside of a circle avatar
- So it needs prop from the user which is the name

2. So what should the parent pass to this?
- The parent should only the username for now

3. How can this component do its job? (Imperative)
- Splits the name by space
- Grab the first char

4. After doing its job what should it return to the parent?
- Just render in the parent class

-->

<template>
    <div class="avatar">
        {{  initial }}
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue"

const props = defineProps<{ //Define props is where we set the properties that this component wants to receive from its parent
    username: string; //This is read only, and the value is controlled by the parent
}>()

const initial = computed(() => (
    props.username ? props.username.charAt(0).toUpperCase() : "?"
))
</script>

<style scoped>
.avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    color: orange;
    user-select: none;
}
</style>