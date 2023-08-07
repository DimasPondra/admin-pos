<template>
    <div class="col-12 col-xl-9">
        <Navbar :navbar="navbar" @clicked="$emit('hide', 'open')" />

        <div class="content">
            <div class="row">
                <div class="col-12">
                    <h2 class="content-title mb-4">Edit Salary</h2>
                </div>

                <FormSalary />
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from "vue";

import FormSalary from "../../components/forms/FormSalary.vue";
import Navbar from "../../components/Navbar.vue";

export default {
    components: {
        FormSalary,
        Navbar,
    },
    setup() {
        const navbar = reactive({
            title: "Salary",
            link: "/salaries",
        });

        return { navbar };
    },
};
</script>
