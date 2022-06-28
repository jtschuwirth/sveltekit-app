<div class="card-container">
    <span class="title">{title}</span>
    <div class="img-container"><span>Img</span></div>
    <span>About the project:</span>

</div>

<script lang="ts"> 
    export let title: String;
</script>

<style> 
    .card-container {
        display: flex;
        flex-direction: column;
        border: 1px solid black;
        padding: 1.5em;
        gap: 1em;
        width: 250px;
    }
    .title {
        font-size: 24px;
    }
    .img-container {
        display: flex;
        justify-content: center;
    }
  </style>