import gulp from 'gulp';
import runSequence from 'run-sequence';
import rethink from 'rethinkdbdash';
import { difference } from 'lodash-es';


const DB = 'app';

gulp.task('wipe', async () => {
  const r = rethink();

  await r.dbDrop(DB);

  r.getPoolMaster()
    .drain();
});

gulp.task('schema', async () => {
  const r = rethink();
  const tables = ['posts'];

  const dbs = await r.dbList()
    .run();
  if (!dbs.includes(DB)) {
    await r.dbCreate(DB)
      .run();
  }

  const existingTables = await r.db(DB)
    .tableList()
    .run();

  await Promise.all(
    difference(tables, existingTables).map(
      table => r.db(DB)
        .tableCreate(table)
        .run()
    )
  );

  if (!existingTables.includes('users')) {
    await r.db(DB)
      .tableCreate('users', { primaryKey: 'username' })
      .run();
  }

  try {
    await r.db(DB)
      .table('users')
      .indexCreate('username')
      .run();
  } catch (e) {
    // empty
  }

  try {
    await r.db(DB)
      .table('posts')
      .indexCreate('location', { geo: true })
      .run();
  } catch (e) {
    // empty
  }

  r.getPoolMaster()
    .drain();
});

gulp.task('refresh', () => {
  runSequence('wipe', 'schema');
});
