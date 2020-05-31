import React from 'react';
import NuGet from '../NuGet/NuGet'

class DisplayPanel extends React.Component {
    render() {
        return (<NuGet package="Lion.Core"></NuGet>);
    }
}

export default DisplayPanel;