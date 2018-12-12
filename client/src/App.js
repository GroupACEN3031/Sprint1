import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./pages/Home";
import Email from "./pages/Email";
import Profile from "./pages/Profile";
import ProjectList from "./pages/ProjectList/ProjectList";
import SelectedProject from "./pages/SelectedProject";
import TeamPortal from "./pages/TeamPortal";
import UpdatePage from "./pages/Update";
import NoMatch from "./pages/NoMatch";
import {Grid,Navbar,Nav,NavItem,NavDropdown,MenuItem,FormControl,Button} from "react-bootstrap";

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
            <NavItem eventKey={1} href="/ProjectList">
              Projects
            </NavItem>
            <NavItem eventKey={1} href="/TeamPortal">
              Team Portal
            </NavItem>
            <NavItem eventKey={1} href="/Email">
              Email
            </NavItem>
            <NavItem eventKey={1} href="/SelectedProject">
              Current Project
            </NavItem>
          </Nav>
          <Nav pullRight>
            <NavDropdown eventKey={2} title={"Welcome, " + user.username} id="basic-nav-dropdown">
              <FormControl type="username" placeholder="Username" />
              <FormControl type="password" placeholder="Password" />
              <Button type="submit" href="/TeamPortal">Submit</Button>
              <MenuItem eventKey={2.1} href="/Profile">Create Profile</MenuItem>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Grid>
        <Router>
          <div>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/ProjectList" component={ProjectList} />
              <Route exact path='/Profile' component={Profile} />
              <Route exact path='/Email' component={Email} />
              <Route exact path='/SelectedProject' component={SelectedProject} />
              <Route exact path='/TeamPortal' component={TeamPortal} />
              <Route exact path='/UpdatePage' component={UpdatePage} />
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
