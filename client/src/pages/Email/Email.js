import React, { Component } from "react"
import axios from 'axios'
import {
  Col,
  Form,
  FormGroup,
  PageHeader,
  ControlLabel,
  Button,
  FormControl
} from "react-bootstrap";

export default class Email extends Component {
  state = {
    project_id: this.props.match.params.project_id,
    projects: [],
    emailToSend: {},
    project: {}
  }

  componentDidMount() {
    if (this.state.project_id) {
      this.getProject()
    } else {
      this.getProjects()
    }
  }

  getProject = () => {
    axios.get(`http://localhost:90/api/projects/` + this.state.project_id)
      .then(res => {
        const project = res.data
        this.setState({ project })
      })
  }

  getProjects = () => {
    axios.get(`http://localhost:90/api/projects`)
      .then(res => {
        const projects = res.data
        this.setState({ projects })
      })
  }

  handleChange = event => {
    const emailToSend = this.state.emailToSend
    emailToSend[event.target.name] = event.target.value
    this.setState({emailToSend})
  }

  handleProjectSelect = event => {
    window.location = "/Email/" + event.target.value
  }

  sendEmail = event => {
    event.preventDefault()

    const subject = this.state.project.name
    const to = this.state.emailToSend.email
    const body = "Project Detail:\n\n" + this.state.project.description + "\n\nAdditional Details:\n\n" + this.state.emailToSend.body

      axios.put(`http://localhost:90/api/emails`, { subject, to, body } )
      .then(res => {
        this.setState({ emailToSend: {} })
        alert("Email Sent")
      })
  }

  render(){
    const { project_id, project, projects } = this.state
    let project_details

    if (project_id) {
      project_details =
      <div>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            Project
          </Col>
          <Col sm={10} className="email_form_text">
            {project.name}
          </Col>
        </FormGroup>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            Description
          </Col>
          <Col sm={10} className="email_form_text">
            {project.description}
          </Col>
        </FormGroup>
      </div>
    } else {
      project_details =
      <div>
        <FormGroup>
          <Col componentClass={ControlLabel} sm={2}>
            <ControlLabel>Select a Project</ControlLabel>
          </Col>
          <Col sm={10}>
            <FormControl
            componentClass="select"
            placeholder="select"
            onChange={this.handleProjectSelect}
            >
              <option key={999} value="select">...</option>
              {projects.map((x, index) =>
                <option key={index} value={x._id}>{x.name}</option>
              )}
            </FormControl>
          </Col>
        </FormGroup>
      </div>
    }

    return(
      <div>
        <PageHeader>Email Project Details</PageHeader>
        <Form horizontal>
          {project_details}
          <FormGroup controlId="sendTo">
            <Col componentClass={ControlLabel} sm={2}>
              Send To
            </Col>
            <Col sm={10}>
              <FormControl name="email" onChange={this.handleChange} placeholder="Email addresses" />
            </Col>
          </FormGroup>
          <FormGroup controlId="Body">
            <Col componentClass={ControlLabel} sm={2}>
              Body
            </Col>
            <Col sm={10}>
              <FormControl
              componentClass="textarea"
              rows="10"
              cols="50"
              placeholder = "Type your message here."
              name="body"
              onChange={this.handleChange}
              />
            </Col>
          </FormGroup>
          <FormGroup controlId="submitButton">
            <Col componentClass={ControlLabel} sm={2} smOffset={10}>
              <Button bsStyle="primary" onClick={this.sendEmail}>Send Email</Button>
            </Col>
          </FormGroup>
        </Form>
      </div>
    )
  }
}
