/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
import {
	Button,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	CardText,
	FormGroup,
	Form,
	Input,
	Row,
	Col,
	Container,
} from "reactstrap";

import { Link, useHistory } from "react-router-dom";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";
// context
import { Context } from "../store/appContext";

function Login(props) {
	// context
	const { store, actions } = React.useContext(Context);
	// react dom history
	const history = useHistory();
	// user inputs
	const [userInfo, setUserInfo] = React.useState({
		username: "",
		password: "",
	});
	// elements for the alerts
	const notificationAlertRef = React.useRef(null);
	const notifyAlert = message => {
		let options = {
			place: "tc",
			message: (
				<div>
					<div>{message}</div>
				</div>
			),
			type: "danger",
			icon: "tim-icons icon-bell-55",
			autoDismiss: 7,
		};
		notificationAlertRef.current.notificationAlert(options);
	};

	const logIn = async () => {
		if (await actions.logIn(userInfo)) {
			history.push("/artist/home");
		} else {
			notifyAlert("Oh no! Combination of username and password invalid :c");
		}
	};

	return (
		<>
			<Container className="mt-5 pt-5">
				<div className="react-notification-alert-container">
					<NotificationAlert ref={notificationAlertRef} />
				</div>
				<Row>
					<Col md="4">
						{/* Info card */}
						<Card className="card-user">
							<CardBody>
								<CardText />
								<div className="author">
									<div className="block block-one" />
									<div className="block block-two" />
									<div className="block block-three" />
									<div className="block block-four" />
									<a href="#pablo" onClick={e => e.preventDefault()}>
										<img
											alt="..."
											className=""
											src={require("assets/img/react-logo.png").default}
										/>
										<h4 className="title mt-3">Welcome to ArtHub!</h4>
									</a>
									<p className="description">Your artistic hub</p>
								</div>
								<div className="card-description p-3 text-center mt-3">
									ArtHub is an art hub center for creator of all the mediums. We
									believe that art is a collaborative experience, working with
									the audience in the creation makes everything greater.
								</div>
							</CardBody>
							<CardFooter>
								<p className="text-center text-muted">
									We hope yo enjoy your time in the hub!
								</p>
							</CardFooter>
						</Card>
					</Col>
					<Col md="8">
						{/* Login card */}
						<Card body>
							<CardHeader>
								<h1 className="title text-center mb-2">Login</h1>
							</CardHeader>
							<CardBody>
								<Form>
									{/* Username */}
									<Row>
										<Col md="12">
											<FormGroup>
												<label size="lg" className="h4">
													Username
												</label>
												<Input
													bsSize="lg"
													id="username"
													name="username"
													placeholder="Here goes your username"
													type="text"
													value={userInfo.username}
													onChange={e =>
														setUserInfo({
															username: e.target.value,
															password: userInfo.password,
														})
													}
												/>
											</FormGroup>
										</Col>
									</Row>
									{/* Password */}
									<Row>
										<Col md="12">
											<FormGroup>
												<label size="lg">Password</label>
												<Input
													bsSize="lg"
													id="password"
													name="password"
													placeholder="Here goes your password"
													type="password"
													value={userInfo.password}
													onChange={e =>
														setUserInfo({
															username: userInfo.username,
															password: e.target.value,
														})
													}
												/>
											</FormGroup>
										</Col>
									</Row>
								</Form>
							</CardBody>
							<CardFooter className="p-0">
								<Row>
									<Container fluid>
										<Row className="justify-content-center align-items-center mb-3">
											<Col md="3">
												<p>Need an account?</p>
											</Col>
											<Col md="3">
												<Link to="/landing/sign-in">
													<Button
														block
														outline
														className="btn-fill"
														color="primary"
														size="sm">
														Sign-in
													</Button>
												</Link>
											</Col>
										</Row>
									</Container>
								</Row>
								<Row className="justify-content-center">
									<Col md="4">
										<Button
											block
											className="btn-fill "
											color="primary"
											onClick={logIn}>
											Login
										</Button>
									</Col>
								</Row>
							</CardFooter>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	);
}

export default Login;
