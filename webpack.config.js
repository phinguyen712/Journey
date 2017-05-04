var webpack = require("webpack");
var path = require("path");

module.exports = {
  entry: [
    "script!jquery/dist/jquery.min.js",
    "./app/app.jsx"
  ],
  externals: {
    jquery: "jQuery"
  },
  plugins: [
    new webpack.ProvidePlugin({
      "$": "jquery",
      "jQuery": "jquery"
    })
  ],
  output: {
    path: __dirname,
    filename: "./public/bundle.js"
  },
  resolve: {
    root: __dirname,
    alias: {
      applicationStyles: "app/styles/app.scss",
      HomePage: "app/components/Landing/HomePage.jsx",
      Navbar:"app/components/Header/Navbar.jsx",
      Main:"app/components/Main.jsx",
      ActivitySearch:"app/components/ActivitySearch/ActivitySearch.jsx",
      NewJourney: "app/components/NewJourney/NewJourney.jsx",
      Planner:"app/components/Planner/Planner.jsx",
      JumboTron:"app/components/Landing/JumboTron.jsx",
      SignUp:"app/components/Landing/SignUp",
      actions: "app/actions/actions.jsx",
      reducers: "app/reducers/reducers.jsx",
      configureStore: "app/store/configureStore.jsx",
      LogIn:"app/components/Header/LogIn.jsx",
      ActivitySearchBar:"app/components/ActivitySearch/ActivitySearchBar.jsx",
      ActivitySearchResults:"app/components/ActivitySearch//ActivitySearchResults.jsx",
      ActivitySearchPlaces:"app/components/ActivitySearch/ActivitySearchPlaces.jsx",
      GoogleMapSearch:"app/components/ActivitySearch/Maps/GoogleMapSearch.jsx",
      Favorites:"app/components/Planner/ToolPanel/Favorites.jsx",
      JourneysPanel:"app/components/Planner/ToolPanel/JourneysPanel.jsx",
      SchedulePanel:"app/components/Planner/SchedulePanel/SchedulePanel.jsx",
      MapsDirectionsPanel:"app/components/Planner/Directions/MapsDirectionsPanel.jsx",
      ToDo:"app/components/Planner/SchedulePanel/ToDo.jsx",
      DaySelection:"app/components/Planner/SchedulePanel/DaySelection.jsx",
      GoogleMapPlanner:"app/components/Planner/Directions/GoogleMapPlanner.jsx",
    },
    extensions: ["", ".js", ".jsx"]
  },
  module: {
    loaders: [
      {
        loader: "babel-loader",
        query: {
          presets: ["react", "es2015", "stage-0"]
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      },
      {  test: /\.(png|jpg)$/,
         loader: "url?limit=25000"
      },
    ]
  },
    sassLoader: {
     includePaths: [
       path.resolve(__dirname, "./node_modules/foundation-sites/scss")
     ]
   },
  devtool: "cheap-module-eval-source-map"
};
