import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import './NuGet.css';

export class NuGet extends React.Component {
    state = { pkg: '' , version: '', type: ''};
   
    constructor(props) {
        super(props)
        this.state.pkg = props.package;
        this.state.type = props.versionType;
        console.log("--------------------");
        console.log(this.props.pkg);
        console.log("--------------------");
    }
    componentDidUpdate(prevProps) {
        if (this.props.package !== prevProps.package || this.props.versionType !== prevProps.versionType) {
            this.setState({
                pkg: this.props.package,
                type: this.props.versionType
            });
            const mainURL = 'http://localhost:5000/';
            const midURL = 'api/nuget/';
            const suffixURL = '/json';
            const queryURL = mainURL + midURL + this.state.pkg + '/' + this.state.type +  suffixURL;

            fetch(queryURL)
                .then(res => res.json()).then(result => {
                console.log(result);
                this.setState({version: 'Next version: '+result[2][0]+' . ' +
                        result[2][1]+' . '+result[2][2]+' based '+this.state.type});

            }, error => {
                console.log(error);
                this.setState({version: 'No feedback!'});
            })
        }
    }
    render() {
        const  { version } = this.state;

        return (<div>
                    <p>{version}</p>
                </div>);
    }
}

export default NuGet;
