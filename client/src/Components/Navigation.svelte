<script>
    import { Router, Route, Link } from "svelte-navigator";
    import Login from "../Pages/Login/Login.svelte";
    import Store from "../Pages/Store/Store.svelte";
    // @ts-ignore
    import { user } from "../store/users.js"
    import Register from "../Pages/Register/Register.svelte";
    import Shoe from "../Pages/Shoe/Shoe.svelte";
    import ForgottenPassword from "../Pages/ForgottenPass/ForgottenPassword.svelte";
    import AddShoe from "../Pages/AddShoe/AddShoe.svelte";
    import PrivateRoute from "./PrivateRoute.svelte";
    import ContactUs from "../Pages/ContactUs/ContactUs.svelte";
    import Account from "../Pages/Account/Account.svelte";
    import Shoes from "../Pages/Shoes/Shoes.svelte";
    import Orders from "../Pages/Orders/Orders.svelte";
    import Auctions from "../Pages/Auctions/Auctions.svelte";
    import Auction from "../Pages/Auction/Auction.svelte";
    import AuctionManagement from "../Pages/AuctionManagement/AuctionManagement.svelte";
    import CreateAuction from "../Pages/CreateAuction/CreateAuction.svelte";

    function handleLogout(){
    $user = null;
    document.cookie = "expires=Thu, 01 Jan 1970 00:00:00 UTC;"
    fetch("http://localhost:8080/auth/logout", {
      method: "GET",
            credentials: "include",
            headers: {
                'Content-type': 'application/json'
            }
    }).then(response => {
      if (response.status === 200){
        window.location.href = "/";
      }
    });
}

</script>
<Router>
    {#if $user}
    <nav>
            <div>
                <Link to="/" style="text-decoration: none; margin-right: 15px;color: #cce3de;"><p>Home</p></Link>
                <Link to="auctions" style="text-decoration: none; margin-right: 15px;color: #cce3de;"><p>Auction</p></Link>
                <Link to="contact" style="text-decoration: none;color: #cce3de;"><p>Contact us</p></Link>
            </div>
            <div>
                {#if !$user}
                <Link to="login"><svg
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
                </Link>
                {/if}
                <Link to="account"><svg
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
                </Link>
                <svg on:click={handleLogout} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                </svg>                  
            </div>
    </nav>
    {/if}
    {#if !$user}
        <Route path="/">
            <Login/>
        </Route>  
        <Route path="signup">
            <Register/>
        </Route>
        <Route path="forgot-password">
            <ForgottenPassword/>
        </Route>
        {:else}
        <Route path="/">
            <Store/>
        </Route>
        <Route path="login">
            <Login/>
        </Route>
        <Route path="account/auctions">
            <AuctionManagement/>
        </Route>
        <Route path="shoes/:model" >
            <Shoe/>
        </Route>
        <Route path="auctions">
            <Auctions/>
        </Route>
        {#if $user !== null && $user.role.role === "admin"}
        <Route path="account/shoes">
            <Shoes/>
        </Route>
        <Route path="account/shoes/add-shoes">
            <AddShoe/>
        </Route>
        {/if}
        {#if $user !== null && ($user.role.role === "admin" || $user.role.role === "auctioneer")}
            <Route>
                <CreateAuction/>
            </Route>
        {/if}
        <Route path="contact">
            <ContactUs/>
        </Route>
        <Route path="account">
            <Account/>        
        </Route>
        <Route path="account/orders">
            <Orders/>
        </Route>
        <Route path="auctions/:model">
            <Auction/>
        </Route>
    {/if}
</Router>




<style>
    nav {
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

    p{
        display: inline
    }
    p:hover
    {
        color: #a4c3b2
    }

    svg:hover
    {
        color: #a4c3b2;
    }

    svg {
        color: #cce3de;
        width: 35px;
        height: 35px;
        cursor: pointer; 
    }

</style>
