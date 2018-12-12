import React, { Component } from "react";
import {Container } from "../../components/Grid";
import {PageHeader,Button,Form,FormGroup,ControlLabel,FormControl,Col} from "react-bootstrap";
import axios from 'axios'

export default class Profile extends Component {

  state = {
    editProfile: false,
    addProfile: false,
    profileToAdd: {}
  }

  handleChange = event => {
    const profileToAdd = this.state.profileToAdd
    profileToAdd[event.target.name] = event.target.value
    this.setState({profileToAdd})
    console.log(this.state)
  }

  addProfile = event => {
    event.preventDefault()

    const firstName = this.state.profileToAdd.firstName;
    const lastName = this.state.profileToAdd.lastName;
    const email = this.state.profileToAdd.email;
    const password = this.state.profileToAdd.password;
    const password2 = this.state.profileToAdd.password2;
    const skills = this.state.profileToAdd.skills;
    const photo = this.state.profileToAdd.photo;

    axios.put(`http://localhost:90/api/users/`, { firstName, lastName, email, password, skills, photo } )
      .then(res => {
        this.setState({ profileToAdd: {} })
      })
  }

  render(){

    const {profile, editProfile} = this.state

    return(
  <Container fluid>
    <PageHeader>Profile Creation Page</PageHeader>
    <h3></h3>    
    <form>
      <h4>Please enter information below:</h4>
      <Form horizontal>
        <FormGroup controlId="formFirstName">
          <Col componentClass={ControlLabel} sm={2}>
            First Name
          </Col>
          <Col sm={10}>
            <FormControl name="firstname" type="firstname" placeholder="Enter First Name" onChange={this.handleChange}/>
          </Col>
        </FormGroup>
        <FormGroup controlId="formLastName">
          <Col componentClass={ControlLabel} sm={2}>
            Last Name
          </Col>
          <Col sm={10}>
            <FormControl name="lastname" type="lastname" placeholder="Enter Last Name" onChange={this.handleChange}/>
          </Col>
        </FormGroup>
        <FormGroup controlId="formEmail">
          <Col componentClass={ControlLabel} sm={2}>
            Email
          </Col>
          <Col sm={10}>
            <FormControl name="email" type="email" placeholder="Enter Email" onChange={this.handleChange}/>
          </Col>
        </FormGroup>
        <FormGroup controlId="formPassword1">
          <Col componentClass={ControlLabel} sm={2}>
            Password
          </Col>
          <Col sm={10}>
            <FormControl name="password" type="password" placeholder="Enter Password" onChange={this.handleChange}/>
          </Col>
        </FormGroup>
        <FormGroup controlId="formPassword2">
          <Col componentClass={ControlLabel} sm={2}>
            Re-Enter Password
          </Col>
          <Col sm={10}>
            <FormControl type="password" placeholder="Re-Enter Password" onChange={this.handleChange}/>
          </Col>
        </FormGroup>
        <FormGroup controlId="formSkills">
          <Col componentClass={ControlLabel} sm={2}>
            Skills
          </Col>
          <Col sm={10}>
            <FormControl name="skills" type="enterSkills" placeholder="Enter Skills" onChange={this.handleChange}/>
          </Col>
        </FormGroup>
        <FormGroup controlId="formPhoto">
          <Col componentClass={ControlLabel} sm={2}>
            Profile Picture
          </Col>
          <Col sm={10}>
            <FormControl name="photo" type="file" placeholder="Enter Profile Picture" onChange={this.handleChange}/>
          </Col>
        </FormGroup>
        <FormGroup controlId="formSubmit">
          <Button bsStyle="primary" onClick={this.addProfile}>Submit Profile</Button>
        </FormGroup>
      </Form>
    </form>
  </Container>
    )
  }
}
