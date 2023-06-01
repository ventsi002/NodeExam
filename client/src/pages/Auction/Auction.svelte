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

        timeDifference();
    }

    function timeDifference() {
        const endDate = new Date(auction.endDate);
        const currentTime = new Date();
        const difference = endDate - currentTime;
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);
        const timeElement = document.querySelector('.value-date');
        if (timeElement) {
            timeElement.textContent = `${days} d, ${hours} h, ${minutes} m, ${seconds} s`;
        }
        setInterval(timeDifference, 1000);

    }
    loadAuction();

</script>

<div class="parent">
    <div class="image-section">
        {#await photos}
            {:then data}
                <div class="image-container">
                    {#each data as photo, index}
                        {#if index === 0}
                            <img class="main-photo" width="512px" height="512px" src={photo.photoLocation.substring(16)} alt="main-photo">
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
    </div>

    <div class="time-info">
        <div class="date-section">
            <div class="detail">
                <span class="label">Ends in:</span>
                <span class="value-date">{auction.endDate}</span>
            </div>
        </div>

        <div class="info-column">
            <div class="info">
                <div class="detail">
                    <span class="label">Brand:</span>
                    <span class="value">{auction.brand}</span>
                </div>
                <div class="detail">
                    <span class="label">Name:</span>
                    <span class="value">{auction.name}</span>
                </div>
                <div class="detail">
                    <span class="label">Model:</span>
                    <span class="value">{auction.model}</span>
                </div>
                <div class="detail">
                    <span class="label">Colorway:</span>
                    <span class="value">{auction.colorway}</span>
                </div>
                <div class="detail">
                    <span class="label">Size:</span>
                    <span class="value">{auction.size}</span>
                </div>
                <div class="detail">
                    <span class="label">Current Bid:</span>
                    <span class="value">{auction.bid}</span>
                </div>
                <div class="detail">
                    <span class="label">Highest bidder:</span>
                    {#if auction.bidUser == null }
                    <span class="value">No bids yet</span>
                    {:else}
                    <span class="value">{auction.bidUser}</span>
                    {/if}
                </div>
            </div>
        </div>

        <div class="bid-section">
            <h2 class="bid-title">Place a Bid</h2>
            <input class="bid-input" type="number" placeholder="Enter your bid amount">
            <button class="bid-button">Submit Bid</button>
        </div>
    </div>

    <div>
        <div class="description">
            <h2 class="label">Description:</h2>
            <p class="value">{auction.description}</p>
        </div>
    </div>
</div>

<style>
    .parent {
        font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
        display: flex;
        color: #2f3e46;
        width: 100%;
        padding: 20px;
        justify-content: space-between;
    }

    .date-section {
        display: flex;
        font-size: 26px;
    }

    .info-column {
        display: flex;
        flex-direction: column;
    }

    .info {
        text-align: left;
        padding: 20px;
        margin-bottom: 20px;
        border-top: 3px solid #2f3e46;
        border-bottom: 3px solid #2f3e46;
        border-left: 1px solid #a4c3b2;
        border-right: 1px solid #a4c3b2;
    }

    .time-info {
        flex-direction: column;
        margin-left: 125px;
    }

    .detail {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }

    .label {
        font-weight: 600;
        margin-right: 10px;
    }

    .value {
        font-weight: 400;
        font-size: 18px;
    }

    .value-date {
        font-weight: 400;
        font-size: 24px;
    }

    .bid-section {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
    }

    .bid-title {
        font-size: 24px;
        margin-bottom: 10px;
    }

    .bid-input {
        padding: 10px;
        width: 300px;
        font-size: 18px;
        border: 1px solid #888888;
        border-radius: 4px;
        margin-bottom: 10px;
    }

    .bid-button {
        padding: 10px 20px;
        background-color: #1e88e5;
        color: #ffffff;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 20px;
    }

    .bid-button:hover {
        background-color: #1976d2;
    }

    .description {
        flex-direction: column;
        align-items: center;
        display: flex;
        width: 75%;
        margin-left: 125px;
    }
</style>