<template>
    <div class="col-12 search-menu mb-4">
        <div class="row d-flex">
            <div class="col-12 col-md-3 d-flex mb-3">
                <input
                    type="text"
                    class="form-control border-0 shadow-sm"
                    name="name"
                    v-model="filter.name"
                    placeholder="Search name"
                />
            </div>

            <div class="col-12 col-md-3 d-flex mb-3">
                <select id="product_type_id" v-model="filter.status" class="form-control">
                    <option value="" selected disabled>Choose Status</option>
                    <option value="pending">Pending</option>
                    <option value="paid">Paid</option>
                </select>
            </div>

            <div class="col-12 col-md-3 d-flex mb-3">
                <select id="product_type_id" v-model="filter.month" class="form-control">
                    <option value="" selected disabled>Choose Month</option>
                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>
                </select>
            </div>

            <div class="col-12 col-md-3 d-flex mb-3">
                <input
                    type="text"
                    class="form-control border-0 shadow-sm"
                    name="year"
                    v-model="filter.year"
                    placeholder="Search year"
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
