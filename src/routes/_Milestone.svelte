<script lang="ts">
  import { onMount } from "svelte";

  import CSSProps, { type Prop } from "$lib/repositories/css-properties";
  import { createDatabase } from "$lib/db/sqlite";

  type Milestone = {
    year: number;
    versions: { version: number; props: Prop[] }[];
  }[];

  let milestone: Milestone;

  const createMilestone = (props: CSSProps) => {
    const result: Milestone = [];

    for (const item of props.orderByVersion()) {
      const year = new Date(item.releaseDate).getFullYear();
      const version = item.version;
      const value = {
        year,
        versions: [
          {
            version,
            props: [item],
          },
        ],
      };

      if (!result.length) {
        result.push(value);
        continue;
      }

      const panret = result[result.length - 1];
      if (year !== panret.year) {
        result.push(value);
        continue;
      }

      const child = panret.versions[panret.versions.length - 1];
      if (version !== child.version) {
        panret.versions.push(value.versions[0]);
        continue;
      }

      child.props.push(item);
    }

    return result;
  };

  onMount(async () => {
    const db = await createDatabase("/css_milestone.sqlite");
    const props = new CSSProps(db);
    milestone = createMilestone(props);
  });
</script>

<article class="Milestone">
  {#if milestone}
    {#each milestone as histories}
      <section>
        <h2 class="Milestone__title">
          {histories.year}
        </h2>
        {#each histories.versions as release}
          <section class="MilestoneFragment">
            <h3 class="MilestoneFragment__version">
              {release.version}
            </h3>
            <ul class="MilestoneProps">
              {#each release.props as prop}
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
    &__title {
      margin: 3rem 0 0;
      font-size: 3rem;
    }
  }
  .MilestoneFragment {
    display: flex;
    margin: 1rem 0;
    line-height: 2rem;
    &__version {
      margin: 0;
      min-width: 64px;
    }
  }
  .MilestoneProps {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    column-gap: 1rem;
    margin: 0;
    padding: 0;
    &__item {
      display: block;
    }
  }
</style>
