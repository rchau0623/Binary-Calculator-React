import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

class Parent extends React.Component {
	constructor() {
		super();
		this.state = {counts: [0,0,0,0,0,0,0,0], lastClicked: '', total: 0}
	}
	
	handleClick(i){
		// react tends to like immutable data structures
		const copy = this.state.counts.slice();
		if (copy[i] === 1) { copy[i] = 0; } 
		else { copy[i] = 1; }
		let x;
		if (copy[i] == 0) { x = -1; } 
		else { x = 1; }
		// to change state. don't just reassign.....
		this.setState({counts: copy, lastClicked: i, total: this.state.total + x * Math.pow(2, 7-i)});
	}
	
	render() {
		const clickers = this.state.counts.map((count, i) => {
			return (
				// because we have index
				// we can call handle click w/ appropriate #
				<Child clickFunc={() => {this.handleClick(i)}} val={count}/>
			)
			
		});
		return (
			<div>{clickers} = <h1>{this.state.total}</h1> </div>
		)
	}
}

class Child extends React.Component {
	render() {
		return (
			<h1 onClick={this.props.clickFunc}>{this.props.val}</h1>
		)
	}
}

ReactDOM.render(<Parent />, document.getElementById('root'));
registerServiceWorker();
