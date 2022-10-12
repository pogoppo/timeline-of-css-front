<script lang="ts">
  import Milestone from "./_Milestone.svelte";
</script>

<svelte:head>
  <title>Home</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<main>
  <Milestone />
</main>

<style lang="scss">
  main {
    max-width: 960px;
    margin: 1rem auto;
  }
</style>
