<template>
    <div class="">
        <router-link to="/roles">Back</router-link>
    </div>
    <br />
    <form @submit.prevent="handleSubmit">
        <input type="text" v-model="roleStore.data.role.name" />
        <br />
        <button>Save</button>
    </form>
</template>

<script>
import { onMounted } from "vue";
import { useRoleStore } from "../../stores/roles";
import { useRoute } from "vue-router";

export default {
    setup() {
        const roleStore = useRoleStore();
        const route = useRoute();

        async function handleSubmit() {
            await roleStore.save(roleStore.data.role, route.params.id);
        }

        async function loadRole() {
            await roleStore.show(route.params.id);
        }

        onMounted(() => {
            if (route.params.id != undefined) {
                loadRole();
            }
        });

        return { roleStore, handleSubmit };
    },
};
</script>
