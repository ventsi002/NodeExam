<script>
  function upload() {
    fetch("http://localhost/8080/shoes", {
      method: "POST",
      credentials: "include",
    });
  }
</script>

<h1>pedali</h1>
<input type="file" name="file" />
<input type="submit" on:click={upload} />
