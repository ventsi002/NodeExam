<script>
import { user } from "../../store/users";
import { navigate } from "svelte-navigator";
import { onMount } from "svelte";

    let auctions = []

    function updateAuction(id, status)
    {
        const response = fetch(`http://localhost:8080/auctions/${id}?status=${status}`, {
        method: "PUT",
        credentials: "include",
        headers: {
        "Content-Type": "application/json",
        },
      })
    }

    function deleteAuction(id)
    {
        const response = fetch(`http://localhost:8080/auctions/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
        "Content-Type": "application/json",
        },
      })
    }


    async function loadAuctions()
    {
        if($user !== null)
        {
            if($user.role.role === "admin")
            {
                const response = await fetch("http://localhost:8080/admin/auctions", {
                    method: "GET",
                    credentials: "include",
                })
                auctions = await response.json()
            }
            else
            {
                const response = await fetch(`http://localhost:8080/auctions/${$user.username}`, {
                    method: "GET",
                    credentials: "include",
                })
                auctions = await response.json()
            }
            console.log(auctions)
        }
    }
    loadAuctions()
    onMount(async () => {
        loadAuctions()
  });


</script>

{#if user !== null}
<button on:click={()=>
{
    navigate("/account/auctions/create-auction")
}}>Create an auction</button>
<div id="table-wrap">
    <table>
        <thead>
            <th>ID</th>
            <th>Brand</th>
            <th>Name</th>
            <th>Model</th>
            <th>Size</th>
            <th>Colorway</th>
            <th>Current Bid</th>
            <th>Description</th>
            <th>End Date</th>
            <th>Current Highest Bidder</th>
            <th>Status</th>
        {#if $user !== null && $user.role.role === "admin"}
            <th>Auctioneer</th>
            <th></th>
            <th></th>
        {/if}
        </thead>
        {#await auctions}
            
            {:then auctionsLoaded} 
                {#if $user !== null}
                    {#if $user.role.role === "admin"}
                        {#each auctionsLoaded as auction}
                            <tr>
                                <td>{auction.auctionID}</td>
                                <td>{auction.brand}</td>
                                <td>{auction.name}</td>
                                <td>{auction.model}</td>
                                <td>{auction.size}</td>
                                <td>{auction.colorway}</td>
                                <td>€{auction.bid}</td>
                                <td style=" overflow: scroll; text-overflow: clip;">{auction.description}</td>
                                <td>{auction.endDate}</td>
                                <td>{#if auction.bidUser !== null}
                                        {auction.bidUser}
                                    {:else}
                                        No bids have been made
                                    {/if}
                                </td>
                                <td>
                                    <select bind:value={auction.status}>
                                        <option value="Awaiting Approval">Awaiting Approval</option>
                                        <option value="Active">Active</option>
                                        <option value="Finished">Finished</option>
                                    </select>
                                </td>
                                <td>{auction.auctioneer}</td>
                                <td>
                                    <button on:click={()=> updateAuction(auction.id, auction.status)}>Update Auction</button>
                                </td>
                                <td>
                                    <button on:click={()=> deleteAuction(auction.id)}>Delete Auction</button>
                                </td>
                            </tr>
                        {/each}
                    {/if}
                    {#if $user.role.role === "auctioneer"}
                            {#each auctionsLoaded as auction}
                                <tr>
                                    <td>{auction.auctionID}</td>
                                    <td>{auction.brand}</td>
                                    <td>{auction.name}</td>
                                    <td>{auction.model}</td>
                                    <td>{auction.size}</td>
                                    <td>{auction.colorway}</td>
                                    <td>€{auction.bid}</td>
                                    <td>{auction.description}</td>
                                    <td>{auction.endDate}</td>
                                    <td>{#if auction.bidUser !== null}
                                            {auction.bidUser}
                                        {:else}
                                            No bids have been made
                                        {/if}
                                    </td>
                                    <td>{auction.status}</td>
                                    <td>{auction.auctioneer}</td>
                                    <td>
                                        <button on:click={()=> updateAuction(auction.id, auction.status)}>Update Auction</button>
                                    </td>
                                </tr>
                            {/each}
                    {/if}
                {/if}
                
        {/await}
    </table>
</div>
{/if}
