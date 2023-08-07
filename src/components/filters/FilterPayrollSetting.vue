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
                <select id="unit_type_id" v-model="filter.unit_type_id" class="form-control">
                    <option :value="null" selected disabled>Choose Product Type</option>
                    <option v-for="unit_type in unit_types" :key="unit_type.id" :value="unit_type.id">
                        {{ unit_type.name }}
                    </option>
                </select>
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
        unit_types: {
            type: Array,
            default: [],
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
