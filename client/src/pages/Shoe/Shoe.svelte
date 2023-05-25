<script>
    import { each } from "svelte/internal";

    let shoeInformation = {}
    let shoe = {
        brand: null,
        name: null,
        price: null,
        model: null,
    }
    let photos = []
    let sizes = []

    let url = window.location.href.substring(28);

    async function loadShoe()
    {
      const response = await fetch(`http://localhost:8080/shoes/${url}`, {
        method: "GET",
        credentials: "include",
      })
      const data = await response.json()
      shoeInformation = data
      shoe = shoeInformation.shoe
      photos = shoeInformation.photos
      sizes = shoeInformation.sizes
      photos.forEach(photo => {
        photo.photoLocation = photo.photoLocation.substring(16)
        
      });
    }

    loadShoe()

</script>

<div class="parent">
    
    {#await photos}
        {:then data}
            <div class="image">
                {#each data as photo, index}
                {#if index === 0}
                    <img class="main-photo" width="512px" height="512px" src={photo.photoLocation} alt="main-photo" >
                {:else}
                    <img on:click={() => 
                        {
                            [data[0].photoLocation, photo.photoLocation] = [photo.photoLocation, data[0].photoLocation]

                        }
                    } width="100px" height="100px" src={photo.photoLocation} alt="secondary-photos">
                {/if}
                {/each}
            </div>
    {/await}
    
    <div class="info-size">
        <div class="info">
            <h1>{shoe.brand}</h1>
            <h2>{shoe.name}</h2>
            <h2>€{shoe.price}</h2>
        </div>
    <div class="sizes">
        {#await sizes}
            {:then data}
                {#each data as size}
                    {#if size.quantity !== 0}
                        <input type="radio" name="size" class="size" id="button{size.size}"><label for="button{size.size}" class="label-size">EU {size.size}</label>
                    {/if}
                    {#if size.quantity === 0}
                        <input type="radio" name="size" class="size" disabled id="button{size.size}"><label for="button{size.size}" class="label-size unavailable">EU {size.size}</label>
                    {/if}
                {/each}
        {/await}
            </div>
        </div>
    </div>
<div id="button-wrapper">
    <button>Buy</button>
</div>
<div id="description">
    <p>Model number: {shoe.model}</p>
    <p>Colorway: {shoe.colorway}</p>
</div>

<style>

    #description
    {
        position: absolute;
        right: 0;
        font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
        margin-right: 24.2vw;
    }
    .parent {
        font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
        display: inline-flex;
        color: #2f3e46;
    }

    .info {
        justify-self: flex-end;
        text-align: center;
        width: 100%;
    }

    .sizes {
        display: flex;
        justify-content:flex;
        flex-wrap: wrap;
    }

    .main-photo
    {
        margin-right: 30px
    }

    .info-size {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }

    .image {
        align-items: stretch
    }

    .label-size {
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        width: 120px;
        height: 60px;
        margin: 1px;
        position: relative;
        border-radius: 5px;
        font-size: 20px;
        border: 1px solid #cce3de;
    }   
    #button-wrapper
    {
        display: flex;
        justify-content: right;
        margin-top: -25vh;
        margin-right: 23vw;
    }
    button
    {
        background-color: #cce3de;
        width: 220px;
        height: 50px;
        border: 1px solid #a4c3b2;
        border-radius: 8px;
        font-size: 16px;
    }
    button:hover
    {
        background-color: #a4c3b2;
        cursor: pointer;
        border: 1px solid #a4c3b2;
    }
    .size {
        display: none;
    }

    input[type=radio]:checked + label.label-size{ 
        border: 1px solid #a4c3b2;
        background-color: #cce3de;
    }

    input[type=radio]:hover + label.label-size
    {
        background-color: #cce3de;
    }

    input[type=radio]:hover + label.unavailable
    {
        cursor: no-drop;
        background-color: #00000000;
    }
    input[type=radio] + label.unavailable
    {
        color: #cce3de;
    }
    img {
        cursor: pointer;
    }
</style>

