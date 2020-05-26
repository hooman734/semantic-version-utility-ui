import React from 'react';
import './NuGet.css';

export class NuGet extends React.Component {
    constructor(props) {
        this.state = { package: '' };
    }

    handleChange(event) {
        this.setState({
            package: event.target.value
        });
    }

    handleClick() {
        
    }

    render() {
        const  { package } = this.state;

        return (<div>
            <input type="text" value={package} onChange={e =}></input>
            <button click={}></button>
        </div>)
    }
}
