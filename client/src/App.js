import React from "react";
import PropTypes from 'prop-types'
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Email from "./pages/Email";
import Profile from "./pages/Profile";
import SelectedProject from "./pages/SelectedProject";
import TeamPortal from "./pages/TeamPortal";
import NoMatch from "./pages/NoMatch";
import DocumentTitle from "react-document-title";
import {Col,Row,Grid,Navbar,Nav,NavItem,NavDropdown,MenuItem} from "react-bootstrap";

class App extends React.PureComponent {
  render() {
    const user = {
      username: 'Test User'
    }

    return (
      <div>
      <Navbar inverse staticTop collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">UF Student Team Portal</a>
          </Navbar.Brand>
        <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="/">
              Projects
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavDropdown eventKey={2} title={"Welcome, " + user.username} id="basic-nav-dropdown">
              <MenuItem eventKey={2.1} href="#">Edit Profile</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Grid>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route component={NoMatch}/>
            </Switch>
          </div>
        </Router>
      </Grid>
      </div>
    )
  }
}

export default App;
