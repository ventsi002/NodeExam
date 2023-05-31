<script>
    import { Router, Link } from "svelte-navigator";
    import ShoeDisplay from "../../Components/ShoeDisplay.svelte";

    let auctions = []
    
    async function loadAuctions()
    {
      const response = await fetch("http://localhost:8080/auctions", {
        method: "GET",
        credentials: "include",
      })
      const data = await response.json()
      auctions = data
    }
    loadAuctions()
</script>
  
<div id="shoes">
  <Router>
  {#await auctions}
    <p>Loading...</p>
      {:then data}
        {#each data as shoe}
        <Link to="/auctions/{shoe.model}">
          <ShoeDisplay displayImage={shoe.photoLocation.substring(16)} brand={shoe.brand} shoeName={shoe.name} price={shoe.bid}/>
        </Link>
        {/each}
    {:catch error}
    <p>Error: {error.message}</p>
{/await}
</Router>
</div>
  