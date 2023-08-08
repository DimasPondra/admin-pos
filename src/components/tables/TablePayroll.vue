<template>
    <table class="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Basic Salary</th>
                <th>Allowances</th>
                <th>Tax</th>
                <th>Net Pay</th>
                <th>Payment Date</th>
                <th>Status</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="payroll in payrolls" :key="payroll.id">
                <td>{{ payroll.user.username }}</td>
                <td>{{ payroll.role }}</td>
                <td>{{ payroll.basic_salary }}</td>
                <td>{{ payroll.allowances }}</td>
                <td>{{ payroll.tax }}</td>
                <td>{{ payroll.net_pay }}</td>
                <td>{{ payroll.payment_date ?? "-" }}</td>
                <td>{{ payroll.status }}</td>
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
                                    :to="`payrolls/${payroll.id}/edit`"
                                    class="btn btn-sm btn-link w-100 text-start"
                                    >Edit</router-link
                                >
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
        payrolls: {
            type: Array,
            default: [],
        },
    },
};
</script>
