<template>
    <div class="col-12 col-xl-9">
        <Navbar :navbar="navbar" @clicked="$emit('hide', 'open')" />

        <div class="content">
            <div class="row">
                <div class="col-12">
                    <h2 class="content-title mb-4">Create Expense Type</h2>
                </div>

                <FormExpenseType />
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from "vue";

import FormExpenseType from "../../components/forms/FormExpenseType.vue";
import Navbar from "../../components/Navbar.vue";

export default {
    components: {
        FormExpenseType,
        Navbar,
    },
    setup() {
        const navbar = reactive({
            title: "Expense Type",
            link: "/expense-types",
        });

        return { navbar };
    },
};
</script>
