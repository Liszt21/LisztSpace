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

interface IQSTimeState {
	now: Date;
}

interface IQSActionProps {
	action: Function;
}

enum EQSAction {
	Start, Stop, Pause, Cancel
}
class QuantifiedSelf extends React.Component {
	state!: IQSState;
	interval?: number;
	render() {
		return (
			<div>
				<QSTime />
				<QSAction action={(action: EQSAction) => console.log(EQSAction[action])}
					/>
			</div>
		)
	}
	
}

class QSTime extends React.Component {
	state!: IQSTimeState;
	interval?: number;
	
	constructor(props: any) {
		super(props);
		this.state = { now: new Date() }
	}

	render() {
		return (
			<p>{dateFormat(this.state.now)}</p>
		)
	}
	componentDidMount() {
		this.interval = setInterval(() => {this.setState({ now: new Date() });}, 100);
	}
	componentWillUnmount() {
		clearInterval(this.interval);
	}
}

function QSAction(props: IQSActionProps) {
	return (
		<div>
			{Object.keys(EQSAction)
				.filter(k => typeof( EQSAction[k as any]) === "number")
				.map((item) => {
					return <button onClick={() =>
						props.action(item)} key={item}>{item}</button>}
			)}
		</div>
	)
}

function Home() {
    return (
      <QuantifiedSelf />
    )
}

export default Home;
