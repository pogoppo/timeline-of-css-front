<script lang="ts">
  import type { Fragment } from "./_timeline";

  export let fragment: Fragment;

  const displayReleaseDate = (date: Date) => {
    const month = date.toLocaleString("en-US", { month: "2-digit" });
    return `${month}`;
  };
</script>

<section class="Milestone">
  <h3 class="Milestone__release">
    {displayReleaseDate(fragment.releaseDate)}
  </h3>
  <ul class="MilestoneProps">
    {#each fragment.props as prop}
      <li class="MilestoneProps__item">
        <a
          href={prop.link}
          target="_blank"
          rel="noopener"
          class="MilestoneProps__link"
        >
          {prop.name}
        </a>
      </li>
    {/each}
  </ul>
</section>

<style lang="scss">
  @use "src/lib/scss/responsive.scss";
  .Milestone {
    display: flex;
    align-items: flex-start;
    column-gap: 1.5rem;
    line-height: 2rem;
    &__release {
      position: relative;
      margin: 0;
      padding: 0 0.5rem 0 2rem;
      background-color: var(--color-milestone);
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
        border-color: transparent transparent transparent var(--color-milestone);
      }
    }
  }
  .Milestone:last-child {
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
