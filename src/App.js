import React from 'react';

import DisplayPanel from './components/DisplayPanel/DisplayPanel';


class App extends React.Component {
  render() {
    return (
      <div className="ui container" style={{marginTop: '10px'}}>
        <DisplayPanel></DisplayPanel>
      </div>
    );
  } 
}


export default App;