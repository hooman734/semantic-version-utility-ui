import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import './NuGet.css';

export class NuGet extends React.Component {
    render() {
        const {pkg, versionType, version} = this.props;
        return (<div style={{font: "Courier New"}}>
                    <h6>{pkg}</h6>
                    <p>{version}</p>
                    <p>{versionType}</p>
                </div>);
    }
}

export default NuGet;
