# Journey
https://journeycreator.herokuapp.com/

## Getting Started
1.Make sure you have [node, npm](https://nodejs.org/en/) .

2.Install webpack.

```bash
npm install webpack -g
```

3.Install [mongoDb](https://docs.mongodb.com/getting-started/shell/tutorial/install-mongodb-on-os-x/) to your machine.
Make sure you run Db before **Running** project.To run, use the following command in the mongoDB.
```bash
mongod --dbpath <path to data directory>  
or by default     
mongod --dbpath data
```
4.When building the project for the very first time, run the following command.
```bash
npm install
```

This will install all of your node modules.

## Running
To run the project, simply run the following commands.
```bash
webpack -w
```
```bash
npm start
```
Everything should be available on localhost:3000

## Using Journey

1.(Optional)create account or login to save your work.

2.Click on **Plan Journey** to start.

3.**New Journey** - Name  your journey and fill out (optional)things to do.

4.**Search** - Using two search bars, look up for places you want to go.Once you see results, click on the **heart** icons to add them to your favorite.Click on the **Planner** tab when done.

5.**Planner** - Select the places under the favorites menu to create routes. You can switch the order of your routes by dragging.
