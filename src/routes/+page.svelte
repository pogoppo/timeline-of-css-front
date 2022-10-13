<script lang="ts">
  import { onMount } from "svelte";

  import CSSProps from "$lib/repositories/css-properties";
  import { createDatabase } from "$lib/db/sqlite";
  import Milestone from "./_Milestone.svelte";
  import MilestoneHeader from "./_MilestoneHeader.svelte";

  let props: CSSProps;
  let lastUpdate: Date;

  onMount(async () => {
    const db = await createDatabase("/css_milestone.sqlite");
    props = new CSSProps(db);
    lastUpdate = props.lastUpdate();
  });
</script>

<svelte:head>
  <title>CSS Milestone</title>
  <meta name="description" content="Svelte demo app" />
</svelte:head>

<MilestoneHeader {lastUpdate} />

<main>
  {#if props}
    <Milestone {props} />
  {/if}
</main>

<style lang="scss">
  main {
    max-width: 960px;
    margin: 0 auto;
  }
</style>
