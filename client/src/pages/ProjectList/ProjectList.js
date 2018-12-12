import React, { Component } from "react"
import {
    PageHeader,
    ControlLabel,
    Form,
    FormGroup,
    FormControl,
    ListGroup,
    ListGroupItem,
    Glyphicon,
    Modal,
    Row,
    Col,
    ButtonToolbar,
    Button
} from "react-bootstrap"
import axios from 'axios'

export default class ProjectList extends Component {
  // TODO: Need to hook up project bidding
  state = {
    editBidding: false,
    addModal: false,
    projectToAdd: {},
    projects: []
  }

  componentDidMount() {
    this.getProjects()
  }

  getProjects = () => {
    axios.get(`http://localhost:90/api/projects`)
      .then(res => {
        const projects = res.data
        this.setState({ projects })
      })
  }

  addProject = event => {
    event.preventDefault()

    const name = this.state.projectToAdd.name;
    const description = this.state.projectToAdd.description;
    const size =  this.state.projectToAdd.size;
    const team_expertise = this.state.projectToAdd.team_expertise;

      axios.put(`http://localhost:90/api/projects`, { name, description , size , team_expertise } )
      .then(res => {
        this.setState({ projectToAdd: {} })
        this.getProjects()
        this.hideAddModal()
      })
  }

  handleChange = event => {
    const projectToAdd = this.state.projectToAdd;
    projectToAdd[event.target.name] = event.target.value;
    this.setState({projectToAdd});
    console.log(this.state);
  };

  updateBidding = () => {
    if (this.state.editBidding) {
      this.setState({editBidding: false})
    } else {
      this.setState({editBidding: true})
    }
  }

  showAddModal = () => {
    this.setState({addModal: true})
  }

  hideAddModal = () => {
    this.setState({addModal: false})
  }

  render(){
    const {projects, editBidding} = this.state

    return(
      <div>
        <PageHeader>Projects</PageHeader>
        <ListGroup>
          {projects.map((x, index) =>
          <ListGroupItem key={index} id={"collapsible-panel-" + index}>
            <Row>
              <Col xs={2}>
                <a href={"/SelectedProject/" + x._id}>{x.name}</a>
              </Col>
              <Col xs={8}>
                {x.description}
              </Col>
              <Col xs={2}>
                Bidding Order:&nbsp;
                { editBidding ?
                  <FormControl type="text"/>:
                  index + 1
                }
              </Col>
            </Row>
          </ListGroupItem>
          )}
        </ListGroup>
        <Button bsStyle="primary" bsSize="large" onClick={this.showAddModal}>
            <Glyphicon glyph="plus"/> Add Project
        </Button>
        <Button className="pull-right" bsStyle="primary" bsSize="large" onClick={this.updateBidding}>
            {editBidding ? 'Submit Project Bidding':'Edit Project Buiding'}
        </Button>
        <Modal show={this.state.addModal} onHide={this.hideAddModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Project</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal>
              <FormGroup>
                <Col xs={2} componentClass={ControlLabel}>Name</Col>
                <Col xs={10}>
                <FormControl
                  type="text"
                  name="name"
                  placeholder="Name"
                  onChange={this.handleChange}
                />
                </Col>
              </FormGroup>
              <FormGroup>
                <Col xs={2} componentClass={ControlLabel}>Description</Col>
                <Col xs={10}>
                <FormControl
                  componentClass="textarea"
                  name="description"
                  placeholder="Description"
                  onChange={this.handleChange}
                />
                </Col>
              </FormGroup>

                <FormGroup>
                    <Col xs={2} componentClass={ControlLabel}>Size</Col>
                    <Col xs={10}>
                        <FormControl
                            componentClass="textarea"
                            name="size"
                            placeholder="Size of the project"
                            onChange={this.handleChange}
                        />
                    </Col>
                </FormGroup>

                <FormGroup>
                    <Col xs={2} componentClass={ControlLabel}>Team's Expertise</Col>
                    <Col xs={10}>
                        <FormControl
                            componentClass="textarea"
                            name="team_expertise"
                            placeholder="Team's expertise"
                            onChange={this.handleChange}
                        />
                    </Col>
                </FormGroup>

            </Form>
            <Row>
              <Col xsOffset={8} xs={4}>
                <ButtonToolbar>
                  <Button bsStyle="primary" onClick={this.addProject}>Add Project</Button>
                  <Button bsStyle="primary" onClick={this.hideAddModal}>Close</Button>
                </ButtonToolbar>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}
