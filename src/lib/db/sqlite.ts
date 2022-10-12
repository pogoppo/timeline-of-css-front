import initSqlJs from 'sql.js';

export const createDatabase = async (sqliteFilePath: string) => {
  const SQL = await initSqlJs({
    // Required to load the wasm binary asynchronously. Of course, you can host it wherever you want
    // You can omit locateFile completely when running in node
    locateFile: file => `/${file}`
  });
  const response = await fetch(sqliteFilePath);
  const dataBuffer = await response.arrayBuffer();
  const data = new Uint8Array(dataBuffer);
  const db = new SQL.Database(data);
  return db;
}
