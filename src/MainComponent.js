import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";
import Landing from "layouts/Landing/Landing.js";
import HomeArtist from "layouts/Artist/HomeArtist.js";

// context
import injectContext from "./store/appContext";

import "assets/scss/black-dashboard-react.scss";
import "assets/demo/demo.css";
import "assets/css/nucleo-icons.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

import ThemeContextWrapper from "./components/ThemeWrapper/ThemeWrapper";
import BackgroundColorWrapper from "./components/BackgroundColorWrapper/BackgroundColorWrapper";

const MainComponent = () => {
	return (
		<ThemeContextWrapper>
			<BackgroundColorWrapper>
				<BrowserRouter>
					<Switch>
						<Route path="/admin" render={props => <AdminLayout {...props} />} />
						<Route path="/landing" render={props => <Landing {...props} />} />
						<Route path="/artist" render={props => <HomeArtist {...props} />} />
						<Redirect from="/" to="/landing" />
					</Switch>
				</BrowserRouter>
			</BackgroundColorWrapper>
		</ThemeContextWrapper>
	);
};

export default injectContext(MainComponent);
