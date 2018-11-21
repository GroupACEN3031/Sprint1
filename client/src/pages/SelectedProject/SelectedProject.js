import React from "react";
import {Container } from "../../components/Grid";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {Col,Row,Grid,Navbar,Nav,NavItem,NavDropdown,MenuItem,Button} from "react-bootstrap";


const SelectedProject = () =>
  <Container fluid>
    <Row>
      <Col size="md-12">
        <h1>WebApps @ UF Student Team Portal</h1>
        <h3>Current Projects</h3>
        <form>
        <Button bsStyle="primary" href="/TeamPortal">Current Project</Button>
        </form>
      </Col>
    </Row>
  </Container>;

export default SelectedProject;
