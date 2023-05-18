<script>
  import Navigation from "./Components/Navigation.svelte";
  import ShoeDisplay from "./Components/ShoeDisplay.svelte";

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
  function loadShoes()
  {
    fetch("http:/localhost:8080/shoes", {
      method: "GET",
      credentials: "include",
    })
  }

  }
</script>

<Navigation />
<ShoeDisplay displayImage={imagePath} shoeName={shoeNameB} price={priceB}/>

<h1>pedali</h1>
<input on:change={handleFileChange} class="fileUpload" type="file" name="file" />
<input type="submit" on:click={upload} />
