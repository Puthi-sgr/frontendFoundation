//This pinia store is the main source of truth
//- Data lives here instead of in component reactive arrays
//- Data modification happens here, how? This store provide the methods(action) for the consumer(component) to call
//- Data is shared and access through this store
//- Maintanence stability, logic error? You just come to this store to correct logic
import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';

export interface UserModel {
    name: string;
    role: string;
    status: boolean;
}

//Type union for filter options to ensure consistency
export type UserFilter = 'all' | 'admin' | 'user' | 'active' | 'inactive';

export const useUserStore = defineStore('userStore', () => {

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
            role: "Admin",
            status: true
        }
    ])

    const selectedIndex = ref<number | null>(null);
    const filter = ref<UserFilter>('all');
    //This is how approach filter, create  consistent type union for options

    //Getters // Mostly provide derived read data.

    //This method here is critical for rendering
    const filteredUsers = computed<UserModel[]>(() => {
        return users.filter(user => {
            switch (filter.value) {
                case 'admin':
                    return user.role.toLowerCase() === 'admin';
                case 'user':
                    return user.role.toLowerCase() === 'user';
                case 'active':
                    return user.status === true;
                case 'inactive':
                    return user.status === false;
                default:
                    return true; // 'all' case
            }
        })
    })

    const selectedUser = computed(() => {
        return selectedIndex.value !== null ? users[selectedIndex.value] : null;
    }) //Grab the user directly based on the index FROM the store


    const totalUsers = computed<number>(() => users.length);

    const activeCount = computed<number>(() => {
        return users.reduce((count, user) => user.status ? count + 1 : count, 0);
    })

    const adminCount = computed<number>(() => {
        return users.reduce((count, user) => user.role.toLowerCase() === 'admin' ? count + 1 : count, 0);
    })

    //Actions, the setter part of the store
    const selectUser = (index: number) => {
        selectedIndex.value = index;
        console.log(`User at index ${index} selected.`);
    }

    const toggleStatus = (index: number, newStatus: boolean) => {
        const user = users[index];
        if (user) {
            // Prevent deactivating if this would leave no active users
            if (!newStatus && activeCount.value === 1) {
                console.warn('Cannot deactivate the last active user.');
                return; // Or throw an error if preferred
            }
            user.status = newStatus;
        }
    }

    const renameUser = (index: number, newName: string) => {
        const user = users[index];
        if (user) {
            user.name = newName;
        }
    }

    const setFilter = (newFilter: UserFilter) => {
        filter.value = newFilter;
    }


    //Expose
    return {
        users,
        selectedIndex,
        filter,
        selectedUser,
        filteredUsers,
        totalUsers,
        activeCount,
        adminCount,
        selectUser,
        toggleStatus,
        renameUser,
        setFilter,
    };
});
//Computed property to filter users based on the selected filter option

