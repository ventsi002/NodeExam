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
      auctions.forEach(async auction => {
        const endDate = new Date(auction.endDate)
        const today = new Date()
        if(endDate < today)
        {
          auction.status = "Finished"
          await fetch(`http://localhost:8080/auctions/${auction.auctionID}?status=Finished`, {
            method: "PUT",
            credentials: "include",
            headers: {
            "Content-Type": "application/json",
            },
          })
        }  
      });
    }
    loadAuctions()
</script>
  
<div id="shoes">
  <Router>
  {#await auctions}
    <p>Loading...</p>
      {:then data}
        {#each data as shoe}
        {#if shoe.status !== "Finished"}
          <Link to="/auctions/{shoe.model}">
            <ShoeDisplay displayImage={shoe.photoLocation.substring(16)} brand={shoe.brand} shoeName={shoe.name} price={shoe.bid}/>
          </Link>
        {/if}
        {/each}
    {:catch error}
    <p>Error: {error.message}</p>
{/await}
</Router>
</div>
  