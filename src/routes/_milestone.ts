import type CSSProps from "$lib/repositories/css-properties";
import type { Prop } from "$lib/repositories/css-properties";

export type Milestone = {
  year: number;
  versions: {
    version: number;
    releaseDate: Date;
    props: Prop[]
  }[];
}[];

export const createMilestone = (props: CSSProps) => {
  const result: Milestone = [];

  for (const item of props.orderByVersion()) {
    const releaseDate = new Date(item.releaseDate);
    const year = releaseDate.getUTCFullYear();
    const version = item.version;
    const value = {
      year,
      versions: [
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

    const child = parent.versions[parent.versions.length - 1];
    if (version !== child.version) {
      parent.versions.push(value.versions[0]);
      continue;
    }

    child.props.push(item);
  }

  return result;
};
