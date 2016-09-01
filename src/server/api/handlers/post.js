import r from 'server/api/rethink';


export default function postHandler(req, res) {
  const { id } = req.params;

  r.table('posts')
    .filter({ id })
    .run()
    .then((post) => {
      res.send({
        item: post,
      });
    });
}
