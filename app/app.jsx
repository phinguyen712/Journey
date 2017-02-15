var React = require("react");
var ReactDOM = require("react-dom");
var {Route, Router, IndexRoute, hashHistory} = require("react-router");
var {Provider} = require("react-redux");
var store = require("configureStore").configure();
var actions = require("actions");
import Main from "Main";
import HomePage from "HomePage";
import NewJourney from "NewJourney";
import Planner from "Planner";
import ActivitySearch from "ActivitySearch";
import SignUp from "SignUp";



// App css
require("style!css!sass!applicationStyles");

var refreshUserData =(callback)=>{
	var tempUserState ={
		favorites:store.getState().UserFavorites,
		user:store.getState().User,
		schedule:store.getState().JourneySchedule
	};

	$.ajax({
		type: "POST",
		url: "/user/data",
		data: tempUserState,
		dataType:"json",
		success:function(userData){
			store.dispatch(actions.loggedInUser(userData.user));
			store.dispatch(actions.userFavorites(userData.favorites));
			store.dispatch(actions.JourneySchedule(userData.schedule));
			callback(userData);
		}
	});

	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {
			var  centerCoords  = {
				lat: position.coords.latitude,
				lng: position.coords.longitude
			};

			store.dispatch(actions.UpdateGeolocation(centerCoords));
		});
	}

};

export const getRoutes=(store)=>{

	var preLoadStateHandler = (nextState,replace,callback)=>{
		refreshUserData(function(){
			callback();
		});
	};


	var userFavoritesCheck = (nextState,replace,callback)=>{
		var userFavorites = store.getState().UserFavorites,
			user         	  = store.getState().User

					//wait for ASYNC to complete
					//keeps users on the same page when refresh
		var replaceRoutes =(alertMessage,newRoute)=> {
			alert(alertMessage,newRoute);
			replace({
				pathname: newRoute,
				state: { nextPathname: nextState.location.pathname }
			});
		};
		if(userFavorites.length == 0 || !user.currentJourney){
			refreshUserData(function(userData){
				if(!userData.favorites || userData.favorites.length == 0 ){
					replaceRoutes("Please add favorites!","ActivitySearch");
				}

				if(!userData.user || !userData.user.currentJourney  ){
					replaceRoutes("Please create a new Journey","NewJourney");
				}
				callback();
			});
		}else{
			callback();
		}
	};

	return(
			<Route path="/" component={Main} onEnter={preLoadStateHandler} >
				<IndexRoute component={HomePage} />
				<Route path="ActivitySearch" component={ActivitySearch} />
				<Route path="SignUp" component={SignUp}/>
				<Route path="NewJourney" component={NewJourney}/>
				<Route path="Planner" component={Planner}
						onEnter={userFavoritesCheck}/>
			</Route>
	);
};

ReactDOM.render(
	<Provider store={store}>
		<Router history={hashHistory}>
			{getRoutes(store)}
		</Router>
	</Provider>
,
	document.getElementById("app")
);
