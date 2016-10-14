import gulp from 'gulp';
import runSequence from 'run-sequence';
import rethink from 'rethinkdbdash';


const DB = 'app';

gulp.task('wipe', async () => {
  const r = rethink();

  await r.dbDrop(DB);

  r.getPoolMaster()
    .drain();
});

gulp.task('schema', async () => {
  const r = rethink();

  const dbs = await r.dbList()
    .run();
  if (!dbs.includes(DB)) {
    await r.dbCreate(DB)
      .run();
  }

  const existingTables = await r.db(DB)
    .tableList()
    .run();

  if (!existingTables.includes('posts')) {
    await r.db(DB)
      .tableCreate('posts');
  }

  try {
    await r.db(DB)
      .table('posts')
      .indexCreate('location', { geo: true })
      .run();
  } catch (e) {
    // empty
  }

  if (!existingTables.includes('users')) {
    await r.db(DB)
      .tableCreate('users', { primaryKey: 'username' })
      .run();
  }

  if (!existingTables.includes('votes')) {
    await r.db(DB)
      .tableCreate('votes')
      .run();
  }

  try {
    await r.db(DB)
      .table('votes')
      .indexCreate('post')
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
