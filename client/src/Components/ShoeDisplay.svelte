<script>
    export let displayImage
    export let brand
    export let shoeName
    export let price
</script>

<div id="shoe-display">
    <img width="150px" height="150px" src={displayImage} alt=""/>
    <h4 id="brand">{brand}</h4>
    <p id="display-title">{shoeName}</p>
    <p id="price">€{price}</p>
</div>