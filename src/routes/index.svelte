<div class="main">
    <Sidebar />
    <div class="index">
      <h2>About me:</h2>
      <h2>Other Projects:</h2>
      <div class="cards">
        <ProjectCard title={"EO2"}/>
        <ProjectCard title={"Patagonian Dreams"}/>

      </div>
    </div>
</div>

<script lang="ts"> 
    import Sidebar from '../lib/components/Sidebar.svelte';
    import ProjectCard from '../lib/components/ProjectCard.svelte';

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
  .cards {
    display: flex;
    gap: 2em;
  }
</style>