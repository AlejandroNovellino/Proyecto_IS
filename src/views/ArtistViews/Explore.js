import React from "react";

// reactstrap components
import {
	Container,
	Row,
	Col,
	Card,
	CardHeader,
	CardBody,
	CardTitle,
	CardSubtitle,
	CardText,
	CardFooter,
	Table,
	Button,
	Modal,
	Form,
	FormGroup,
	Label,
	Input,
} from "reactstrap";
// import the poll
import Poll from "react-polls";

// context
import { Context } from "../../store/appContext";
// react dom import
import { useHistory } from "react-router-dom";
// chart component
import PollChart from "./PollChart";

function Explore() {
	// context
	const { store, actions } = React.useContext(Context);
	// projects to display
	const [projects, setProjects] = React.useState(false);
	// projects to display
	const [selectedProject, setSelectedProject] = React.useState(null);
	// comment being written
	const [newComment, setNewComment] = React.useState("");
	// react dom history
	const history = useHistory();
	// project modal for project info
	const [infoModal, setInfoModal] = React.useState(false);
	const infoModalToggler = () => setInfoModal(!infoModal);

	const fetchProjects = async () => {
		let projects = await actions.getAllProjects();
		setProjects(
			projects.filter(project => project?.artist_id !== store.user.id)
		);
	};

	React.useEffect(() => {
		fetchProjects();
	}, []);

	// function to handle the click on info
	const handleClickModal = project => {
		setSelectedProject(project);
		infoModalToggler();
	};

	// function to handle poll vote
	const handleVote = async (poll, voteAnswer) => {
		// update the answers
		const newPollAnswers = poll.pollAnswers.map(answer => {
			if (answer.option === voteAnswer) answer.votes++;
			return answer;
		});
		// updated poll
		let updatedPoll = {
			id: poll.id,
			project_id: poll.project_id,
			info: {
				question: poll.question,
				pollAnswers: newPollAnswers,
			},
		};
		// update the vote in the database
		await actions.updatePoll(updatedPoll);
	};

	const addComment = async _ => {
		if (newComment === "") {
			return false;
		} else {
			// create the comment
			let data = {
				text: newComment,
				artist_id: store.user.id,
				project_id: selectedProject.id,
			};
			await actions.createComment(data);
			// update the selected project
			let aux = selectedProject;
			if (aux?.comments) {
				aux.comments.push(data);
			} else {
				aux.comments = [data];
			}
			setSelectedProject(aux);
			// clear the text area
			setNewComment("");
		}
	};

	return (
		<>
			<div className="content">
				<Container>
					<Row>
						<h2>Available projects</h2>
					</Row>
					{/* Projects cards */}
					<Row>
						{projects &&
							projects.map((project, index) => {
								return (
									<Card body className="card-chart px-5" key={index}>
										<CardHeader></CardHeader>
										<CardBody>
											<CardTitle tag="h1">{project.tittle}</CardTitle>
											<hr style={{ borderTop: "1px solid white" }} />
											<CardSubtitle className="my-2" tag="h4">
												{project?.header}
											</CardSubtitle>
											<br />
											<CardText>{project?.description}</CardText>
											<br />
											<CardSubtitle className="my-2" tag="h4">
												Versions:
											</CardSubtitle>
											{project?.versions && (
												<Table className="tablesorter">
													<thead className="text-primary">
														<tr>
															<th>#</th>
															<th>Name</th>
															<th>Header</th>
															<th>Description</th>
														</tr>
													</thead>
													<tbody>
														{project?.versions &&
															project.versions.map((version, j) => {
																return (
																	<tr key={j}>
																		<td>{j + 1}</td>
																		<td>{version.tittle}</td>
																		<td>{version?.header}</td>
																		<td>{version?.description}</td>
																	</tr>
																);
															})}
													</tbody>
												</Table>
											)}
											{!project?.versions && (
												<CardText>
													This project does not have versions for now :c
												</CardText>
											)}
											<br />
											<Button
												block
												color="primary"
												outline
												size="sm"
												onClick={() => {
													handleClickModal(project);
												}}>
												More info
											</Button>
										</CardBody>
									</Card>
								);
							})}
					</Row>
				</Container>
				{/* modal for creating a project version */}
				<Modal
					fullscreen="lg"
					size="lg"
					toggle={infoModalToggler}
					isOpen={infoModal}
					backdrop={true}
					style={{ maxWidth: "1100px" }}>
					<Card body className="card-chart px-5 mb-0">
						<CardHeader></CardHeader>
						<CardBody>
							<CardTitle tag="h1">{selectedProject?.tittle}</CardTitle>
							<hr style={{ borderTop: "1px solid white" }} />
							<CardSubtitle className="my-2" tag="h4">
								{selectedProject?.header}
							</CardSubtitle>
							<br />
							<CardText>{selectedProject?.description}</CardText>
							<br />
							<CardSubtitle className="my-2" tag="h4">
								Versions:
							</CardSubtitle>
							<Table className="tablesorter">
								<thead className="text-primary">
									<tr>
										<th>#</th>
										<th>Name</th>
										<th>Header</th>
										<th>Description</th>
									</tr>
								</thead>
								<tbody>
									{selectedProject?.versions &&
										selectedProject.versions.map((version, index) => {
											return (
												<tr key={index}>
													<td>{index + 1}</td>
													<td>{version.tittle}</td>
													<td>{version?.header}</td>
													<td>{version?.description}</td>
												</tr>
											);
										})}
								</tbody>
							</Table>
							<br />
							<CardSubtitle className="my-2" tag="h4">
								Files:
							</CardSubtitle>
							<Table className="tablesorter">
								<thead className="text-primary">
									<tr>
										<th>#</th>
										<th>Name</th>
									</tr>
								</thead>
								<tbody>
									{selectedProject?.files &&
										selectedProject.files.map((file, index) => {
											return (
												<tr key={index}>
													<td>{index + 1}</td>
													<td>{file.filename}</td>
												</tr>
											);
										})}
								</tbody>
							</Table>
							<br />

							{selectedProject?.polls && (
								<>
									<hr style={{ borderTop: "1px solid white" }} />
									<CardSubtitle className="mt-2 mb-3" tag="h4">
										Polls:
									</CardSubtitle>
								</>
							)}
							{selectedProject?.polls &&
								selectedProject.polls.map((poll, index) => {
									return (
										<Container fluid key={index} className="mb-5">
											<Poll
												customStyles={{
													questionColor: "#FFFF",
													align: "center",
													theme: "blue",
												}}
												question={poll.question}
												answers={poll.pollAnswers}
												onVote={voteAnswer => {
													handleVote(poll, voteAnswer);
												}}
											/>
										</Container>
									);
								})}

							<hr style={{ borderTop: "1px solid white" }} />
							<CardSubtitle className="mt-2 mb-3" tag="h4">
								Comments:
							</CardSubtitle>
							{!selectedProject?.comments && (
								<p>
									No comments in the project for now, be te first one to
									interact! :D
								</p>
							)}
							{selectedProject?.comments &&
								selectedProject?.comments.map((comment, index) => {
									return (
										<Container key={index} className="px-5">
											<CardText>{comment?.text}</CardText>
											<hr style={{ borderTop: "1px solid aqua" }} />
										</Container>
									);
								})}
							<Form>
								<FormGroup>
									<Label for="exampleText">Type your comment here</Label>
									<Input
										id="exampleText"
										name="text"
										type="textarea"
										value={newComment}
										onChange={e => setNewComment(e.target.value)}
									/>
									<Button
										block
										outline
										className="btn-primary"
										size="sm"
										onClick={addComment}>
										Comment
									</Button>
								</FormGroup>
							</Form>
						</CardBody>
					</Card>
				</Modal>
			</div>
		</>
	);
}

export default Explore;
