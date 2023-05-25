<script>

    import toastr from "toastr";
    import 'toastr/build/toastr.min.css';

let email

function forgotPass(event){
        event.preventDefault()
        fetch("http://localhost:8080/forgotPass", {
            method: "POST",
            credentials: "include",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                email: email
            })
        }).then(response => {
            if (response.status === 200){
                toastr["success"]("Password sent!");

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
                "timeOut": "3000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
                }
                
            } else if (response.status === 500){
                toastr["error"]("Could not send email. Try again.");

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
                "timeOut": "3000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
                }
                
            }
        });
        
    }

</script>

<body>
    <main>
        <form>
            <div class="input-div">
                <input placeholder="Email address" type="email" bind:value={email}>
            </div>
            <input type="submit" value="Send me my password!"
            class="submit"
            id="submitButton"
            on:click={forgotPass}/>
        </form>
        <a href="login"><p>Back to login</p></a>
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

    form .input-div{
        padding-top: 3.5rem;
        margin-bottom: 3.5rem;
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

    a{
        text-decoration: none;
        color:#a4c3b2
    }

    a:hover
    {
        color:#cce3de
    }


    .submit {
        margin-top: 4rem;
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

    p {
        text-align: center;
    }
</style>