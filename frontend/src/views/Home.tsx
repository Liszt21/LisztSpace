import React from "react";
import { dateFormat } from "../utils";
import styled from "styled-components";

interface QSRecordItem {
	start: Date;
	end?: Date;
	tags?: string[];
	detail?: string;
}
interface QSRecords {
  finished: QSRecordItem[];
  active: QSRecordItem[];
}

interface QSState {
  records: QSRecords;
}

interface QSTimeState {
	now: Date;
}

interface QSActionProps {
	action: Function;
}

interface QSBoardProps {
  records: QSRecordItem[];
}

enum EQSAction {
	Start, Stop, Pause, Cancel
}

const QSWrapper = styled.div`
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
	state!: QSState;
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
			<QSWrapper>
				<QSTime />
        <QSBoard records={this.state.records.active} />
				<QSAction action={this.newRecord}
					/>
			</QSWrapper>
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

class QSTime extends React.Component {
	state!: QSTimeState;
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

function QSAction(props: QSActionProps) {
	return (
		<div className="qs-action">
			{Object.keys(EQSAction)
				.filter(k => typeof( EQSAction[k as any]) === "number")
				.map((item) => {
					return <button onClick={() =>
						props.action(item)} key={item}>{item}</button>}
			)}
		</div>
	)
}

function QSBoard(props: QSBoardProps) {
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
