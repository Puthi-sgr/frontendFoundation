<template>
  <div @click="selectUser" class="user-badge">
    <h2>{{ CardTitle }}</h2>

    <UserAvatar :username="user.name" />

    <p><strong>Name: </strong>{{ user.name }}</p>
    <p><strong>Role: </strong>{{ user.role }}</p>
    <p><strong>Status: </strong>{{ statusLabel }}</p>
    <!-- the @ and : is call a vue bind, they connect your stuff to the data and the method you have defined in the script-->
    <button @click="toggleStatus" :class="user.status ? 'btn-active' : 'btn-inactive'"
      :title="user.status ? 'Click to deactivate user' : 'Click to activate user'">{{ statusLabel }}</button>

    <input :title="user.status ? 'Changes available' : 'User is inactive, cannot change name'" :disabled="!user.status"
      v-model="mutableName" placeholder="Change Name" />
    <!--Two way binding, read from the properties,  when event input write back the properties-->
    <button v-if="user.status" @click="nameChangeHandler">Change Name</button>
  </div>
  <div v-if="!user.status">
    You cannot change name
  </div>
</template>

<!-- Telling hey I am using typescript-->
<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import UserAvatar from './UserAvatar.vue';

const user = defineProps<{
  name: string;
  role: string;
  status: boolean;
}>();
const emits = defineEmits<{ //Events to emit for the parent component to listen to
  //The new status is a payload send along with the event
  (e: 'status-changed', newStatus: boolean): void, //It can emit this event called status changed, when it does
  (e: 'name-changed', newName: string): void,
  //it is up for the parent to handle this emit or not
  (e: 'select-user'): void

}>();

const mutableName = ref(user.name);
const CardTitle = ref("User card"); //Refs are like useState in React is also a way to achieve reactivity in Vue

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

const nameChangeHandler = () => {
  const newName = mutableName.value;
  emits('name-changed', newName);
}
//When toggled this function will scream back to its parent 
const toggleStatus = () => {
  const newStatus = !user.status;
  emits('status-changed', newStatus); //This emits back to the parent.
}

const selectUser = () => {
  emits('select-user');
}
</script>

<style scoped>
/* Scoped is to make sure style is only apply to this component and the child*/
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