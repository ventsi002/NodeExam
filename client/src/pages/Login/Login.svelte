<script>
    import { useNavigate, useLocation } from "svelte-navigator";
    import { user } from "../../store/users.js";

    const navigate = useNavigate();
    const location = useLocation();

    let username;
    let password;
    let role;

    function login(event) {
        event.preventDefault();

        fetch("http://localhost:8080/auth/login", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-type": "application/json",
            },
            body: JSON.stringify({
                username: username,
                password: password,
            }),
        }).then(async (response) => {
            role = await response.json()
            if (response.status === 200) {
                user.set({ username, password, role });
                const from =
                    ($location.state && $location.state.from) || "/";
                if(role.role === "admin")
                {
                    let admin = ($location.state && $location.state.from) || "/admin"
                    console.log(admin);
                    navigate(admin, { replace: true })
                }
                else
                {
                    navigate(from, { replace: true });
                }
            }
        });
    }
</script>

<!-- <Navigation/> -->
<body>
    <main>
        <form>
            <div class="input-div">
                <input
                    type="text"
                    class="username"
                    placeholder="Username"
                    id="username"
                    bind:value={username}
                />
            </div>
            <div class="input-div">
                <input
                    type="password"
                    class="password"
                    placeholder="Password"
                    id="password"
                    bind:value={password}
                />
            </div>

            <input
                type="submit"
                value="Log in"
                class="submit"
                id="loginButton"
                on:click={login}
            />
            <a href="/forgotPassword"><p>Forgot Password?</p></a>
            <a href="/signup"><p>Don't have an account? Sign up</p></a>
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
        margin-bottom: 2rem;
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