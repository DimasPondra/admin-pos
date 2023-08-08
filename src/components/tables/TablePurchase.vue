<template>
    <table class="table">
        <thead>
            <tr>
                <th>Product</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Price</th>
                <th>Seller</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="purchase in purchases" :key="purchase.id">
                <td>{{ purchase.product.name }}</td>
                <td>{{ purchase.date }}</td>
                <td>{{ purchase.amount }}</td>
                <td>{{ purchase.price }}</td>
                <td>{{ purchase.seller.name }}</td>
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
                                    :to="`/purchases/${purchase.id}/edit`"
                                    class="btn btn-sm btn-link w-100 text-start"
                                    >Edit</router-link
                                >
                            </li>
                            <li>
                                <button
                                    onclick="return confirm('Are you sure to delete?')"
                                    @click="handleDelete(purchase.id)"
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
        purchases: {
            type: Array,
            default: [],
        },
    },
    setup(props, context) {
        const handleDelete = (value) => {
            context.emit("delete_purchase", value);
        };

        return { handleDelete };
    },
};
</script>
