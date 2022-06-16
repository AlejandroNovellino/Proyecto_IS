import React from "react";

// reactstrap components
import {
	Modal,
	CardHeader,
	CardBody,
	CardFooter,
	Button,
	Card,
	CardSubtitle,
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

function CreatePollModal(props) {
	// context
	const { store, actions } = React.useContext(Context);
	// user inputs
	const [question, setQuestion] = React.useState("");
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
		return question && true;
	};

	const questionNotEmpty = () => {
		return question.trim() && true;
	};

	/*
{
    "project_id": 1,
    "info": {
       "question": "Is react-polls useful?", 
       "pollAnswers": [
           {"option": "Yes", "votes": 8},
           {"option": "No", "votes": 10}
        ]
    }
}   
*/

	// create poll
	const createPoll = () => {
		if (!obligatoryDataExist()) {
			notifyAlert("You need a question! OwO");
		} else if (!questionNotEmpty()) {
			notifyAlert("Question cannot be empty!");
		} else {
			let result = actions.createPoll({
				artist_id: store.user.id,
				project_id: store.workingProjectId,
				info: {
					question: question,
					pollAnswers: [
						{ option: "Yes", votes: 0 },
						{ option: "No", votes: 0 },
					],
				},
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
							New poll for:{" "}
							<b>
								{actions.getProjectById() && actions.getProjectById().tittle}
							</b>
						</h1>
					</CardHeader>
					<CardBody>
						<CardSubtitle className="my-2 text-muted" tag="h4">
							Remember that the question can only be of type Yes or No. Thanks
							you! :D
						</CardSubtitle>
						<Form>
							<Row>
								<Col className="pr-md-1" md="12">
									<FormGroup>
										<label>Question</label>
										<Input
											placeholder=""
											type="text"
											value={question}
											onChange={e => setQuestion(e.target.value)}
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
									onClick={createPoll}>
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

export default CreatePollModal;
