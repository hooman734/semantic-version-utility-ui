import React from 'react';
import axios from 'axios';
import './NuGet.css';

export class NuGet extends React.Component {
    constructor(props) {
        super(props);
        this.state = { pkg: null , response: null};
    }

    handleChange(event) {
        this.setState({
            package: event.target.value
        });
    }

    handleClick() {
        // axios.get("localhost:5000/api/nuget/Lion.Core/majorcal").then((feedback)=>{this.setState({response: "feedback"})});
        // this.setState({response: "feedback"});
    }

  
    render() {
        const  { pkg, response } = this.state;

        return (<div>
            <label>Input Package?</label>
            <hr></hr>
            <input type="text" value={pkg} onChange={this.handleClick}></input>
            <button click={this.handleClick}>Ask!</button>
            <h6>{response}</h6>
        </div>);
    }
}

export default NuGet;
