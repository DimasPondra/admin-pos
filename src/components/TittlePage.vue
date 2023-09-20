<template>
    <div class="col-12 d-flex justify-content-between">
        <h2 class="content-title mb-4">List {{ title.name }}</h2>
        <div class="btn mb-2 mb-md-0" v-if="title.link_create != null">
            <router-link :to="title.link_create" class="btn btn-sm btn-primary"
                >Add new {{ titleLowerCase }}</router-link
            >
            <button v-if="title.generate == true" @click="handleGeneratePDF" class="btn btn-sm btn-warning ms-2">
                Generate PDF
            </button>
        </div>
    </div>
</template>

<script>
import { computed } from "vue";

export default {
    props: {
        title: {
            type: Object,
            default: () => {},
        },
    },
    emits: ["handleGeneratePDF"],
    setup(props, { emit }) {
        const titleLowerCase = computed(() => props.title.name.toLowerCase());

        const handleGeneratePDF = () => {
            emit("handleGeneratePDF");
        };

        return { titleLowerCase, handleGeneratePDF };
    },
};
</script>
