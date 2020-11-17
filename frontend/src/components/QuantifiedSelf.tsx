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
  now: Date;
}

interface TimeProps {
	now: Date;
}

interface ActionProps {
	action: Function;
}

interface BoardProps {
  records: RecordItem[];
  now: Date;
}

interface BoardItemProps {
  start: Date;
  now: Date;
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
      }],
      now: new Date()
    }
    this.newRecord = this.newRecord.bind(this);
  }

	render() {
		return (
			<Wrapper>
				<Time now={this.state.now} />
        <Board records={this.state.records} now={this.state.now} />
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

	componentDidMount() {
		this.interval = setInterval(() => {this.setState({ now: new Date() });}, 1000);
  }
  
	componentWillUnmount() {
		clearInterval(this.interval);
	}
}

function Time(props: TimeProps) {
  return (
			<div className="qs-time">{dateFormat(props.now)}</div>
  )
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
          return <BoardItem start={record.start} now={props.now} />
        })
      }
    </div>
  )
}

function BoardItem(props: BoardItemProps) {
  const time = (props.now.getTime() - props.start.getTime()) / 1000
  const h = (time / 3600).toFixed(0);
  const m = (time % 3600 / 60).toFixed(0);
  const s = (time % 60 ).toFixed(0);
  const message = h + ":" + m + ":" + s

  return (
    <div>{message}</div>
  )
}

export default QuantifiedSelf;
