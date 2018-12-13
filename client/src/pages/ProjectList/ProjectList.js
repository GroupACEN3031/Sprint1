import React, { Component } from "react"
import {
    PageHeader,
    Panel,
    PanelGroup,
    ControlLabel,
    Form,
    FormGroup,
    FormControl,
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
    features: [],
    bids: [],
    projects: []
  }

  componentDidMount() {
    this.getProjects()
    this.getFeatures()
    this.getBids()
  }

  getProjects = () => {
    axios.get(`http://localhost:90/api/projects`)
      .then(res => {
        const projects = res.data
        this.setState({ projects })
      })
  }

  getFeatures = () => {
    axios.get(`http://localhost:90/api/features`)
      .then(res => {
        const features = res.data
        this.setState({ features })
      })
  }

  getBids = () => {
    axios.get(`http://localhost:90/api/bids`)
      .then(res => {
        const bids = res.data
        this.setState({ bids })
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

  addBid = (project_index, bid) => {
    const teamID = '5c1129354d0c1178fc89e58d'
    const projectID = this.state.projects[project_index]._id
    const order = bid.toString()

    axios.put(`http://localhost:90/api/bids`, { teamID, projectID, order })
      .then(res => {
        this.getBids()
      })
  }

  handleChange = event => {
    const projectToAdd = this.state.projectToAdd;
    projectToAdd[event.target.name] = event.target.value;
    this.setState({projectToAdd});
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

  handleBiddingChange = event => {
    const project_index = parseInt(event.target.id.replace("formControlsSelect", ""), 10)
    const bid = event.target.value
    
    if (bid !== 'selected') {
      this.addBid(project_index, bid)
    }
  }

  handleSelect = activeKey => {
    this.setState({ activeKey })
  }

  render(){
    const {projects, features, editBidding, bids } = this.state

    return(
      <div>
        <PageHeader>Projects</PageHeader>
        <PanelGroup
        accordion
        activeKey={this.state.activeKey}
        onSelect={this.handleSelect}
        id="Project-Panel-Group"
        >
        {projects.map((x, index) =>
          <Panel
          key={index}
          eventKey={index}
          id={"collapsible-panel-" + index}
          extended={(this.state.activeKey === index).toString()}
          >
            <Panel.Heading>
              <Panel.Title className='col-xs-10' toggle>
                {this.state.activeKey === index ?
                    <Glyphicon glyph="chevron-down" />:
                    <Glyphicon glyph="chevron-right" />
                }{x.name}
              </Panel.Title>
              {editBidding ?
              <Form inline>
                <FormGroup controlId={"formControlsSelect" + index}>
                  <ControlLabel>Bidding</ControlLabel>
                  <FormControl
                    componentClass="select"
                    placeholder="select"
                    onChange={this.handleBiddingChange}
                    >
                    <option value="select">select</option>
                    {[...Array(projects.length).keys()].map(y =>
                      <option key={y} value={y+1}>{y+1}</option>
                    )}
                  </FormControl>
                </FormGroup>
              </Form>
              :
              <span className='text-right'>Bid Priority: {bids.filter(
                obj => { return obj.projectID === x._id }).map((z, index_bid) =>
                <span key={index_bid}>{z.order}</span>
                )}
              </span>
              }
            </Panel.Heading>
            <Panel.Collapse
              >
              <Panel.Body>
                <Row>
                  <Col xs={9}>
                    <dl className="row">
                      <dt className="col-xs-3 text-right">Description</dt>
                      <dd className="col-xs-9">{x.description}</dd>
                    </dl>
                    <dl className="row">
                      <dt className="col-xs-3 text-right">Features</dt>
                      <dd className="col-xs-9"><ul>
                      {features.filter(obj => {return obj.projectID === x._id}).map((x, index) =>
                        <li key={index}>{x.title}</li>
                      )}
                      </ul>
                      </dd>
                    </dl>
                    <dl className="row">
                      <dt className="col-xs-3 text-right">Team Size</dt>
                      <dd className="col-xs-9">{x.size}</dd>
                    </dl>
                    <dl className="row">
                      <dt className="col-xs-3 text-right">Expertise Required</dt>
                      <dd className="col-xs-9">{x.team_expertise}</dd>
                    </dl>
                  </Col>
                  <Col xs={3}>
                    <Button
                    bsStyle="primary"
                    className="pull-right"
                    href={"/SelectedProject/" + x._id}
                    >Project Details</Button>
                  </Col>
                </Row>
              </Panel.Body>
            </Panel.Collapse>
          </Panel>
          )}
        </PanelGroup>
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
                  type="text"
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
                  type="text"
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
