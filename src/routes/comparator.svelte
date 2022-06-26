<div class="main">
    <Sidebar />
    <div class="index">
      <h1>Defi Comparator</h1>
      <Comparator />
    </div>
</div>

<script>
    import Sidebar from "../lib/components/Sidebar.svelte"
    import Comparator from "../lib/components/Comparator.svelte"
</script>

<style>
    .main {
      display: flex;
      justify-content: row;
      height: 90vh;
    }
    .index {
      padding: 1.5em;
    }
</style>