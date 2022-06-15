import React, { useState } from "react";

// reactstrap components
import {
	Row,
	Col,
	Card,
	CardHeader,
	CardBody,
	CardTitle,
	CardSubtitle,
	CardFooter,
	CardText,
	Table,
	Button,
} from "reactstrap";

import { Context } from "store/appContext";
import PollChart from "./PollChart";

/* project data 
project = {
  "id": int,
  "artist_id": string,
  "tittle": string,
  "header": string,
  "description": string,
  "versions": list,
  "polls": [
    info = {
      "question": 'Is react-polls useful?', 
      "pollAnswers": [
          {option: 'Yes', votes: 8},
          {option: 'No', votes: 10}
      ]
    },
  ]
}
*/

function ProjectCard(props) {
	const [projectId, setProjectId] = useState(props.id);
	// context
	const { store, actions } = React.useContext(Context);

	const newVersionHandler = () => {
		actions.setWorkingProjectId(projectId);
		props.toggle();
	};

	const newPollHandler = () => {
		actions.setWorkingProjectId(projectId);
		props.modalToggle();
	};

	return (
		<>
			<Card body>
				<CardHeader></CardHeader>
				<CardBody>
					<CardTitle tag="h1">{props.tittle}</CardTitle>
					<CardSubtitle className="my-2" tag="h4">
						{props?.header}
					</CardSubtitle>
					<br />
					<CardText>{props?.description}</CardText>
					<br />
					<CardSubtitle className="my-2" tag="h4">
						Versions:
					</CardSubtitle>
					<Table className="tablesorter" responsive>
						<thead className="text-primary">
							<tr>
								<th>#</th>
								<th>Name</th>
								<th>Header</th>
								<th>Description</th>
							</tr>
						</thead>
						<tbody>
							{props?.versions &&
								props.versions.map((version, index) => {
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
					<Button
						block
						color="primary"
						outline
						size="sm"
						onClick={newVersionHandler}>
						Create new version
					</Button>
					<br />
					{props?.header && (
						<CardSubtitle className="mt-2 mb-3" tag="h4">
							Polls:
						</CardSubtitle>
					)}
					{props?.polls &&
						props.polls.map((poll, index) => {
							return <PollChart {...poll} key={index} />;
						})}
					<br />
					<Button
						block
						color="primary"
						outline
						size="sm"
						onClick={newPollHandler}>
						Create new poll
					</Button>
				</CardBody>
				<CardFooter>
					<Row className="justify-content-center">
						<Col md="4"></Col>
					</Row>
				</CardFooter>
			</Card>
		</>
	);
}

export default ProjectCard;
