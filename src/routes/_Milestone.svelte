<script lang="ts">
  import { onMount } from "svelte";

  import type CSSProps from "$lib/repositories/css-properties";
  import { createMilestone, type Milestone } from "./_milestone";

  export let props: CSSProps;
  let milestone: Milestone;
  let gradient: ReturnType<typeof createGradient>;

  const displayReleaseDate = (date: Date) => {
    const month = date.toLocaleString("en-US", { month: "2-digit" });
    return `${month}`;
  };

  function* createGradient(
    rgb1: [number, number, number],
    rgb2: [number, number, number],
    split: number
  ) {
    for (let d = 1; d > 0; d = d - 1 / split) {
      const r = (rgb2[0] - rgb1[0]) * d + rgb1[0];
      const g = (rgb2[1] - rgb1[1]) * d + rgb1[1];
      const b = (rgb2[2] - rgb1[2]) * d + rgb1[2];
      yield [r, g, b].map(Math.floor);
    }
  }

  onMount(async () => {
    milestone = createMilestone(props);
    gradient = createGradient([255, 244, 79], [255, 54, 71], milestone.length);
  });
</script>

<article class="Milestone">
  {#if milestone}
    {#each milestone as histories}
      <section
        class="Milestone__section"
        style={`--color-milestone-path: rgb(
          ${gradient.next().value?.join(",")}
        )`}
      >
        <h2 class="Milestone__title">
          {histories.year}
        </h2>
        {#each histories.versions as version}
          <section class="MilestoneFragment">
            <h3 class="MilestoneFragment__release">
              {displayReleaseDate(version.releaseDate)}
            </h3>
            <ul class="MilestoneProps">
              {#each version.props as prop}
                <li class="MilestoneProps__item">
                  <a href={prop.link} class="MilestoneProps__link">
                    {prop.name}
                  </a>
                </li>
              {/each}
            </ul>
          </section>
        {/each}
      </section>
    {/each}
  {/if}
</article>

<style lang="scss">
  .Milestone {
    min-width: fit-content;
    padding-bottom: 1rem;
    background-color: var(--color-bg-contents);
    border-left: 2rem solid var(--color-milestone-path);
    &__section {
      display: flex;
      flex-direction: column;
      row-gap: 2rem;
      &:not(:first-of-type) {
        margin: 4rem 0 0;
      }
    }
    &__title {
      position: sticky;
      top: 0;
      z-index: 4;
      margin: 0;
      padding: 0 2rem;
      background-color: var(--color-milestone-path);
      color: var(--color-font-reverse);
      font-family: var(--font-family-accent-sans);
      font-size: 4rem;
      font-weight: 900;
    }
  }
  .MilestoneFragment {
    display: flex;
    align-items: flex-start;
    column-gap: 1.5rem;
    line-height: 2rem;
    &__release {
      position: relative;
      margin: 0;
      padding: 0 0.5rem 0 2rem;
      background-color: var(--color-milestone-path);
      color: var(--color-font-reverse);
      font-family: Arial, Helvetica, sans-serif;
      font-size: 1.5rem;
      &::after {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        left: 100%;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 1rem 0 1rem 1rem;
        border-color: transparent transparent transparent
          var(--color-milestone-path);
      }
    }
  }
  .MilestoneFragment:last-child {
    &__release {
      position: relative;
    }
    &__release::after {
      content: "";
      display: block;
      position: absolute;
      top: 100%;
      left: 0;
    }
  }
  .MilestoneProps {
    list-style: none;
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    column-gap: 1rem;
    margin: 0;
    padding: 0 1rem;
    background-color: rgba(255, 255, 255, 0.05);
    &__item {
      display: block;
    }
    &__link {
      color: var(--color-font-link);
      border-bottom: 1px dashed var(--color-font-link);
      &:hover {
        color: var(--color-font-default);
        border-color: var(--color-font-default);
      }
    }
  }
</style>
