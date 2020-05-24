import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  useParams
} from "react-router-dom";
import { Container } from 'react-bootstrap'
import Home from './components/Home'
import Header from './components/Header'
import AccessTokenGenerator from './components/AccessTokenGenerator'

function App() {
  return (
    <div className="App">
        <Router>
          <Header />
          <Container>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/access-generator" component={AccessTokenGenerator} />
            </Switch>
          </Container>
        </Router>
    </div>
  );
}

export default App;
