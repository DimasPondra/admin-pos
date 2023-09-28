<template>
    <div class="col-12 col-xl-9">
        <Navbar :navbar="navbar" @clicked="$emit('hide', 'open')" />

        <div class="content">
            <div class="row">
                <div class="col-12 statistics-card mb-0">
                    <div class="card">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-12 col-md-6">
                                    <h6 class="card-title">Name: {{ authStore.data.profile.username }}</h6>
                                </div>
                                <div class="col-12 col-md-6">
                                    <h6 class="card-title">Role: {{ authStore.data.profile.role.name }}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-12">
                    <h2 class="content-title mb-4">Change Password</h2>
                </div>

                <div class="col-12 statistics-card pt-1">
                    <div class="card">
                        <div class="card-body">
                            <form @submit.prevent="handleSubmit">
                                <div class="form-group mb-3">
                                    <label for="old_password" class="mb-2">
                                        Old Password
                                        <span class="required">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        class="form-control"
                                        id="old_password"
                                        v-model="form.old_password"
                                    />
                                </div>

                                <div class="form-group mb-3">
                                    <label for="new_password" class="mb-2">
                                        New Password
                                        <span class="required">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        class="form-control"
                                        id="new_password"
                                        v-model="form.new_password"
                                    />
                                </div>

                                <div class="form-group mb-3">
                                    <label for="old_password_confirmation" class="mb-2">
                                        New Password Confirmation
                                        <span class="required">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        class="form-control"
                                        id="old_password_confirmation"
                                        v-model="form.new_password_confirmation"
                                    />
                                </div>

                                <div class="d-flex justify-content-end">
                                    <button class="btn btn-sm btn-success">Save</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

                <div class="col-12">
                    <h2 class="content-title mb-4">Payrolls</h2>
                </div>

                <div class="col-12 statistics-card pt-1">
                    <div
                        class="col-12 col-md-4 card"
                        v-for="payroll in authStore.data.profile.payrolls"
                        :key="payroll.id"
                    >
                        <div class="card-body">
                            <div class="row">
                                <div class="col-12 col-md-6">
                                    <h6 class="card-title mb-0">Net Pay</h6>
                                </div>
                                <div class="col-12 col-md-6">
                                    <h6 class="card-title mb-0">Rp {{ payroll.net_pay }}</h6>
                                </div>
                            </div>
                            <div class="row mt-3">
                                <div class="col-12 col-md-6">
                                    <p class="m-0">{{ payroll.payment_date ?? "-" }}</p>
                                </div>
                                <div class="col-12 col-md-6">
                                    <span class="badge bg-warning text-dark p-2">{{ payroll.status }}</span>
                                </div>
                            </div>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item">
                                <div class="row">
                                    <div class="col-12 col-md-6">Basic Salary</div>
                                    <div class="col-12 col-md-6">Rp {{ payroll.basic_salary }}</div>
                                </div>
                            </li>
                            <li class="list-group-item">
                                <div class="row">
                                    <div class="col-12 col-md-6">Allowances</div>
                                    <div class="col-12 col-md-6">Rp {{ payroll.allowances }}</div>
                                </div>
                            </li>
                            <li class="list-group-item">
                                <div class="row">
                                    <div class="col-12 col-md-6">Tax</div>
                                    <div class="col-12 col-md-6">Rp {{ payroll.tax }}</div>
                                </div>
                            </li>
                            <!-- <li class="list-group-item">
                                {{ detail.amount }} <span v-if="detail.amount > 1">items</span> <span v-else>item</span>
                            </li> -->
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { computed, onMounted, reactive } from "vue";
import { useAuthStore } from "../../stores/auth";
import { useRoute } from "vue-router";

import Navbar from "../../components/Navbar.vue";

export default {
    components: { Navbar },
    setup() {
        const route = useRoute();
        const authStore = useAuthStore();
        const navbar = reactive({
            title: "Account Profile",
            link: null,
        });
        const form = reactive({
            old_password: "",
            new_password: "",
            new_password_confirmation: "",
        });

        const params = computed(() => {
            return {
                include: "role,file,payrolls",
            };
        });

        const loadAccountProfile = async () => {
            await authStore.show(params.value);
        };

        onMounted(() => {
            document.title = route.meta.title;
            loadAccountProfile();
        });

        const handleSubmit = async () => {
            await authStore.changePassword(form);

            form.old_password = "";
            form.new_password = "";
            form.new_password_confirmation = "";
        };

        return { authStore, form, navbar, handleSubmit };
    },
};
</script>
