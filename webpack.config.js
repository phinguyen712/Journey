var webpack = require('webpack');
var path = require('path');

module.exports = {
  entry: [
    'script!jquery/dist/jquery.min.js',
    './app/app.jsx'
  ],
  externals: {
    jquery: 'jQuery'
  },
  plugins: [
    new webpack.ProvidePlugin({
      '$': 'jquery',
      'jQuery': 'jquery'
    })
  ],
  output: {
    path: __dirname,
    filename: './public/bundle.js'
  },
  resolve: {
    root: __dirname,
    alias: {
      applicationStyles: 'app/styles/app.scss',
      HomePage: 'app/components/HomePage.jsx',
      Navbar:'app/components/Navbar.jsx',
      Main:'app/components/Main.jsx',
      ActivitySearch:'app/components/ActivitySearch.jsx',
      NewJourney: 'app/components/NewJourney.jsx',
      Planner:'app/components/Planner.jsx',
      JumboTron:'app/components/JumboTron.jsx',
      SignUp:'app/components/SignUp',
      actions: 'app/actions/actions.jsx',
      reducers: 'app/reducers/reducers.jsx',
      configureStore: 'app/store/configureStore.jsx',
      LogIn:'app/components/LogIn.jsx',
      NewJourney:'app/components/NewJourney.jsx',
      ActivitySearchBar:'app/components/ActivitySearchBar.jsx',
      ActivitySearchResults:'app/components/ActivitySearchResults.jsx',
      ActivitySearchPlaces:'app/components/ActivitySearchPlaces.jsx',
      GoogleMapSearch:'app/components/GoogleMapSearch.jsx',
      NewJourney:'app/components/NewJourney.jsx',
      Favorites:'app/components/Favorites.jsx',
      JourneysPanel:'app/components/JourneysPanel.jsx',
      SchedulePanel:'app/components/SchedulePanel.jsx',
      MapsDirectionsPanel:'app/components/MapsDirectionsPanel.jsx',
      ToDo:'app/components/ToDo.jsx',
      DaySelection:'app/components/DaySelection.jsx',
      GoogleMapPlanner:'app/components/GoogleMapPlanner.jsx',
    },
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-0']
        },
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/
      },
      {  test: /\.(png|jpg)$/,
         loader: 'url?limit=25000'
      },
    ]
  },
    sassLoader: {
     includePaths: [
       path.resolve(__dirname, './node_modules/foundation-sites/scss')
     ]
   },
  devtool: 'cheap-module-eval-source-map'
};
