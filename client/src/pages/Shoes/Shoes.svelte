<script>

    import { navigate } from "svelte-navigator";

    let shoes = [];

    async function fetchShoes() {
        const response = await fetch("http://localhost:8080/shoes", {
           method: "GET",
           credentials: "include",
           headers: {
               "Content-type": "application/json",
           },
       })
       shoes = await response.json();    
    }
    fetchShoes();

    async function updateShoe(brand, name, model, colorway, quantity, price ) {
        const response = await fetch(`http://localhost:8080/shoes/${model}`, {
           method: "PUT",
           credentials: "include",
           headers: {
               "Content-type": "application/json",
           },
           body: JSON.stringify({
            brand: brand,
            name: name,
            model: model,
            colorway: colorway,
            quantity: quantity,
            price: price,
           }),
        })
    }


</script>
<div>
    <button on:click={() =>
    {
        navigate("/account/shoes/add-shoes")
    }}>QJ MI HUQ</button>

</div>

<div id="table-wrap">
    <table class="table">
        <tr>
            <th>Brand</th>
            <th>Name</th>
            <th>Model</th>
            <th>Colorway</th>
            <th>Quantity</th>
            <th>Price</th>
            <th></th>
            <th></th>
        </tr>
        
        
        {#each shoes as shoe }
        <tr>
            <td><input type="text" bind:value={shoe.brand}></td>
            <td><input type="text" bind:value={shoe.name}></td>
            <td><input type="text" bind:value={shoe.model}></td>
            <td><input type="text" bind:value={shoe.colorway}></td>
            <td><input type="text" bind:value={shoe.quantity}></td>
            <td><input type="text" bind:value={shoe.price}></td>
            <td><button on:click={() => updateShoe(shoe.brand, shoe.name, shoe.model, shoe.colorway, shoe.quantity, shoe.price)}>Update</button></td>
            <td><button>Delete</button></td>
        </tr>
        {/each}
    </table>
</div>
