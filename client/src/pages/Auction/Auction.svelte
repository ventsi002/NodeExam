<script>
    let auctionInformation = {}
    let shoe = {
        brand: null,
        name: null,
        model: null,
        colorway: null,
        size: null,
    }
    let auction = {
        description: null,
        bid: null,
        endDate: null,
        bidUser: null,
    }
    let photos = []

    const id = window.location.href.substring(31)

    async function loadAuction() {
        const response = await fetch(`http://localhost:8080/auctions/${id}`, {
            method: "GET",
            credentials: "include",
            headers: {
            "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        auctionInformation = data;
        auction = auctionInformation.shoes;
        auction = auctionInformation.auction;
        photos = auctionInformation.photos
        photos.forEach(photo => {photo.photoLocation.substring(16)});
    }

    loadAuction();

</script>

<div class="parent">
    {#await photos}
        {:then data}
            <div class="image">
                {#each data as photo, index}
                {#if index === 0}
                    <img class="main-photo" width="512px" height="512px" src={photo.photoLocation.substring(16)} alt="main-photo" >
                {:else}
                    <img on:click={() => 
                        {
                            [data[0].photoLocation, photo.photoLocation] = [photo.photoLocation, data[0].photoLocation]

                        }
                    } width="100px" height="100px" src={photo.photoLocation.substring(16)} alt="secondary-photos">
                {/if}
                {/each}
            </div>
    {/await}

    <div class="info">
        <h1>{auction.endDate}</h1>
            <div class="info-child">
                <h1>{auction.brand}</h1>
                <h1>{auction.name}</h1>
                <h1>{auction.model}</h1>
                <h1>{auction.colorway}</h1>
                <h1>{auction.size}</h1>
                <h1>{auction.description}</h1>
                <h1>{auction.bid}</h1>
                <h1>{auction.bidUser}</h1>
            </div>
    </div>

</div>

<style>
    .parent {
        font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
        display: inline-flex;
        color: #2f3e46;
        width: 100%;
    }

    .image {
        align-items: stretch
    }

    .info {
        justify-self: flex-end;
        text-align: center;
        width: 100%;
    }

    .info-child {
        flex-direction: column;
        position: absolute;
        border: 1px solid black ;
    }

</style>