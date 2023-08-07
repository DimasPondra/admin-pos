<template>
    <div class="row d-flex justify-content-center h-100 mt-5">
        <div class="col-10 col-md-6 col-lg-4">
            <div class="alert alert-warning" role="alert">
                <h5>Account !</h5>
                <p class="mb-0"><small>Username: admin</small></p>
                <p class="mb-0"><small>Password: secret</small></p>
            </div>
            <div class="statistics-card">
                <form @submit.prevent="handleSubmit">
                    <div class="form-group mb-3">
                        <label for="username" class="mb-2">
                            Username
                            <span class="required">*</span>
                        </label>
                        <input type="text" class="form-control" id="username" v-model="crendential.username" />
                    </div>

                    <div class="form-group mb-3">
                        <label for="password" class="mb-2">
                            Password
                            <span class="required">*</span>
                        </label>
                        <input type="password" class="form-control" id="password" v-model="crendential.password" />
                    </div>

                    <div class="d-flex justify-content-end">
                        <button class="btn btn-sm btn-success">Sign In</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import { useAuthStore } from "../stores/auth";
import { reactive, onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
    setup() {
        const crendential = reactive({
            username: "",
            password: "",
        });

        const auth = useAuthStore();
        const route = useRoute();

        const handleSubmit = async () => {
            await auth.login(crendential);
        };

        onMounted(() => {
            document.title = `Admin Panel - ${route.meta.title}`;
        });

        return { crendential, handleSubmit };
    },
};
</script>
