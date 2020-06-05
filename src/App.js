import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-typeahead/css/Typeahead.css';

import AppHeader from './components/AppHeader';
import AppContainer from './containers/AppContainer';
import './App.css';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <AppContainer />
    </div>
  );
}

export default App;
