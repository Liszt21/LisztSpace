import React from "react";
import { dateFormat } from "../utils";
import styled from "styled-components";

interface RecordItem {
	start: Date;
	end?: Date;
	tags?: string[];
	detail?: string;
}

interface State {
  records: RecordItem[];
}

interface TimeState {
	now: Date;
}

interface ActionProps {
	action: Function;
}

interface BoardProps {
  records: RecordItem[];
}

enum EAction {
	Start, Stop, Pause, Cancel
}

const Wrapper = styled.div`
  display: flex;
  flex-flow: row wrap;

  justify-content: space-around;

  .qs-time {
    width: 100%;
  }

  .qs-action {
    display: flex;
    flex-flow: column;
  }
`

class QuantifiedSelf extends React.Component {
	state!: State;
  interval?: number;

  constructor(props: any) {
    super(props);
    this.state = { 
      records: [{
        start: new Date()
      }]
    }
    this.newRecord = this.newRecord.bind(this);
  }

	render() {
		return (
			<Wrapper>
				<Time />
        <Board records={this.state.records} />
				<Action action={this.newRecord} />
			</Wrapper>
		)
	}
  
  newRecord(e: any) {
    this.state.records.push({
      start: new Date(),
    })
    this.setState({records: this.state.records})
  }
}

class Time extends React.Component {
	state!: TimeState;
	interval?: number;
	
	constructor(props: any) {
		super(props);
		this.state = { now: new Date() }
	}

	render() {
		return (
			<div className="qs-time">{dateFormat(this.state.now)}</div>
		)
  }
  
	componentDidMount() {
		this.interval = setInterval(() => {this.setState({ now: new Date() });}, 100);
  }
  
	componentWillUnmount() {
		clearInterval(this.interval);
	}
}

function Action(props: ActionProps) {
	return (
		<div className="qs-action">
			{Object.keys(EAction)
				.filter(k => typeof( EAction[k as any]) === "number")
				.map((item) => {
					return <button onClick={() =>
						props.action(item)} key={item}>{item}</button>}
			)}
		</div>
	)
}

function Board(props: BoardProps) {
  return (
    <div className="qs-board">
      {
        props.records.map(record => {
          return <p>{+new Date() - record.start.getTime()}</p>
        })
      }
    </div>
  )
}

function Home() {
    return (
      <QuantifiedSelf />
    )
}

export default Home;
