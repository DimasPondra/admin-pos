<template>
    <div class="col-12 search-menu mb-4">
        <div class="row d-flex">
            <div class="col-12 col-md-3 d-flex">
                <input
                    type="text"
                    class="form-control border-0 shadow-sm"
                    name="name"
                    v-model="filter.name"
                    placeholder="Search name"
                />
            </div>

            <div class="col-12 col-md-3 d-flex">
                <button @click="clearFilter" class="btn btn-sm btn-warning">Clear</button>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        filter: {
            type: Object,
            default: () => {},
        },
    },
    setup(props, context) {
        const clearFilter = () => {
            context.emit("clear_filter");
        };

        return { clearFilter };
    },
};
</script>
