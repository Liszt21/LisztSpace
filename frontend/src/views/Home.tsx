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

interface IQSActionProps {
	action: Function;
}

enum EQSAction {
	start = 1,
	stop,
	pause,
	cancel
}
class QuantifiedSelf extends React.Component {
	state: IQSState;
	interval?: number;
	constructor(props: IQSProps) {
		super(props);
		this.state = { now: new Date() };
	}
	render() {
		return (
			<div>
				<QSTime time={this.state.now}/>
				<QSAction action={(action: EQSAction) => console.log(EQSAction[action])}
					/>
			</div>
		)
	}
	componentDidMount() {
		this.interval = setInterval(() => {this.setState({ now: new Date() });}, 100);
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

function QSAction(props: IQSActionProps) {
	return (
		<div>
			<button onClick={() => props.action(1)}>Start</button>
			<button onClick={() => props.action(2)}>Stop</button>
			<button onClick={() => props.action(3)}>Pause</button>
			<button onClick={() => props.action(4)}>Cancel</button>
		</div>
	)
}

function Home() {
    return (
      <QuantifiedSelf />
    )
}

export default Home;