import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import NuGet from '../NuGet/NuGet'

class DisplayPanel extends React.Component {
    state = {searchField: '', pkg: '',type: '', major: false, minor: false, patch: false, error: null}
    render() {
        const {searchField, pkg, type, major, minor, patch, error} = this.state;
        return (<div>
                    <form action="">
                        <div className="form-row">
                            <div className="form-group col-md-6">
                                <label htmlFor=""><h3>Search for packages on Nuget.org</h3></label>
                                <hr/>
                                <input type="text" className="form-control" placeholder="package" onChange={(e)=>
                                {this.setState({searchField: e.target.value.toLowerCase()})}}/>
                                <br/>
                                <button type='submit' className="btn btn-secondary btn-group-sm" onClick={(e) => {
                                    e.preventDefault();
                                    this.setState({pkg: searchField, type: 'major', major: true});
                                }}>
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
                                           onChange={(e)=>{this.setState({type: 'major', major: true, minor: false, patch: false})}} value='major' checked={major}/>
                                    <label htmlFor="major" className="form-check-label">Major</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" id="minor"
                                           onChange={(e)=>{this.setState({type: 'minor', major: false, minor: true, patch: false})}} name={type} value='minor' checked={minor}/>
                                    <label htmlFor="minor" className="form-check-label">Minor</label>
                                </div>
                                <div className="form-check">
                                    <input className="form-check-input" type="radio" id="patch"
                                           onChange={(e)=>{this.setState({type: 'patch', major: false, minor: false, patch: true})}} name={type} value='patch' checked={patch}/>
                                    <label htmlFor="patch" className="form-check-label">Patch</label>
                                </div>
                            </div>
                        </div>
                    </form>
                    <hr/>
                    <div className="card" style={{width: "35rem"}}>
                        <div className="card-header">
                            <h5><strong>{pkg}</strong></h5>
                        </div>
                        <div className="card-body">
                            <NuGet package={pkg} versionType={type}/>
                        </div>
                    </div>
                </div>);
    }
}

export default DisplayPanel;