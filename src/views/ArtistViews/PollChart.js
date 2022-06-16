import React from "react";

// reactstrap components
import {} from "reactstrap";
import { Bar } from "react-chartjs-2";

function PollChart(props) {
	const getMax = _ => {
		let numberOfYes = props.pollAnswers[0].votes;
		let numberOfNo = props.pollAnswers[1].votes;

		// if no body have voted
		if (numberOfYes === 0 && numberOfNo === 0) return 5;

		return numberOfYes > numberOfNo ? numberOfYes : numberOfNo;
	};

	let chartInfo = {
		data: canvas => {
			let ctx = canvas.getContext("2d");

			let gradientStroke = ctx.createLinearGradient(0, 230, 0, 50);

			gradientStroke.addColorStop(1, "rgba(72,72,176,0.1)");
			gradientStroke.addColorStop(0.4, "rgba(72,72,176,0.0)");
			gradientStroke.addColorStop(0, "rgba(119,52,169,0)"); //purple colors

			return {
				labels: props.pollAnswers.map(element => element.option),
				datasets: [
					{
						label: props.question,
						fill: true,
						backgroundColor: gradientStroke,
						hoverBackgroundColor: gradientStroke,
						borderColor: "#d048b6",
						borderWidth: 2,
						borderDash: [],
						borderDashOffset: 0.0,
						data: props.pollAnswers.map(element => element.votes),
					},
				],
			};
		},
		options: {
			maintainAspectRatio: false,
			legend: {
				display: false,
			},
			tooltips: {
				backgroundColor: "#f5f5f5",
				titleFontColor: "#333",
				bodyFontColor: "#666",
				bodySpacing: 4,
				xPadding: 12,
				mode: "nearest",
				intersect: 0,
				position: "nearest",
			},
			responsive: true,
			scales: {
				yAxes: [
					{
						gridLines: {
							drawBorder: false,
							color: "rgba(225,78,202,0.1)",
							zeroLineColor: "transparent",
						},
						ticks: {
							suggestedMin: 0,
							suggestedMax: getMax(),
							padding: 20,
							fontColor: "#9e9e9e",
						},
					},
				],
				xAxes: [
					{
						gridLines: {
							drawBorder: false,
							color: "rgba(225,78,202,0.1)",
							zeroLineColor: "transparent",
						},
						ticks: {
							padding: 20,
							fontColor: "#9e9e9e",
						},
					},
				],
			},
		},
	};

	return (
		<>
			<h6>{props?.question}</h6>
			<div className="chart-area">
				<Bar data={chartInfo.data} options={chartInfo.options} />
			</div>
		</>
	);
}

export default PollChart;
