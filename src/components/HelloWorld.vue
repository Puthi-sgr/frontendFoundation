<template>
  <div class="user-badge">
    <h2>{{ CardTitle }}</h2>
    <UserAvatar :username="user.name" />
    <p><strong>Name: </strong>{{ user.name }}</p>
    <p><strong>Role: </strong>{{ user.role }}</p>
    <p><strong>Status: </strong>{{ statusLabel }}</p>
    <!-- the @ and : is call a vue bind, they connect your stuff to the data and the method you have defined in the script-->
    <button
    @click="toggleStatus"
    :class="user.status ? 'btn-active' : 'btn-inactive'"
    >{{ statusLabel }}</button>
  </div>
</template>

<!-- Telling hey I am using typescript-->
<script setup lang="ts" >
import { ref, computed, reactive, watch } from 'vue';
import UserAvatar from './UserAvatar.vue';  

interface UserModel{
  name: string;
  role: string;
  status: boolean;
}

const CardTitle = ref("User card"); //Refs are like useState in React is also a way to achieve reactivity in Vue
const user = reactive<UserModel>({ //Reactive is another way to achieve reactivity  but for objects this object will be wrapped in proxy to track changes so JS can know has specifically changed.
  name: "SPuthi",
  role: "Admin",
  status: true
})
const statusLabel = computed<string>( //Compute is the result of calculation or derivation from other state
  () => {
    return user.status ? "IsActive" : "IsInactive";
  }
)

//Watch also a reactivity API that  for mostly logging 
watch(
  () => user.status, // Why () => because its a getter function wrapped by the proxy by reactive()
  (newStatus, oldStatus) => {
    console.log(`Status changed from ${oldStatus} to ${newStatus}`);
  }
)

const toggleStatus = () =>{
  user.status = !user.status;
}
</script> 

<style scoped> /* Scoped is to make sure style is only apply to this component and the child*/
/*As long as a child has its own scoped style those style will be overridden*/
.user-badge {
  border: 1px solid #ccc;
  padding: 16px;
  border-radius: 8px;
  width: 200px;
  text-align: center;
}
div {
  color: salmon;
}

.btn-active {
  background-color: #4caf50;
  color: white;
}

.btn-inactive {
  background-color: #f44336;
  color: white;
}
</style>