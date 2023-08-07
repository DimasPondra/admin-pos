<template>
    <div class="col-12 col-xl-9">
        <Navbar :navbar="navbar" @clicked="$emit('hide', 'open')" />

        <div class="content">
            <div class="row">
                <div class="col-12">
                    <h2 class="content-title mb-4">Create Seller</h2>
                </div>

                <FormSeller />
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from "vue";

import FormSeller from "../../components/forms/FormSeller.vue";
import Navbar from "../../components/Navbar.vue";

export default {
    components: {
        FormSeller,
        Navbar,
    },
    setup() {
        const navbar = reactive({
            title: "Seller",
            link: "/sellers",
        });

        return { navbar };
    },
};
</script>
