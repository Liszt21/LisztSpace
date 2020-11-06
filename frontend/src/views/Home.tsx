import React from "react";
import { dateFormat } from "../utils";

// interface IRecord {
// 	start: Date;
// 	end: Date;
// 	tags: string[];
// 	detail?: string;
// 	location?: ILocation[];
// }

// interface ILocation {
// 	longitude: number;
// 	latitude: number;
// }

interface IQSState {
	now: Date;
}

interface IQSProps {}

interface IQSTimeProps {
	time: Date;
}
class QuantifiedSelf extends React.Component {
	state: IQSState;
	interval: number;
	constructor(props: IQSProps) {
		super(props);
		this.state = { now: new Date() };
		this.interval = setInterval(() => {this.setState({ now: new Date() });}, 100);
	}
	render() {
		return (
			<div><QSTime time={this.state.now}/></div>
		)
	}
	componentWillUnmount() {
		clearInterval(this.interval);
	}
}

function QSTime(props: IQSTimeProps) {
	return (
		<p>{dateFormat(props.time)}</p>
	)
}

function Home() {
    return (
      <QuantifiedSelf />
    )
}

export default Home;