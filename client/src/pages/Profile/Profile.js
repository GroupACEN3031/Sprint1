import React from "react";
import {Container } from "../../components/Grid";
import {Button,ButtonToolbar,Form,FormGroup,ControlLabel,FormControl,Col,Grid,Navbar,Nav,NavItem,NavDropdown,MenuItem} from "react-bootstrap";
import axios from 'axios'

const Profile = () =>

  <Container fluid>
    <h2>Profile Creation Page</h2>
    <h3></h3>    
    <form>
      <h4>Please enter information below:</h4>
      <Form horizontal>
        <FormGroup controlId="formFirstName">
          <Col componentClass={ControlLabel} sm={2}>
            First Name
          </Col>
          <Col sm={10}>
            <FormControl type="enterFirstName" placeholder="Enter First Name" />
          </Col>
        </FormGroup>
        <FormGroup controlId="formLastName">
          <Col componentClass={ControlLabel} sm={2}>
            Last Name
          </Col>
          <Col sm={10}>
            <FormControl type="enterLastName" placeholder="Enter Last Name" />
          </Col>
        </FormGroup>
        <FormGroup controlId="formEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={10}>
            <FormControl type="enterEmail" placeholder="Enter Email" />
          </Col>
        </FormGroup>
        <FormGroup controlId="formPassword1">
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={10}>
            <FormControl type="enterPassword1" placeholder="Enter Password" />
          </Col>
        </FormGroup>
        <FormGroup controlId="formPassword2">
          <Col componentClass={ControlLabel} sm={2}>
            Re-Enter Password
          </Col>
          <Col sm={10}>
            <FormControl type="enterPassword2" placeholder="Re-Enter Password" />
          </Col>
        </FormGroup>
        <FormGroup controlId="formSkills">
          <Col componentClass={ControlLabel} sm={2}>
            Skills
          </Col>
          <Col sm={10}>
            <FormControl type="enterSkills" placeholder="Enter Skills" />
          </Col>
        </FormGroup>
        <FormGroup controlId="formPhoto">
          <Col componentClass={ControlLabel} sm={2}>
            Profile Picture
          </Col>
          <Col sm={10}>
            <FormControl type="file" placeholder="Enter Profile Picture" />
          </Col>
        </FormGroup>
        <FormGroup controlId="formSubmit">
          <ButtonToolbar>
            <Button bsStyle="primary">Submit Profile</Button>
          </ButtonToolbar>
        </FormGroup>
      </Form>
    </form>
  </Container>

  class ProfileCreation {

    state = {
      firstName: false,
      lastName: false,
      email: false,
      password1: false,
      password2: false,
      profilePic: false
    }

    addProject = event => {
      event.preventDefault()

      const firstName = this.state.profileToAdd.firstName;
      const lastName = this.state.profileToAdd.lastName;
      const email = this.state.profileToAdd.email;
      const password1 = this.state.profileToAdd.password1;
      const password2 = this.state.profileToAdd.password2;
      const skills = this.state.profileToAdd.skills;
      const profilePic = this.state.profileToAdd.profilePic;

      axios.put(`http://localhost:90/api/users`, { firstName, lastName, email, password1, password2, profilePic } )
        .then(res => {
          this.setState({ profileToAdd: {} })
        })
    }
  };

export default Profile;
