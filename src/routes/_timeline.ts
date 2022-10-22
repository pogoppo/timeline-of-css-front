import type CSSProps from "$lib/repositories/css-properties";
import type { Prop } from "$lib/repositories/css-properties";

export type Fragment = {
  version: number;
  releaseDate: Date;
  props: Prop[]
}

export type Milestone = {
  year: number;
  fragments: Fragment[];
}

export type Timeline = Milestone[];

export const createTimeline = (props: CSSProps) => {
  const result: Timeline = [];

  for (const item of props.orderByVersion()) {
    const releaseDate = new Date(item.releaseDate);
    const year = releaseDate.getUTCFullYear();
    const version = item.version;
    const value = {
      year,
      fragments: [
        {
          version,
          releaseDate,
          props: [item],
        },
      ],
    };

    if (!result.length) {
      result.push(value);
      continue;
    }

    const parent = result[result.length - 1];
    if (year !== parent.year) {
      result.push(value);
      continue;
    }

    const child = parent.fragments[parent.fragments.length - 1];
    if (version !== child.version) {
      parent.fragments.push(value.fragments[0]);
      continue;
    }

    child.props.push(item);
  }

  return result;
};
