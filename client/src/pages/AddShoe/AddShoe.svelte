<script>
// @ts-nocheck

    import { append } from "svelte/internal";

    import toastr from "toastr"
    import "toastr/build/toastr.min.css";

    let brand;
    let name;
    let model;
    let colorway;
    let quantity;
    let size;
    let price;
    let file;
    const formData = new FormData();

    function addShoe(event) {
        event.preventDefault();

        if(!brand || !name || !model || !colorway || !quantity || !size || !price || !file) {
            toastr["error"]("Missing information");
            
            toastr.options = {
                "closeButton": false,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-top-right",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "500",
                "timeOut": "1500",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            }
        }
        else{
            formData.append('brand', brand);
            formData.append('name', name);
            formData.append('model', model);
            formData.append('colorway', colorway);
            formData.append('quantity', quantity);
            formData.append('size', size);
            formData.append('price', price);
            fetch("http://localhost:8080/shoes", {
                method: "POST",
                credentials: "include",
                body: formData
            })
            formData.set("file", null);

            toastr["success"]("Shoe created successfully");
                
            toastr.options = {
                "closeButton": false,
                "debug": false,
                "newestOnTop": false,
                "progressBar": false,
                "positionClass": "toast-top-right",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "300",
                "hideDuration": "500",
                "timeOut": "1500",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            }

            document.getElementById("form").reset();
        }

    }

</script>

<body>
    <main>
        <form id="form">
            <div class="input-div">
                <input
                    type="text"
                    class="brand"
                    placeholder="Brand"
                    id="brand"
                    bind:value={brand}
                />
            </div>

            <div class="input-div">
                <input
                    type="text"
                    class="name"
                    placeholder="Name"
                    id="name"
                    bind:value={name}
                />
            </div>
            <div class="input-div">
                <input
                        type="text"
                        class="model"
                        placeholder="Model"
                        id="model"
                        bind:value={model}
                    />
            </div>
            <div class="input-div">
            <input
                type="text"
                class="colorway"
                placeholder="Colorway"
                id="colorway"
                bind:value={colorway}
            />
            </div>

            <div class="input-div">
                <input
                    type="text"
                    class="quantity"
                    placeholder="Quantity"
                    id="quantity"
                    bind:value={quantity}
                />
            </div>
            <div class="input-div">
            <input
                    type="text"
                    class="size"
                    placeholder="Size"
                    id="size"
                    bind:value={size}
                />
            </div>
            <div class="input-div">
                <input
                        type="text"
                        class="shoePrice"
                        placeholder="Price"
                        id="shoePrice"
                        bind:value={price}
                    />
                </div>
                
                    <input
                            type="file"
                            class="file"
                            id="file"
                            multiple
                            on:change={(event)=>
                            {
                                console.log(formData.get("file"));
                                
                                file = Array.from(event.target.files).slice(0, 4)
                                console.log(file);
                                if(formData.get("file") === null)
                                {
                                    for (let i = 0; i < file.length; ++i) {
                                        formData.append("file", file[i], file[i].name);
                                    }
                                }   
                            }}
                            bind:value={file}
                        />
                    

            <input
                type="submit"
                value="Add shoe"
                class="submit"
                id="loginButton"
                on:click={addShoe}
            />
        </form>
    </main>
</body>

<style>
    body {
        font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
        min-height: 83vh;
        min-width: 95vw;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    main {
        background: white;
        min-width: 320px;
        min-height: 40vh;
        padding: 2rem;
        box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
        border-radius: 8px;
    }

    form {
        display: flex;
        flex-direction: column;
    }

    input
    {
        border: #cce3de solid 1px;
        border-radius: 7px;
    }

    input:focus
    {
        border-color: #a4c3b2
    }

    .input-div {
        position: relative;
    }

    form .input-div:first-child {
        padding-top: 1rem;
    }
    form .input-div {
        margin-bottom: 1rem;
    }

    .input-div input {
        outline: none;
        font-size: 0.9rem;
        color: rgba(0, 0, 0, 0.7);
        width: 100%;
        padding-top: 0.5rem;
        padding-bottom: 0.5rem;
    }

    .input-div input::placeholder {
        color: rgba(0, 0, 0, 0.5);
    }

    .submit {
        margin-top: 1.5rem;
        padding: 0.6rem;
        width: 100%;
        background-image: linear-gradient(to left, #cce3de, #a4c3b2)  ;
        cursor: pointer;
        color: white;
        font-size: 0.9rem;
        border-radius: 4px;
        background-size: 300% 100%;
        border: none;

        moz-transition: all .4s ease-in-out;
        -o-transition: all .4s ease-in-out;
        -webkit-transition: all .4s ease-in-out;
        transition: all .4s ease-in-out;
    }

    .submit:hover {
        background-position: 100% 0;
        moz-transition: all .4s ease-in-out;
        -o-transition: all .4s ease-in-out;
        -webkit-transition: all .4s ease-in-out;
        transition: all .4s ease-in-out;
    }
</style>