# Stickies

The new location based social network taking the world by storm!

#Prerequisites
This App can only be deployed on Linux machines due to the combination of technologies being used.

#Installation
1. Install RethinkDB according to your flavour of linux using [this guide](https://www.rethinkdb.com/docs/install/)
2. Ensure RethinkDB is running (check [localhost:8080](http://localhost:8080) for the web interface)
4. Install nvm, see [here](https://github.com/creationix/nvm)
5. Run `$nvm install 6` followed by `$nvm alias default 6`
6. Navigate to the project directory
7. Run `$npm install` and wait for the packages to be installed
8. Run `$npm run schema` to set up the database as required

#Running
##Development Mode
From the project directory run `npm run dev` to start the development server. The server will start on port 8000. You shouldn't need to restart the server in this mode even if you make changes, as the server will update as you save. 

You may notice that styles appear to _jump_ when you load the page in development mode. This is because styles are injected into the page by the JavaScript bundle to make hot reloading of styles possible. Production mode, on the other hand, does not do this.

##Production Mode
1. From the project directory run `npm run prod` to start the production server

 This is slower and won't automatically reload, but makes some optimisations, such as separating out the CSS into a separate file, and minifying the JavaScript bundle.

You should now be able to access the App from [localhost:8000](http://localhost:8000/)!

##Troubleshooting
Server crashing on start? Make sure the rethinkdb service is running: `sudo service rethinkdb start`
