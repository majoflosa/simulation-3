import React, { Component } from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import './App.css';

import Nav from './components/Nav/Nav';
// import Auth from './components/Auth/Auth';
// import Dashboard from './components/Dashboard/Dashboard';
// import Form from './components/Form/Form';
// import Post from './components/Post/Post';
import routes from './routes';

import store from './ducks/store';

class App extends Component {
  render() {
    console.log( 'props: ', this.props );
    return (
      <Provider store={store}>
        <HashRouter>
          <div className="App">
            <div className="outer-wrap">
              <Nav />
              {routes}
            </div>
          </div>
        </HashRouter>
      </Provider>
    );
  }
}

export default App;
