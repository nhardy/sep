# Stickies

The new location based social network taking the world by storm!

## Development

Make sure you're using Mac/Linux. Many of the npm dependencies for this project don't play nicely with Windows.

Make sure you have [Node Version Manager](https://github.com/creationix/nvm) (nvm) installed.

Run `nvm install 6` to install the latest version of Nodejs.

Run `nvm alias default 6`

You will also need to [install RethinkDB](https://www.rethinkdb.com/docs/install/) and have it [run on startup](https://www.rethinkdb.com/docs/start-on-startup/).

Before proceeding, make sure it is running [locally](http://localhost:8080).

In the project directory, make sure you `npm install` (to install dependencies) followed by `npm run schema` (to initialise the database).

## Running

To start the server in development mode, use `npm run dev`.
The server will start with HTTPS on port 8080.
You shouldn't need to restart the server in this mode even if you make changes, as the server will update as you save.
Some functionality things will even update without you having to refresh. If you run into any issues though, it might be a good idea to refresh the page or restart the server.

### "Production" mode

You may notice that styles appear to _jump_ when you load the page in development mode. This is because styles are injected into the page by the JavaScript bundle to make hot reloading of styles possible. Production mode, on the other hand, does not do this.

`npm run prod` will start the server in production mode. This slower and won't automatically reload, but makes some optimisations, such as separating out the CSS into a separate file, and minifying the JavaScript bundle.

## Problems?

If you're experiencing an unexplained Node crash when running `npm run dev` or `npm run prod` on Linux, try

`echo fs.inotify.max_user_watches=582222 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p`

See [Nodemon#214](https://github.com/remy/nodemon/issues/214) for more information.
