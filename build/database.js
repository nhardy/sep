import gulp from 'gulp';
import rethink from 'rethinkdbdash';
import { difference } from 'lodash-es';


gulp.task('schema', async () => {
  const r = rethink();
  const db = 'app';
  const tables = ['posts'];

  const dbs = await r.dbList()
    .run();
  if (!dbs.includes(db)) {
    await r.dbCreate(db)
      .run();
  }

  const existingTables = await r.db(db)
    .tableList()
    .run();

  await Promise.all(
    difference(tables, existingTables).map(
      table => r.db(db)
        .tableCreate(table)
        .run()
    )
  );

  await r.db(db)
    .table('posts')
    .indexCreate('location', { geo: true })
    .run();

  r.getPoolMaster()
    .drain();
});
