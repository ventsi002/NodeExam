<script>
    import { Router, Route, Link } from "svelte-navigator";
    import Login from "./pages/Login/Login.svelte";
    import Store from "./pages/Store/Store.svelte";
</script>

<div class="nav">
    <div>
        <Router>
            <nav>
                <Route path="/">
                    <Link
                        to="/"
                        style="text-decoration: none; margin-right: 15px;color: #cce3de;"
                        ><p>Home</p></Link
                    >
                    <Link
                        to="/"
                        style="text-decoration: none; margin-right: 15px;color: #cce3de;"
                        ><p>Auction</p></Link
                    >
                    <Link to="/" style="text-decoration: none;color: #cce3de;"
                        ><p>Contact us</p></Link
                    >
                </Route>

                <Route path="">
                    <Link to="">Auction</Link>
                    <!-- <Auction /> -->
                </Route>

                <Route path="">
                    <Link to="">Contact us</Link>
                    <!-- <ContactUs /> -->
                </Route>

                <Route path="">
                    <Link to="">Home</Link>
                    <!-- <Home /> -->
                </Route>
            </nav>
        </Router>
    </div>

    <Router>
        <div>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                />
            </svg>

            <Route path>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
            </Route>
        </div>
    </Router>
</div>

<Store />

<style>
    .nav {
        background-color: #2f3e46;
        font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
        line-height: 1.5;
        font-weight: 500;
        font-size: 21px;
        padding: 21px;
        min-width: 97.5vw;
        position: relative;
        left: -12px;
        top: -8px;
        text-decoration: none;
        display: flex;
        justify-content: space-between;
        color: #cce3de;
    }

    p {
        display: inline;
    }
    p:hover {
        color: #a4c3b2;
    }

    svg:hover {
        color: #a4c3b2;
    }

    svg {
        width: 35px;
        height: 35px;
        cursor: pointer;
    }
</style>
