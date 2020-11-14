import React from "react";
import { dateFormat } from "../utils";
import styled from "styled-components";

interface RecordItem {
	start: Date;
	end?: Date;
	tags?: string[];
	detail?: string;
}

interface Records {
  finished: RecordItem[];
  active: RecordItem[];
}

interface State {
  records: Records;
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
      records: {
        active: [{
          start: new Date()
        }],
        finished: []
      }
    }
    this.newRecord = this.newRecord.bind(this);
  }

	render() {
		return (
			<Wrapper>
				<Time />
        <Board records={this.state.records.active} />
				<Action action={this.newRecord}
					/>
			</Wrapper>
		)
	}
  
  newRecord(e: any) {
    let active = this.state.records.active;
    active.push({
      start: new Date(),
    })
    this.setState({records: {
      active: active
    }})
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
          return <p>1</p>
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
