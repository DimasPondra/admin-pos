<template>
    <div class="col-12 col-xl-9">
        <Navbar :navbar="navbar" @clicked="$emit('hide', 'open')" />

        <div class="content">
            <div class="row">
                <div class="col-12">
                    <h2 class="content-title mb-4">Create Product</h2>
                </div>

                <FormProduct />
            </div>
        </div>
    </div>
</template>

<script>
import { reactive } from "vue";

import FormProduct from "../../components/forms/FormProduct.vue";
import Navbar from "../../components/Navbar.vue";

export default {
    components: {
        FormProduct,
        Navbar,
    },
    setup() {
        const navbar = reactive({
            title: "Product",
            link: "/products",
        });

        return { navbar };
    },
};
</script>
