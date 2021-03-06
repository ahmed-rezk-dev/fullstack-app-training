import React, { Component } from "react";
import Axios from "axios";
import { Link } from "react-router-dom";

const Exercise = props => (
	<tr>
		<td>{props.exercise.username}</td>
		<td>{props.exercise.description}</td>
		<td>{props.exercise.duration}</td>
		<td>{props.exercise.date.substring(0, 10)}</td>
		<td>
			<Link to={"/edit/" + props.exercise._id}>edit</Link> |{" "}
			<a
				href="#"
				onClick={() => {
					props.deleteExercise(props.exercise._id);
				}}
			>
				delete
			</a>
		</td>
	</tr>
);

export default class ExercisesList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			exercises: []
		};

		this.deleteExercise = this.deleteExercise.bind(this);
	}

	componentWillMount() {
		Axios.get("/exercises/")
			.then(res => {
				console.log("res", res);
				this.setState({ exercises: res.data });
			})
			.catch(err => console.log(`Error: ${err}`));
	}

	deleteExercise(id) {
		Axios.delete(`/exercises/delete/${id}`).then(res => {
			console.log(res.data);
			this.setState({
				exercises: this.state.exercises.filter(el => el._id !== id)
			});
		});
	}

	exercisesList() {
		return this.state.exercises.map(exercissRow => {
			return (
				<Exercise
					exercise={exercissRow}
					deleteExercise={this.deleteExercise}
					key={exercissRow._id}
				/>
			);
		});
	}

	render() {
		return (
			<div>
				<h3>Logged Exercises</h3>
				<table className="table">
					<thead className="thead-light">
						<tr>
							<th>Username</th>
							<th>Description</th>
							<th>Duration</th>
							<th>Date</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>{this.exercisesList()}</tbody>
				</table>
			</div>
		);
	}
}
