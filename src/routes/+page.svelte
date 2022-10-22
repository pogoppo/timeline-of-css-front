<script lang="ts">
  import { onMount } from "svelte";

  import CSSProps from "$lib/repositories/css-properties";
  import { createDatabase } from "$lib/db/sqlite";
  import Timeline from "./_Timeline.svelte";
  import TimelineHeader from "./_TimelineHeader.svelte";

  let props: CSSProps;
  let lastUpdate: Date;

  onMount(async () => {
    const db = await createDatabase("/css_prop_versions.sqlite");
    props = new CSSProps(db);
    lastUpdate = props.lastUpdate();
  });
</script>

<svelte:head>
  <title>Timeline of CSS</title>
  <meta name="description" content="Timeline of CSS properties." />
</svelte:head>

<TimelineHeader {lastUpdate} />

<main>
  {#if props}
    <Timeline {props} />
  {/if}
</main>

<style lang="scss">
  main {
    max-width: var(--contents-base-width);
    margin: 0 auto;
  }
</style>
