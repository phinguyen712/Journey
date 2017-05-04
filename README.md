# Journey
https://journeycreator.herokuapp.com/
## Getting Started
1.Make sure you have [node, npm](https://nodejs.org/en/).
2.Then run this to install webpack.

```bash
npm install webpack -g
```

3.Install mongoDb to your machine (https://docs.mongodb.com/getting-started/shell/tutorial/install-mongodb-on-os-x/).
Make sure you start db before the Running step. To do it, run the following commands
in mongoDb directory.
```bash
mongod --dbpath <path to data directory>
```
or by default
```bash
mongod --dbpath data
```


4.When building the project for the very first time, run the following command.
```bash
npm install
```

This will install all of your node modules.

## Running
To run the project, simply run the following command
```bash
webpack -w
```
```bash
npm start
```
Everything should be available on localhost:3000

## Using Journey

1.(optional)create account or login to save your work.

2.Click on **Plan Journey** to start.

3.**New Journey** - Name  your journey and fill out (optional)"things to do".

4.**Search** - Search for places you want to go and the click on the **heart** icon
to add places to your favorite.Click on the **Planner** tab when done.

5.**Planner** - Select the places under the favorites menu and click/drag to create
your routes.
