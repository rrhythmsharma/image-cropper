import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './App.css';
import Header from './Components/Header/Header.jsx';
import Upload from './Components/Upload/Upload.jsx';
import Gallery from './Components/Gallery/Gallery.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Header/>
            <div className="route-container">
              <Switch>
                <Route path="/upload">
                  <Upload />
                </Route>
                <Route path="/gallery">
                  <Gallery />
                </Route>
                <Route exact path="" render={() => <Redirect to="/upload" />} />
              </Switch>
            </div>
          </div>
        </Router>
      </div>
    )
  }
}

export default App;
