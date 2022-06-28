<div class="sidebar">
    <div>
    <p class="sidebar-title">
    </p>
    <div class="links">
        <a href="/" class={current==""?"active-link":"link"}>About Me</a>
        <a href="/comparator" class={current=="comparator"?"active-link":"link"}>Defi Comparator</a>
    </div>
    </div>
</div>

<script>
    import { page } from '$app/stores';
    let current = $page.routeId;
</script>


<style>
    .sidebar {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 100%;
        width: 200px;
        padding: 1em;
        border-right: 1px solid black;
    }
    .sidebar-title {
        margin-bottom: 5em;
    }
    .links {
        display: flex;
        flex-direction: column;
        gap: 0.5em;
    }
    a { 
        text-decoration: none;
        color: black;
    }

    .link {
        display: flex;
        align-items: center;
        text-align: left;
        color: rgba(22,37,56,1);
        padding: 0.5em;
    }

    .link:hover {
        background-color: rgba(57,113,104,1);
        box-shadow: 0px 5px 6px 0px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        color: rgba(254,254,255,1);
    }

    .active-link {
        display: flex;
        align-items: center;
        text-align: left;
        color: rgba(22,37,56,1);
        padding: 0.5em;
        background-color: rgba(57,113,104,1);
        box-shadow: 0px 5px 6px 0px rgba(0, 0, 0, 0.2);
        border-radius: 10px;
        color: rgba(254,254,255,1);
    }


</style>