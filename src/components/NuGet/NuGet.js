import React from 'react';
import axios from 'axios';
import './NuGet.css';

export class NuGet extends React.Component {
    state = { pkg: '' , version: ''};
   
    handleChange = (event) => {
        console.log(event.target.value)
        this.setState({
            pkg: event.target.value
        });
    }

    handleClick = () => {
        axios.get("http://127.0.0.1:5000/api/nuget/Lion.Core/major", {PORT: 5000})
        .then(res => res.json()).then(result => {
            console.log(result);
            this.setState({version: 'feedback'});

        }, error => {
            console.log(error);
            this.setState({version: 'non feedback'});
        })
       
        // fetch('http:localhost:5000/api/nuget/Lion.Core/major')
        // .then(res => res.json()).then(result => {
        //     console.log(result);
        //     this.setState({version: 'feedback'});

        // }, error => {
        //     console.log(error);
        //     this.setState({version: 'non feedback'});
        // })
    }

  
    render() {
        const  { pkg, version } = this.state;

        return (<div>
            <label>Input Package?</label>
            <hr></hr>
            <input type="text" value={pkg} onChange={this.handleChange}></input>
            <button onClick={this.handleClick}>Ask!</button>
            <h6>version:  {version}</h6>
            <h6>package:  {pkg}</h6>
        </div>);
    }
}

export default NuGet;
