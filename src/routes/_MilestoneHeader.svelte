<script lang="ts">
  export let lastUpdate: Date;
  const displayLastUpdate = (date: Date | undefined) => {
    if (!date) {
      return `---- -- --`;
    }
    const adjustedDate = new Date(
      date.getTime() - date.getTimezoneOffset() * 60 * 1000
    );
    return adjustedDate.toISOString().split("T")[0];
  };
</script>

<header class="MilestoneHeader">
  <div class="MilestoneHeader__base">
    <strong>Base:</strong>
    <span>Firefox</span>
  </div>
  <div class="MilestoneHeader__last-updated">
    <strong>Last updated:</strong>
    <time>
      {displayLastUpdate(lastUpdate)}
    </time>
  </div>
</header>

<style lang="scss">
  strong {
    color: var(--color-font-accent);
    font-family: var(--font-family-accent-sans);
  }
  .MilestoneHeader {
    display: flex;
    column-gap: 24px;
    padding: 0.5rem 1rem;
    background-color: var(--color-bg-contents);
    color: var(--color-font-default);
    font-size: 0.9rem;
  }
</style>
