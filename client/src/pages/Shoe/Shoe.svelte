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
        {#each data.slice(1) as photo}
            <img width="512px" height="512px" src={data[0].photoLocation} alt="main-photo" >
        {/each}
        {#each data.slice(1) as photo}
            <div class="secondary-images">
                <img width="160px" height="170px" src={photo.photoLocation} alt="secondary-photos">
            </div>
        {/each}
    </div>
    {/await}
    
        <div class="info-size">
            <div class="info">
                <h1>{shoe.brand}</h1>
                <h2>{shoe.name}</h2>
                <h2>€{shoe.price}</h2>
                <h3>{shoe.model}</h3>
            </div>
            <div class="sizes">
                <input type="radio" name="size" class="size" id="button1"><label for="button1" class="label-size">EU 41</label>
                <input type="radio" name="size" class="size" id="button2"><label for="button2" class="label-size">EU 42</label>
                   <input type="radio" name="size" class="size" id="button3"><label for="button3" class="label-size">EU 40</label>
                <input type="radio" name="size" class="size" id="button4"><label for="button4" class="label-size">EU 69</label>
                <input type="radio" name="size" class="size" id="button5"><label for="button5" class="label-size">EU 60</label> 
                <input type="radio" name="size" class="size" id="button6"><label for="button6" class="label-size">EU 50</label>
                <input type="radio" name="size" class="size" id="button7"><label for="button7" class="label-size">EU 30</label>
                <input type="radio" name="size" class="size" id="button8"><label for="button8" class="label-size">EU 00</label>

            </div>
        </div>
    </div>
    <div id="button-wrapper">
        <button>Buy</button>
</div>
<style>

    .parent {
        font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
        display: flex;
        color: #2f3e46;
    }

    .info {
        justify-self: flex-end;
        text-align: center;
    }

    .sizes {
        display: flex;
        flex-wrap: wrap;
        /* flex-direction: column; */
    }

    .info-size {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }

    .image {
        display: flex;
        align-items: flex-start;
    }

    .secondary-images {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin-left: 10px;
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
        margin-top: -10vh;
        margin-right: 18vw;
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
        border: 1px solid #a4c3b2
    }
   
</style>