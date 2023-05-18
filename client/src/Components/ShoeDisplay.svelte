<script>
    export let displayImage
    export let shoeName
    export let price
</script>

<div id="shoe-display">
    <img src={displayImage}/>
    <p id="display-title">{shoeName}</p>
    <p id="price">price: {price}</p>
</div>