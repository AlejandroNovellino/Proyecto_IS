import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import AdminLayout from "layouts/Admin/Admin.js";
import LandingLayout from "layouts/Landing/Landing.js";
import ArtistLayout from "layouts/Artist/Artist.js";

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
						<Route
							path="/landing"
							render={props => <LandingLayout {...props} />}
						/>
						<Route
							path="/artist"
							render={props => <ArtistLayout {...props} />}
						/>
						<Redirect from="/" to="/landing" />
					</Switch>
				</BrowserRouter>
			</BackgroundColorWrapper>
		</ThemeContextWrapper>
	);
};

export default injectContext(MainComponent);
