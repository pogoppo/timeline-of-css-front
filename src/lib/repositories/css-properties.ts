import type { Database } from "sql.js";

export type Prop = {
  name: string;
  version: number;
  link: string;
  releaseDate: string;
}

export default class {
  #db: Database;

  constructor(db: Database) {
    this.#db = db;
  }

  lastUpdate() {
    const stmt = this.#db.prepare(`
      SELECT p.created_at
      FROM css_properties as p
      ORDER BY p.created_at DESC
    `);

    stmt.step();
    const { created_at } = stmt.getAsObject();
    stmt.free();
    return new Date(created_at as string);
  }

  *orderByVersion(asc: boolean = false) {
    const stmt = this.#db.prepare(`
      SELECT p.name, p.version, p.link, r.release_date
      FROM css_properties as p
      INNER JOIN release_dates as r
      ON p.render = r.render AND p.version = r.version
      WHERE p.version > 0
      ORDER BY p.version DESC, p.name
    `);

    while (stmt.step()) {
      const [name, version, link, releaseDate] = stmt.get();
      yield { name, version, link, releaseDate } as Prop;
    };

    stmt.free();
  }
}
