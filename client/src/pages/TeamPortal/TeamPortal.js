import React, { Component } from "react";
import {Container } from "../../components/Grid";
import {PageHeader,Button,Form,FormGroup,ControlLabel,FormControl,Col} from "react-bootstrap";
import axios from 'axios'

export default class TeamPortal extends Component {
  
  state = {
    editGroupProfile: false,
    addGroupProfile: false,
    groupProfileToAdd: {}
  }

  handleChange = event => {
    const groupProfileToAdd = this.state.groupProfileToAdd
    groupProfileToAdd[event.target.name] = event.target.value
    this.setState({groupProfileToAdd})
    console.log(this.state)
  }

  addGroupProfile = event => {
    event.preventDefault()

    const name = this.state.groupProfileToAdd.name;
    const members = this.state.groupProfileToAdd.members;
    const skills = this.state.groupProfileToAdd.skills;
    const photo = this.state.groupProfileToAdd.photo;

    axios.put(`http://localhost:90/api/projects/`, { name, members, skills, photo } )
      .then(res => {
        this.setState({ groupProfileToAdd: {} })
      })
  }

  render(){

    const {groupProfile, editGroupProfile} = this.state

    return(
    <Container fluid>
      <PageHeader>Group Profile Page</PageHeader>
      <form>
        <Form horizontal>
          <FormGroup controlId="formGroupName">
            <Col componentClass={ControlLabel} sm={2}>
              Group Name
            </Col>
            <Col sm={10}>
              <FormControl name="name" type="name" placeholder="Enter Name of Group" onChange={this.handleChange} required/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formGroupMembers">
            <Col componentClass={ControlLabel} sm={2}>
              Group Members
            </Col>
            <Col sm={10}>
              <FormControl name="members" type="name" placeholder="Enter Name/s of Group Member/s" onChange={this.handleChange} required/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formSkills">
            <Col componentClass={ControlLabel} sm={2}>
              Skills
            </Col>
            <Col sm={10}>
              <FormControl name="skills" type="enterSkills" placeholder="Enter Skills of Group" onChange={this.handleChange} required/>
            </Col>
          </FormGroup>
          <FormGroup controlId="formPhoto">
              <Col componentClass={ControlLabel} sm={2}>
                Profile Picture
              </Col>
              <Col sm={10}>
                <FormControl name="photo" type="file" placeholder="Enter Group Profile Picture" onChange={this.handleChange}/>
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
