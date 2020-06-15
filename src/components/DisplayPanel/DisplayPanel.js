import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import NuGet from '../NuGet/NuGet';

class DisplayPanel extends React.Component {

    state = {
        mainURL: 'https://query-on-nuget.herokuapp.com/',
        version: '-. - . - ',
        searchField: '',
        pkg: '',
        type: '',
        major: false,
        minor: false,
        patch: false,
        suggestionList: [],
    };



    handleSearch = () => {
        this.setState((state) => {
            const {mainURL, pkg, type} = state;
            const midURL = '/api/version/';
            const suffixURL = '/json';
            const versionURL = mainURL + midURL + pkg + '/' + type +  suffixURL;
            fetch(versionURL)
                .then(res => res.json()).then(result => {
                    this.setState({version: ''.concat(result[0], ' . ', result[1], ' . ', result[2])});
            }, error => {
                    this.setState({version: 'no feedback!'});
            });
        });
    }

    handleSearchButton = (e) => {
        e.preventDefault();
        this.setState((state) => ({pkg: state.searchField}));
        this.handleSearch();
    }

    handleSearchInput = (e) => {
        this.setState({searchField: e.target.value});
        this.setState({type: 'patch', major: false, minor: false, patch: true});
        this.setState((state) => {
            const {mainURL, searchField} = state;
            const midURL = 'api/query/';
            const suffixURL = '/json';
            const queryURL = mainURL + midURL + searchField + suffixURL;
            fetch(queryURL)
                .then(res => res.json()).then(result => {
                this.setState({suggestionList: result});
            }, error => {
                this.setState({suggestionList: []});
            });
        });
        console.log("------->");
        console.log(this.state.suggestionList);
    };

    render() {
        const {version, pkg, type, major, minor, patch} = this.state;
        let title;
        if (pkg === '') {
            title = <h5>Please input a Package name for searching.</h5>;
        }
        else {
            title = <h5>Next version of " <strong>{pkg}</strong> " based on " {type} " :</h5>;
        }

        return (<div>
                    <form action="">
                        <div className="form-row" >
                            <div className="form-group col-md-6">
                                <label htmlFor="" ><h3>Search for packages on NuGet.org</h3></label>
                                <hr/>
                                <input type="text"   className = 'form-control'  placeholder="package" onChange={this.handleSearchInput}/>
                                {this.state.suggestionList.map(item => (
                                    <ui>
                                        <li>{item}</li>
                                    </ui>
                                ))}
                                <br/>
                                <button type='submit' className="btn btn-secondary btn-group-sm" onClick={this.handleSearchButton}>
                                    Search
                                </button>
                            </div>
                        </div>
                        <hr/>
                        <label htmlFor=""><em>Based on what type of version:</em></label>
                        <div className="btn-toolbar">
                            <div className="btn-group btn-group-vertical">
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" id="major"
                                           onChange={(e)=>{
                                               this.setState({type: 'major', major: true, minor: false, patch: false});
                                               this.handleSearch();}} value='major' checked={major}/>
                                    <label htmlFor="major" className="form-check-label">Major</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" id="minor"
                                           onChange={(e)=>{
                                               this.setState({type: 'minor', major: false, minor: true, patch: false});
                                               this.handleSearch();}} name={type} value='minor' checked={minor}/>
                                    <label htmlFor="minor" className="form-check-label">Minor</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" id="patch"
                                           onChange={(e)=>{
                                               this.setState({type: 'patch', major: false, minor: false, patch: true});
                                               this.handleSearch();}} name={type} value='patch' checked={patch}/>
                                    <label htmlFor="patch" className="form-check-label">Patch</label>
                                </div>
                            </div>
                        </div>
                    </form>
                    <hr/>
                    <div className="card" style={{width: "35rem"}}>
                        <div className="card-header">
                            {title}
                        </div>
                        <div className="card-body">
                            <NuGet pkg={pkg} versionType={type} version={version}/>
                        </div>
                    </div>
                </div>);
    }
}

export default DisplayPanel;