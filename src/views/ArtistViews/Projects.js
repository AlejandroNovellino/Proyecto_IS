import React from "react";

// reactstrap components
import { Container, Row, Col, Card, ButtonGroup, Button } from "reactstrap";

// react plugin for creating notifications over the dashboard
import NotificationAlert from "react-notification-alert";
// context
import { Context } from "../../store/appContext";
// project card
import ProjectCard from "./ProjectCard";
import CreateProjectModal from "./CreateProjectModal";
import CreateProjectVersionModal from "./CreateProjectVersionModal";
import CreatePollModal from "./CreatePollModal";

function Projects() {
	// context
	const { store, actions } = React.useContext(Context);
	// project modal open state and toggler
	const [projectModal, setProjectModal] = React.useState(false);
	const projectModalToggler = () => setProjectModal(!projectModal);
	// project modal open state and toggler
	const [projectVersionModal, setProjectVersionModal] = React.useState(false);
	const versionModalToggler = () =>
		setProjectVersionModal(!projectVersionModal);
	// poll modal open state and toggler
	const [pollModal, setPollModal] = React.useState(false);
	const pollModalToggler = () => setPollModal(!pollModal);
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

	return (
		<>
			<div className="content">
				<Container>
					<div className="react-notification-alert-container">
						<NotificationAlert ref={notificationAlertRef} />
					</div>
					{/* modal for creating a project */}
					<CreateProjectModal
						isOpen={projectModal}
						toggle={projectModalToggler}
					/>
					{/* modal for creating a project version */}
					<CreateProjectVersionModal
						isOpen={projectVersionModal}
						toggle={versionModalToggler}
					/>
					{/* modal for creating a poll */}
					<CreatePollModal isOpen={pollModal} toggle={pollModalToggler} />

					{/* Project menu */}
					<Row>
						<Card body>
							<ButtonGroup>
								{/* Create btn */}
								<Button
									className="btn-icon"
									color="primary"
									onClick={projectModalToggler}>
									<Container>
										<Row>
											<Col md={2}>
												<i className="fas fa-plus"></i>
											</Col>
											<Col md={10}>
												<p className="text-left mb-0">New project</p>
											</Col>
										</Row>
									</Container>
								</Button>
								{/* Create btn */}
								<Button className="btn-icon" color="twitter">
									<Container>
										<Row>
											<Col md={2}>
												<i className="fas fa-plus"></i>
											</Col>
											<Col md={10}>
												<p className="text-left mb-0">To assign</p>
											</Col>
										</Row>
									</Container>
								</Button>
								{/* Create btn */}
								<Button className="btn-icon" color="google">
									<Container>
										<Row>
											<Col md={2}>
												<i className="fas fa-plus"></i>
											</Col>
											<Col md={10}>
												<p className="text-left mb-0">To assign</p>
											</Col>
										</Row>
									</Container>
								</Button>
							</ButtonGroup>
						</Card>
					</Row>
					{/* Projects cards */}
					<Row>
						{store.user?.projects &&
							store.user.projects.map((project, index) => {
								return (
									<ProjectCard
										{...project}
										toggle={versionModalToggler}
										modalToggle={pollModalToggler}
										key={index}
									/>
								);
							})}
					</Row>
				</Container>
			</div>
		</>
	);
}

export default Projects;
