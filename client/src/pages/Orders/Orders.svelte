<script>
    import { each } from "svelte/internal";
    import { user } from "../../store/users";
    let orders = []

    async function updateOrder(id ,status)
    {
        const response = fetch(`http://localhost:8080/orders/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
        "Content-Type": "application/json",
        },
        body:JSON.stringify(
            {
                status: status
            }
        )
      })
    }


    async function getOrders()
    {
        if($user !== null)
        {
            if($user.role.role === "admin")
            {
                const response = await fetch("http://localhost:8080/orders", {
                    method: "GET",
                    credentials: "include",
                })
                orders = await response.json()
                console.log(orders)
            }
            else
            {
                const response = await fetch(`http://localhost:8080/orders/${$user.username}`, {
                    method: "GET",
                    credentials: "include",
                })
                orders = await response.json()
            }
        }
    }
    getOrders()
</script>
{#if $user !== null}
    <div id="table-wrap">
        <table>
            <thead>
                <th>Order number</th>
                <th>Brand</th>
                <th>Name</th>
                <th>Model</th>
                <th>Size</th>
                <th>Colorway</th>
                <th>Price</th>
                <th>Status</th>
            {#if $user.role.role === "admin" && $user !== null}
                <th>Username</th>
            {/if}
            </thead>
            {#if orders.length > 0}
                {#await orders}
                    {:then ordersLoaded} 
                        {#if $user !== null}
                            {#if $user.role.role === "admin"}
                                {#each ordersLoaded as order}
                                <tr>
                                    <td>{order.id}</td>
                                    <td>{order.brand}</td>
                                    <td>{order.model}</td>
                                    <td>{order.size}</td>
                                    <td>{order.colorway}</td>
                                    <td>€{order.price}</td>
                                    <td>
                                        <select bind:value={order.status}>
                                            <option value="Pending">Pending</option>
                                            <option value="In progress">In progress</option>
                                            <option value="Delivered">Delivered</option>
                                        </select>
                                    </td>
                                    <td>{order.username}</td>
                                    <td>
                                        <button on:click={()=> updateOrder(order.id, order.status)}>Update Order</button>
                                    </td>
                                </tr>
                                {/each}
                            {:else}
                                {#each ordersLoaded as order}
                                    <tr>
                                        <td>{order.id}</td>
                                        <td>{order.brand}</td>
                                        <td>{order.model}</td>
                                        <td>{order.size}</td>
                                        <td>{order.colorway}</td>
                                        <td>€{order.price}</td>
                                        <td>{order.status}</td>
                                    </tr>
                                {/each}
                            {/if}
                        {/if}
        
                {/await}
            {/if}
        </table>
    </div>
{/if}