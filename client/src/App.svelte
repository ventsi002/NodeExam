<script>
    import { check_outros } from "svelte/internal";
  import Navigation from "./Components/Navigation.svelte";
  import ShoeDisplay from "./Components/ShoeDisplay.svelte";
  let shoes = []
  let selectedFile;
  const formData = new FormData();
  function handleFileChange(event) {
    selectedFile = event.target.files[0];
    formData.append("file", selectedFile);
  }
  async function loadShoes()
  {
    const response = await fetch("http://localhost:8080/shoes", {
      method: "GET",
      credentials: "include",
    })
    shoes = await response.json()
    console.log(typeof(shoes[0].photoLocation))

  }
  loadShoes()
  function upload() {
    fetch("http://localhost:8080/shoes", {
      method: "POST",
      credentials: "include",
      body: formData,
    });
  }
</script>
<Navigation />
<div id="display">
  {#await shoes}
    <p>Loading</p>
    {:then data}
      {#each data as shoe}
      <div on:click={() => {
        console.log(shoe.name);
      }}>
        <ShoeDisplay displayImage={shoe.photoLocation.replace("../client/public", "")} shoeName={shoe.name} price={shoe.price} brand={shoe.brand}/>
      </div>
      {/each}
    {:catch error}
      <p>Error: {error.message}</p>
  {/await}
</div>
  
<h1>pedali</h1>
<input on:change={handleFileChange} class="fileUpload" type="file" name="file" />
<input type="submit" on:click={upload} />
