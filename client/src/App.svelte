<script>
  let selectedFile;
  const formData = new FormData();
  function handleFileChange(event) {
    selectedFile = event.target.files[0];
    formData.append('file', selectedFile);
  }

  function upload() {
    fetch("http://localhost:8080/shoes", {
      method: "POST",
      credentials: "include",
      body:formData
    });
  }
</script>

<h1>pedali</h1>
<input on:change={handleFileChange} class="fileUpload" type="file" name="file" />
<input type="submit" on:click={upload} />
