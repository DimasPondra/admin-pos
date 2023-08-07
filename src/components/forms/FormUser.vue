<template>
    <div class="col-12 statistics-card">
        <form @submit.prevent="handleSubmit">
            <div v-if="route.params.id == undefined">
                <div class="form-group mb-3">
                    <label for="username" class="mb-2">
                        Username
                        <span class="required">*</span>
                    </label>
                    <input type="text" class="form-control" id="username" v-model="userStore.data.user.username" />
                </div>
            </div>

            <div class="form-group mb-3">
                <label for="password" class="mb-2">
                    Password
                    <span class="required">*</span>
                </label>
                <input type="password" class="form-control" id="password" v-model="userStore.data.user.password" />
            </div>

            <div v-if="route.params.id == undefined">
                <div class="form-group mb-3">
                    <label for="role_id" class="mb-2">
                        Role
                        <span class="required">*</span>
                    </label>
                    <select id="role_id" class="form-select" v-model="userStore.data.user.role_id">
                        <option :value="null" selected disabled>Choose</option>
                        <option v-for="role in roleStore.data.roles" :key="role.id" :value="role.id">
                            {{ role.name }}
                        </option>
                    </select>
                </div>
            </div>

            <div class="d-flex justify-content-end">
                <button class="btn btn-sm btn-success">Save</button>
            </div>
        </form>
    </div>
</template>

<script>
import { useRoute } from "vue-router";
import { useRoleStore } from "../../stores/roles";
import { useUserStore } from "../../stores/users";
import { onMounted } from "vue";

export default {
    setup() {
        const userStore = useUserStore();
        const roleStore = useRoleStore();
        const route = useRoute();

        const handleSubmit = async () => {
            await userStore.save(userStore.data.user, route.params.id);
        };

        const loadRoles = async () => {
            await roleStore.get();
        };

        onMounted(() => {
            document.title = `Admin Panel - ${route.meta.title}`;
            loadRoles();
        });

        return { userStore, roleStore, route, handleSubmit };
    },
};
</script>
