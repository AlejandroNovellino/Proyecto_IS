import React from "react";

// reactstrap components
import {
	Modal,
	CardHeader,
	CardBody,
	CardFooter,
	Button,
	Card,
	Row,
	Col,
	Form,
	FormGroup,
	Input,
} from "reactstrap";

// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";
// context
import { Context } from "../../store/appContext";

function CreateProjectVersionModal(props) {
	// context
	const { store, actions } = React.useContext(Context);
	// user inputs
	const [tittle, setTittle] = React.useState("");
	const [header, setHeader] = React.useState("");
	const [description, setDescription] = React.useState("");
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
		return tittle && true;
	};

	const tittleNotEmpty = () => {
		return tittle.trim() && true;
	};

	// create project
	const createProjectVersion = () => {
		if (!obligatoryDataExist()) {
			notifyAlert("Obligatory information missing! :c");
		} else if (!tittleNotEmpty()) {
			notifyAlert("Tittle cannot be empty!");
		} else {
			let result = actions.createProjectVersion({
				artist_id: store.user.id,
				project_id: store.workingProjectId,
				tittle: tittle,
				header: header,
				description: description,
			});

			if (result) {
				props.toggle();
			} else {
				notifyAlert("An error ocurred! :c");
			}
		}
	};

	return (
		<>
			<Modal
				fullscreen="lg"
				size="lg"
				toggle={props.toggle}
				isOpen={props.isOpen}
				backdrop={true}>
				<div className="react-notification-alert-container">
					<NotificationAlert ref={notificationAlertRef} />
				</div>
				<Card body className="mb-0">
					<CardHeader>
						<h1>
							New project version for:{" "}
							<b>
								{actions.getProjectById() && actions.getProjectById().tittle}
							</b>
						</h1>
					</CardHeader>
					<CardBody>
						<Form>
							<Row>
								<Col className="pr-md-1" md="12">
									<h2 className="title mb-3">Obligatory fields</h2>
								</Col>
							</Row>
							<Row>
								<Col className="pr-md-1" md="12">
									<FormGroup>
										<label>Tittle</label>
										<Input
											placeholder=""
											type="text"
											value={tittle}
											onChange={e => setTittle(e.target.value)}
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
								<Col className="pr-md-1" md="12">
									<FormGroup>
										<label>Header</label>
										<Input
											placeholder=""
											type="text"
											value={header}
											onChange={e => setHeader(e.target.value)}
										/>
									</FormGroup>
								</Col>
							</Row>
							<Row>
								<Col className="pr-md-1" md="12">
									<FormGroup>
										<label>Project description</label>
										<Input
											placeholder=""
											type="textarea"
											value={description}
											rows="4"
											onChange={e => setDescription(e.target.value)}
										/>
									</FormGroup>
								</Col>
							</Row>
						</Form>
					</CardBody>
					<CardFooter>
						<Row className="justify-content-center">
							<Col md="4">
								<Button
									block
									className="btn-fill "
									color="danger"
									onClick={props.toggle}>
									Cancel
								</Button>
							</Col>
							<Col md="4">
								<Button
									block
									className="btn-fill "
									color="success"
									onClick={createProjectVersion}>
									Confirm
								</Button>
							</Col>
						</Row>
					</CardFooter>
				</Card>
			</Modal>
		</>
	);
}

export default CreateProjectVersionModal;
