<template>
    <aside :class="[
        'side-widget fixed right-4 top-1/4 z-50 hidden sm:block w-72 transition-transform transform',
        collapsed ? 'translate-x-full' : 'translate-x-0'
    ]" role="complementary" aria-label="User summary widget">
        <button class="collapse-btn" @click="toggle" :aria-expanded="!collapsed" aria-controls="user-summary-panel"
            title="Toggle user summary">
            <span v-if="collapsed">«</span>
            <span v-else">×</span>
        </button>

        <div id="user-summary-panel" class="summary-panel bg-white shadow-lg rounded-lg p-4 overflow-hidden">
            <header class="flex items-center justify-between mb-3">
                <h3 class="text-lg font-semibold">Users</h3>
                <a class="text-sm text-blue-600 hover:underline" href="/users" aria-label="Manage users">Manage</a>
            </header>

            <div class="grid grid-cols-1 gap-3">
                <div class="metric flex items-center justify-between border rounded-md px-3 py-2">
                    <div class="flex items-center gap-3">
                        <div
                            class="icon bg-blue-100 text-blue-600 rounded-full w-8 h-8 flex items-center justify-center">
                            👥</div>
                        <div>
                            <div class="text-lg font-semibold">{{ totalUsers }}</div>
                            <div class="text-xs text-gray-500">Total</div>
                        </div>
                    </div>
                </div>

                <div class="metric flex items-center justify-between border rounded-md px-3 py-2">
                    <div class="flex items-center gap-3">
                        <div
                            class="icon bg-green-100 text-green-600 rounded-full w-8 h-8 flex items-center justify-center">
                            ✅</div>
                        <div>
                            <div class="text-lg font-semibold">{{ activeCount }}</div>
                            <div class="text-xs text-gray-500">Active</div>
                        </div>
                    </div>
                </div>

                <div class="metric flex items-center justify-between border rounded-md px-3 py-2">
                    <div class="flex items-center gap-3">
                        <div class="icon bg-red-100 text-red-600 rounded-full w-8 h-8 flex items-center justify-center">
                            ⭐</div>
                        <div>
                            <div class="text-lg font-semibold">{{ adminCount }}</div>
                            <div class="text-xs text-gray-500">Admins</div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </aside>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useUserStore } from '../store/useUserStore';
import { storeToRefs } from 'pinia';

const collapsed = ref(false);
const toggle = () => (collapsed.value = !collapsed.value);

const userStore = useUserStore();
const { totalUsers, activeCount, adminCount } = storeToRefs(userStore); //Becomes reactive

onMounted(() => {
    userStore.loadUsers();
});
</script>

<style scoped>
.side-widget {
    /* ensure the transform origin stays on the right edge for smooth slide */
    transform-origin: right center;
    /* soften shadow and keep compact on the right */
}

/* collapse handle placed just outside the widget */
.collapse-btn {
    position: absolute;
    left: -2.25rem;
    top: 0.5rem;
    width: 2rem;
    height: 2rem;
    border-radius: 0.5rem;
    background: #ffffff;
    box-shadow: 0 6px 18px rgba(15, 23, 42, 0.06);
    border: 1px solid rgba(0, 0, 0, 0.06);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    font-size: 0.95rem;
    line-height: 1;
}

/* keep the widget off-canvas on mobile screens */
@media (max-width: 640px) {
    .side-widget {
        display: none;
    }
}

/* small visual tweaks */
.summary-panel {
    min-width: 18rem;
    max-width: 18rem;
}

/* nicer border for metric rows */
.metric {
    background: #fff;
}

/* smooth transform transition */
.side-widget {
    transition: transform 220ms cubic-bezier(.2, .9, .2, 1), box-shadow 180ms;
}
</style>