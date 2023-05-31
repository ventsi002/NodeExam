<script>
    import { Router, Link } from "svelte-navigator";
    import ShoeDisplay from "../../Components/ShoeDisplay.svelte";

    let shoes = []
    async function loadShoes()
    {
      const response = await fetch("http://localhost:8080/auctions", {
        method: "GET",
        credentials: "include",
      })
      const data = await response.json()
      shoes = data
      console.log(shoes);
    }
    loadShoes()
  </script>
  
<div id="shoes">
  <Router>
  {#await shoes}
    <p>Loading...</p>
      {:then data}
        {#each data as shoe}
        <Link to="auctions/{shoe.model}">
          <ShoeDisplay displayImage={shoe.photoLocation.substring(16)} brand={shoe.brand} shoeName={shoe.name} price={shoe.price}/>
        </Link>
        {/each}
    {:catch error}
    <p>Error: {error.message}</p>
{/await}
</Router>
</div>
  