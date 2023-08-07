<template>
    <div class="col-12 statistics-card">
        <form @submit.prevent="handleSubmit">
            <div class="form-group mb-3">
                <label for="name" class="mb-2">
                    Name
                    <span class="required">*</span>
                </label>
                <input type="text" class="form-control" id="name" v-model="roleStore.data.role.name" />
            </div>

            <div class="d-flex justify-content-end">
                <button class="btn btn-sm btn-success">Save</button>
            </div>
        </form>
    </div>
</template>

<script>
import { onMounted } from "vue";
import { useRoleStore } from "../../stores/roles";
import { useRoute } from "vue-router";

export default {
    setup() {
        const roleStore = useRoleStore();
        const route = useRoute();

        const handleSubmit = async () => {
            await roleStore.save(roleStore.data.role, route.params.id);
        };

        const loadRole = async () => {
            await roleStore.show(route.params.id);
        };

        onMounted(() => {
            document.title = `Admin Panel - ${route.meta.title}`;
            if (route.params.id != undefined) {
                loadRole();
            }
        });

        return { roleStore, handleSubmit };
    },
};
</script>
