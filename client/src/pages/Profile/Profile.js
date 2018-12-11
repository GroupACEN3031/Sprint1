import React from "react";
import {Container } from "../../components/Grid";
import Jumbotron from "../../components/Jumbotron";
import {Col,Row,Grid,Navbar,Nav,NavItem,NavDropdown,MenuItem} from "react-bootstrap";

const Profile = () =>
  <Container fluid>
      <h1>WebApps @ UF Student Team Portal</h1>
      <h3>Profile Page</h3>
      <h3></h3>    
      <Row>
      <Col size="md-10">

        <form>
          <label for="firstName" class="col-sm-3 col-form-label">
            First Name:
          </label>
            <input type="text" name="name" />
        </form>
        <form>
          <label for="lastName" class="col-sm-3 col-form-label">
            Last Name:
          </label>
            <input type="text" last="lastname" />
        </form>
        <form>
          <label for="email" class="col-sm-3 col-form-label">
            Email:
         </label>
            <input type="text" email="email" />
        </form>
        <form>
          <label for="password" class="col-sm-3 col-form-label">
            Password:
          </label>
            <input type="text" password="password" />
        </form>
        <form>
          <label for="password2" class="col-sm-3 col-form-label">
            Re-enter Password:
          </label>
            <input type="text" last="password2" />
        </form>
        <form>
          <label for="photo" class="col-sm-3 col-form-label">
            Upload Photo:
          </label>
            <input type="text" last="photo" />
        </form>
        <form>
          <label for="skills" class="col-sm-3 col-form-label">
            Skills:
          </label>
            <input type="text" last="skills" />
        </form>
        <form>
          <label>
            <input type="submit" value="Submit" />
          </label>
        </form>
      </Col>
    </Row>
  </Container>;

export default Profile;
