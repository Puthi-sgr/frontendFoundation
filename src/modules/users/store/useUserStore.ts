//This pinia store is the main source of truth
//- Data lives here instead of in component reactive arrays
//- Data modification happens here, how? This store provide the methods(action) for the consumer(component) to call
//- Data is shared and access through this store
//- Maintanence stability, logic error? You just come to this store to correct logic
import { defineStore } from 'pinia';
import { computed, reactive, ref } from 'vue';
import { getUsers, getUserById } from '../api/usersApi'
import type { UserModel } from '../models/UserModel';

//Type union for filter options to ensure consistency
export type UserFilter = 'all' | 'admin' | 'user' | 'active' | 'inactive';

export const useUserStore = defineStore('userStore', () => {

    const users = reactive<UserModel[]>([]) //This here will act as a cache when we fetch a specific user from the list
    //Reactive is another way to achieve reactivity  but for objects this object will be wrapped in proxy to track changes so JS can know has specifically changed.
    const isLoaded = ref<boolean>(false); //State for the Entire user list
    const isError = ref<boolean>(false); //State for the Entire User list

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
    const selectUser = (userId: number) => {
        selectedIndex.value = users.findIndex((u: UserModel) => u.id === userId);
        console.log(`User at index ${selectedIndex.value} selected.`);
    }

    const toggleStatus = async (userId: number) => {
        const user = users.find((u: UserModel) => u.id === userId);
        if (user) {
            user.isLoaded = false;  // Set loading for this user
            user.isError = false;   // Reset error
            try {
                // Simulate API call (replace with actual updateUserStatus API)
                await new Promise(resolve => setTimeout(resolve, 1000));  // Mock delay
                user.status = !user.status;  // Update status
            } catch (error) {
                user.isError = true;  // Set error on failure
                console.error('Failed to toggle status:', error);
            } finally {
                user.isLoaded = true;  // Always reset loading
            }
        }
    }

    const renameUser = async (userId: number, newName: string) => {
        const user = users.find((u: UserModel) => u.id === userId);
        if (user) {
            user.isLoaded = false;  // Set loading for this user
            user.isError = false;   // Reset error
            try {
                // Simulate API call (replace with actual updateUserName API)
                await new Promise(resolve => setTimeout(resolve, 1000));  // Mock delay
                user.name = newName;  // Update name
            } catch (error) {
                user.isError = true;  // Set error on failure
                console.error('Failed to rename user:', error);
            } finally {
                user.isLoaded = true;  // Always reset loading
            }
        }
    }

    const setFilter = (newFilter: UserFilter) => {
        filter.value = newFilter;
    }

    const loadUsers = async () => {
        isLoaded.value = false; //Initially false cuz not yet fetch successfully
        isError.value = false;
        try {
            //Basically grab the first index till the last of the current user array and completely replace it with the value of get(Users);
            users.splice(0, users.length, ...(await getUsers()));
        } catch (error) {
            isError.value = true;
            console.error('Failed to fetch users:', error);
        } finally {
            isLoaded.value = true;
        }
    }

    const loadUserById = async (userId: number) => {
        if (isLoaded.value === true) {
            const cached = users.find((u: UserModel) => u.id === userId);
            if (cached) {
                return cached;
            }
        }

        //Initial
        isLoaded.value = false;
        isError.value = false;

        // 2) fallback to API
        try {
            const user = await getUserById(userId)  // returns UserModel
            return user
        } catch (e) {
            // handle error as you like
            return null
        }
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
        loadUsers,
        loadUserById,
        isLoaded,
        isError
    };
});
//Computed property to filter users based on the selected filter option

