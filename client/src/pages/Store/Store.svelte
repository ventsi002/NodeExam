<script>
    import { Link, Router } from "svelte-navigator";
    import ShoeDisplay from "../../Components/ShoeDisplay.svelte";
  
    let selectedFile;
    const formData = new FormData();
    function handleFileChange(event) {
      selectedFile = event.target.files[0];
      formData.append("file", selectedFile);
    }
  
    // Test 
    const imagePath = "images/Screenshot 2023-05-16 at 18.49.25.png"
    let shoeNameB = "Nike Air Force 1 Mid"
    let priceB = "32 Lea"
    function upload() {
      fetch("http://localhost:8080/shoes", {
        method: "POST",
        credentials: "include",
        body: formData,
      });
    }
    let shoes = []
    async function loadShoes()
    {
      const response = await fetch("http://localhost:8080/shoes", {
        method: "GET",
        credentials: "include",
      })
      const data = await response.json()
      shoes = data
    }
    loadShoes()
  </script>
  
<div id="shoes">
  <Router>
  {#await shoes}
    <p>Loading...</p>
      {:then data}
        {#each data as shoe}
        
        <div on:click = {()=>
        {
          console.log(shoe.name);
          
        }}>
        <Link to="shoes/{shoe.model}">
          <ShoeDisplay displayImage={shoe.photoLocation.substring(16)} brand={shoe.brand} shoeName={shoe.name} price={shoe.price}/>
        </Link>
        </div>
        {/each}
    {:catch error}
    <p>Error: {error.message}</p>
{/await}
</Router>
</div>
  