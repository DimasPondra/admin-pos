<template>
    <table class="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Nominal</th>
                <th>Unit Type</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="payroll_setting in payroll_settings" :key="payroll_setting.id">
                <td>{{ payroll_setting.name }}</td>
                <td>{{ payroll_setting.nominal }}</td>
                <td>{{ payroll_setting.unit_type.name }}</td>
                <td width="10%">
                    <div class="dropdown">
                        <button
                            class="btn btn-outline-primary dropdown-toggle"
                            type="button"
                            id="dropdownMenu"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        ></button>
                        <ul class="dropdown-menu" aria-labelledby="dropdownMenu">
                            <li>
                                <router-link
                                    :to="`payroll-settings/${payroll_setting.id}/edit`"
                                    class="btn btn-sm btn-link w-100 text-start"
                                    >Edit</router-link
                                >
                            </li>
                            <li>
                                <button
                                    onclick="return confirm('Are you sure to delete?')"
                                    @click="handleDelete(payroll_setting.id)"
                                    class="btn btn-sm btn-link w-100 text-start"
                                >
                                    Delete
                                </button>
                            </li>
                        </ul>
                    </div>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
export default {
    props: {
        payroll_settings: {
            type: Array,
            default: [],
        },
    },
    setup(props, context) {
        const handleDelete = (value) => {
            context.emit("delete_payroll_setting", value);
        };

        return { handleDelete };
    },
};
</script>
