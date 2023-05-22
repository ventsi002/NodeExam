<script>
    import { Router, Route, Link } from "svelte-navigator";
    import Navigation from "./Components/Navigation.svelte";
</script>

<Navigation/>

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
