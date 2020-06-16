import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import NuGet from '../NuGet/NuGet';
import './DisplayPanel.css';

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
        suggestionSize: 0,
        hiddenSuggestion : true,
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
        if (e.target.value.length === 0) {
            this.setState({hiddenSuggestion: true, focusedSuggestion: true});
        }
        setTimeout(() => {
            this.setState((state) => {
                const {mainURL, searchField} = state;
                const midURL = 'api/query/';
                const suffixURL = '/json';
                const queryURL = mainURL + midURL + searchField + suffixURL;
                fetch(queryURL)
                    .then(res => res.json()).then(result => {
                    this.setState({suggestionList: result, suggestionSize: result.length/3, hiddenSuggestion: false});
                }, error => {
                    this.setState({suggestionList: []});
                });
            });
        }, 100)

    };

    handleEnterStroke = (e, item) => {
        e.preventDefault();
            if (e.charCode === 13 || e.keyCode === 13) {
                this.setState({searchField: item, hiddenSuggestion: true});
            }
        }


    render() {
        const {version,
            pkg,
            type,
            major,
            minor,
            patch,
            searchField,
            suggestionList,
            suggestionSize,
            hiddenSuggestion} = this.state;
        const {handleEnterStroke,
            handleSearchInput,
            handleSearchButton,
            handleSearch} = this;
        let title;
        let firstIdOfItems = 0;
        if (pkg === '') {
            title = <h5>Please input a Package name for searching.</h5>;
        }
        else {
            title = <h6>Next version of " <strong>{pkg}</strong> " based on " {type} " :</h6>;
        }

        return (<div className="container-fluid">
                <div className="row justify-content-sm-center">
                    <div className="col-sm-6">
                        <div className="d-flex justify-content-sm-around">
                            <form >
                                <div className="form-row" >
                                    <div className="form-group">
                                        <label htmlFor="" ><h3>Search for packages on NuGet.org</h3></label>
                                        <hr/>
                                        <input type="text"  className = 'form-control'  value={searchField} placeholder="Search package..." onChange={handleSearchInput}/>
                                        <select className="btn btn-outline-secondary dropdown-toggle"
                                                hidden={hiddenSuggestion}
                                                style={{width: "inherit"}}
                                                size={suggestionSize}>
                                            {/*<option value={""} disabled selected>Available packages...</option>*/}
                                            {
                                                suggestionList.map(item => (
                                                    <option key={firstIdOfItems++}
                                                            value={item}
                                                            onClick={() => {this.setState({searchField: item})}}
                                                            onDoubleClick={() => this.setState({hiddenSuggestion: true})}
                                                            onKeyPress={(e) => handleEnterStroke(e, item)}>{item}
                                                    </option>
                                                ))
                                            }

                                        </select>

                                        <br/>
                                        <br/>
                                        <button type='submit' className="btn btn-secondary btn-group-sm" onClick={handleSearchButton}>
                                            Search
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="col-sm-6">
                        <label htmlFor=""><em>Jump over what type of version:</em></label>
                        <div className="btn-toolbar">
                            <div className="btn-group btn-group-vertical">
                                <div className="form-check checkbox">
                                    <input className="form-check-input" type="checkbox" id="major"
                                           onChange={(e)=>{
                                               this.setState({type: 'major', major: true, minor: false, patch: false});
                                               handleSearch();}} value='major' checked={major}/>
                                    <label htmlFor="major" className="form-check-label">Major</label>
                                </div>
                                <div className="form-check checkbox">
                                    <input className="form-check-input" type="checkbox" id="minor"
                                           onChange={(e)=>{
                                               this.setState({type: 'minor', major: false, minor: true, patch: false});
                                               handleSearch();}} name={type} value='minor' checked={minor}/>
                                    <label htmlFor="minor" className="form-check-label">Minor</label>
                                </div>
                                <div className="form-check checkbox">
                                    <input className="form-check-input" type="checkbox" id="patch"
                                           onChange={(e)=>{
                                               this.setState({type: 'patch', major: false, minor: false, patch: true});
                                               handleSearch();}} name={type} value='patch' checked={patch}/>
                                    <label htmlFor="patch" className="form-check-label">Patch</label>
                                </div>
                            </div>
                        </div>

                        <hr/>

                        {/*<div className="card bg-dark text-white">*/}
                        {/*    /!*<img className="card-img" src="..." alt="Card image">*!/*/}
                        {/*        <div className="card-img-overlay">*/}
                        {/*            <h5 className="card-title">Result:</h5>*/}
                        {/*            <p className="card-text">{title}</p>*/}
                        {/*            <p className="card-text">Last updated 3 Mins ago</p>*/}
                        {/*            <NuGet pkg={pkg} versionType={type} version={version}/>*/}
                        {/*        </div>*/}
                        {/*</div>*/}

                        <div className="card bg-dark text-white justify-content-sm-center" >
                            <div className="card-header">
                                {title}
                            </div>
                            <div className="card-body">
                                <NuGet pkg={pkg} versionType={type} version={version}/>
                            </div>
                        </div>
                    </div>
                </div>
                </div>);
    }
}

export default DisplayPanel;