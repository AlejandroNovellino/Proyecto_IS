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
	Container,
	Button,
	Card,
	CardHeader,
	CardBody,
	CardFooter,
	FormGroup,
	Form,
	Input,
	Row,
	Col,
	FormText,
} from "reactstrap";

import { Link, useHistory } from "react-router-dom";
import countryList from "variables/countries.js";
// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";
// context
import { Context } from "../store/appContext";
// regex constants
import {
	emailRegex,
	passwordRegex,
	nameRegex,
} from "variables/regularExpressions";

function SignIn() {
	// context
	const { store, actions } = React.useContext(Context);
	// react dom history
	const history = useHistory();
	// user inputs
	const [username, setUsername] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	const [passwordAux, setPasswordAux] = React.useState("");
	const [firstName, setFirstName] = React.useState("");
	const [lastName, setLastName] = React.useState("");
	const [age, setAge] = React.useState(0);
	const [nationality, setNationality] = React.useState("");
	const [bio, setBio] = React.useState("");
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

	// verifications
	const obligatoryDataExist = () => {
		return username && email && password && passwordAux;
	};
	const emailCorrect = () => {
		return emailRegex.test(email);
	};
	const passwordCorrect = () => {
		return passwordRegex.test(password);
	};
	const passwordEqualsVerify = () => {
		return password === passwordAux;
	};
	const verifyNames = name => {
		return !nameRegex.test(name);
	};

	const infoDict = () => {
		let returnDict = {};
		if (username) returnDict.username = username;
		if (email) returnDict.email = email;
		if (password) returnDict.password = password;
		if (firstName) returnDict.first_name = firstName;
		if (lastName) returnDict.last_name = lastName;
		if (age) returnDict.age = age;
		if (nationality) returnDict.nationality = nationality;
		if (bio) returnDict.bio = bio;

		return returnDict;
	};

	const createUser = async () => {
		if (!obligatoryDataExist()) {
			notifyAlert("Obligatory information missing! :c");
		} else if (!emailCorrect()) {
			notifyAlert("You have entered an invalid email address! \\O.O/");
		} else if (!passwordCorrect()) {
			notifyAlert("You have entered an invalid password! \\O.O/");
		} else if (!passwordEqualsVerify()) {
			notifyAlert("The passwords does not match! \\O.O/");
		} else if (!verifyNames(firstName)) {
			notifyAlert("First name cannot contain special characters \\O.O/");
		} else if (!verifyNames(lastName)) {
			notifyAlert("Last name cannot contain special characters \\O.O/");
		} else {
			if (await actions.signIn(infoDict())) {
				history.push("/artist");
			} else {
				notifyAlert("An error ocurred! :c");
			}
		}
	};

	return (
		<>
			<Container className="mt-5 pt-5">
				<div className="react-notification-alert-container">
					<NotificationAlert ref={notificationAlertRef} />
				</div>
				<Row className="justify-content-center">
					<Col md="10">
						<Card body>
							<CardHeader>
								<h1 className="title text-center mb-2">Sign In</h1>
							</CardHeader>
							<CardBody>
								<Form>
									<Row>
										<Col className="pr-md-1" md="6">
											<h2 className="title mb-3">Obligatory fields</h2>
										</Col>
									</Row>
									<Row>
										<Col className="pr-md-1" md="6">
											<FormGroup>
												<label>Username</label>
												<Input
													placeholder=""
													type="text"
													value={username}
													onChange={e => setUsername(e.target.value.trim())}
												/>
											</FormGroup>
										</Col>
										<Col className="pr-md-1" md="6">
											<FormGroup>
												<label>Email</label>
												<Input
													placeholder="example@art.com"
													type="email"
													value={email}
													onChange={e => setEmail(e.target.value.trim())}
												/>
											</FormGroup>
										</Col>
									</Row>
									<Row className="mb-3">
										<Col className="pr-md-1" md="6">
											<FormGroup>
												<label>Password</label>
												<Input
													className="mb-1"
													placeholder=""
													type="password"
													value={password}
													onChange={e => setPassword(e.target.value.trim())}
												/>
												<FormText>
													Password have to be between 7 to 15 characters with at
													least one numeric digit and a special character like
													!@#$%^&*
												</FormText>
											</FormGroup>
										</Col>
										<Col className="pr-md-1" md="6">
											<FormGroup>
												<label>Password again please :D</label>
												<Input
													placeholder=""
													type="password"
													value={passwordAux}
													onChange={e => setPasswordAux(e.target.value.trim())}
												/>
											</FormGroup>
										</Col>
									</Row>
									<Row>
										<Col className="pr-md-1" md="6">
											<h2 className="title mb-3">Optional fields</h2>
										</Col>
									</Row>
									<Row>
										<Col className="pr-md-1" md="6">
											<FormGroup>
												<label>First Name</label>
												<Input
													placeholder=""
													type="text"
													value={firstName}
													onChange={e => setFirstName(e.target.value.trim())}
												/>
											</FormGroup>
										</Col>
										<Col className="pr-md-1" md="6">
											<FormGroup>
												<label>Last Name</label>
												<Input
													placeholder=""
													type="text"
													value={lastName}
													onChange={e => setLastName(e.target.value.trim())}
												/>
											</FormGroup>
										</Col>
									</Row>
									<Row className="justify-content-between">
										<Col className="pr-md-1" md="2">
											<FormGroup>
												<label>Age</label>
												<Input
													placeholder=""
													type="number"
													value={age}
													onChange={e => {
														let ageNumber = parseInt(e.target.value);
														if (ageNumber < 0) {
															setAge(0);
														} else {
															setAge(ageNumber);
														}
													}}
												/>
											</FormGroup>
										</Col>
										<Col className="pr-md-1" md="6">
											<FormGroup>
												<label>Nationality</label>
												<Input
													placeholder="Country"
													type="select"
													value={nationality}
													onChange={e => setNationality(e.target.value)}>
													{countryList.map((element, index) => {
														return <option key={index}>{element}</option>;
													})}
												</Input>
											</FormGroup>
										</Col>
									</Row>
									<Row>
										<Col md="12">
											<FormGroup>
												<label>About Me</label>
												<Input
													placeholder="Here can be your description"
													type="textarea"
													value={bio}
													onChange={e => setBio(e.target.value)}
												/>
											</FormGroup>
										</Col>
									</Row>
								</Form>
							</CardBody>
							<CardFooter>
								<Row className="justify-content-center">
									<Col md="4">
										<Link to="/landing/login">
											<Button block className="btn-fill " color="danger">
												Cancel
											</Button>
										</Link>
									</Col>
									<Col md="4">
										<Button
											block
											className="btn-fill "
											color="success"
											onClick={createUser}>
											Confirm
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

export default SignIn;
