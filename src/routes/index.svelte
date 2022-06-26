<div class="main">
    <Sidebar />
    <div class="index">
      <h1>Home Page</h1>
    </div>
</div>

<script> 
    import Sidebar from '../lib/components/Sidebar.svelte';
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