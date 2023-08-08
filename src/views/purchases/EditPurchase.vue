<template>
    <div class="col-12 col-xl-9">
        <Navbar :navbar="navbar" @clicked="$emit('hide', 'open')" />

        <div class="content">
            <div class="row">
                <div class="col-12">
                    <h2 class="content-title mb-4">Edit Purchase</h2>
                </div>

                <FormPurchase />
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from "vue";

import FormPurchase from "../../components/forms/FormPurchase.vue";
import Navbar from "../../components/Navbar.vue";

export default {
    components: {
        FormPurchase,
        Navbar,
    },
    setup() {
        const navbar = reactive({
            title: "Purchase",
            link: "/purchases",
        });

        return { navbar };
    },
};
</script>
