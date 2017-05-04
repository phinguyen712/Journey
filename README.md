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

## Using the Application
