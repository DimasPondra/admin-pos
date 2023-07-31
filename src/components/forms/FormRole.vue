<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <input type="text" v-model="role.name" />
            <br />
            <button>Save</button>
        </form>
    </div>
</template>

<script>
import { reactive, onMounted } from "vue";
import { useRoleStore } from "../../stores/roles";
import { useRoute } from "vue-router";

export default {
    setup() {
        const role = reactive({
            name: "",
        });

        const roleStore = useRoleStore();
        const route = useRoute();

        async function handleSubmit() {
            await roleStore.save(role);
        }

        async function loadRole() {
            await roleStore.show(route.params.id);
        }

        onMounted(() => {
            if (route.params.id != undefined) {
                loadRole();
            }
        });

        return { role, handleSubmit };
    },
};
</script>
