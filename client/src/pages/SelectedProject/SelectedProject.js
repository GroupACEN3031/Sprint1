import React, { Component } from "react";
import axios from 'axios'
import {
  Col,
  Row,
  ButtonToolbar,
  Button,
  Panel,
  Glyphicon,
  ControlLabel,
  Form,
  FormGroup,
  FormControl,
  ListGroup,
  ListGroupItem,
  Modal,
  ProgressBar,
  PageHeader
} from "react-bootstrap";


export default class SelectedProject extends Component {
  state = {
    project_id: this.props.match.params.project_id,
    project: {},
    progress: 0,
    commentModal: false,
    featureModal: false,
    features: [],
    comments: [],
    featureToAdd: {},
    commentToAdd: {}
  }

  componentDidMount() {
    this.getProject()
    this.getFeatures()
    this.getComments()
  }

  getProject = () => {
    axios.get(`http://localhost:90/api/projects/` + this.state.project_id)
      .then(res => {
        const project = res.data
        this.setState({ project })
      })
  }

  getComments = () => {
    axios.get(`http://localhost:90/api/projects/comments/` + this.state.project_id)
      .then(res => {
        const comments = res.data
        this.setState({ comments })
      })
  }
  getFeatures = () => {
    axios.get(`http://localhost:90/api/features/project/` + this.state.project_id)
      .then(res => {
        const features = [res.data]
        const progress = (features.filter(obj => {return obj.status === 'closed'}).length/features.length)*100
        this.setState({ features, progress })
      })
  }

  addFeature = event => {
    event.preventDefault()

    const projectID = this.state.project_id
    const description = this.state.featureToAdd.description
    const title =  this.state.featureToAdd.title
    const status = 'open'

      axios.put(`http://localhost:90/api/features`, { projectID, description, title, status } )
      .then(res => {
        this.setState({ featureToAdd: {} })
        this.getFeatures()
        this.hideFeatureModal()
      })
  }

  addComment = event => {
    event.preventDefault()

    const userID = '5c1175c3941a2884264a6f70'
    const projectID = this.state.project_id
    const body = this.state.commentToAdd.body
    const date = new Date()

      axios.put(`http://localhost:90/api/projects/comments`, { userID, projectID, body, date } )
      .then(res => {
        this.setState({ commentToAdd: {} })
        this.getComments()
        this.hideCommentModal()
      })
  }

  handleFeatureChange = event => {
    const featureToAdd = this.state.featureToAdd;
    featureToAdd[event.target.name] = event.target.value;
    this.setState({featureToAdd});
  };

  handleCommentChange = event => {
    const commentToAdd = this.state.commentToAdd;
    commentToAdd[event.target.name] = event.target.value;
    this.setState({commentToAdd});
  };

  showFeatureModal = () => {
    this.setState({featureModal: true})
  }

  showCommentModal = () => {
    this.setState({commentModal: true})
  }

  hideFeatureModal = () => {
    this.setState({featureModal: false})
  }

  hideCommentModal = () => {
    this.setState({commentModal: false})
  }
  render() {
    const { project_id, project, features, progress, comments } = this.state
    let features_panel
    let comment_panel

    if (features.length !== 0) {
      features_panel = 
        <div>
          <h4>Progress</h4>
          <ProgressBar now={progress} label={`${progress}%`} />
        </div>
    } else {
      features_panel = <p>There are no features for this project yet</p>
    }

    if (comments.length === 0) {
      comment_panel = <Panel.Body><p>There are no comments for this project yet</p></Panel.Body>
    }

    return(
      <div>
        <PageHeader>{project.name}</PageHeader>
        <Row>
          <Col xs={9}>
            <dl className="row">
              <dt className="col-xs-3">Description</dt>
              <dd className="col-xs-9">{project.description}</dd>
            </dl>
            <dl className="row">
              <dt className="col-xs-3">Team Size</dt>
              <dd className="col-xs-9">{project.size}</dd>
            </dl>
            <dl className="row">
              <dt className="col-xs-3">Expertise Required</dt>
              <dd className="col-xs-9">{project.team_expertise}</dd>
            </dl>
          </Col>
          <Col xs={3}>
            <Button className="pull-right" bsStyle="primary" href={"/Email/" + project_id}>
              Email Project <Glyphicon glyph="envelope"/>
            </Button>
          </Col>
        </Row>
        <Panel>
          <Panel.Heading>
            <Panel.Title componentClass="h2">
              <Row>
                <Col xs={11}>
                  Features
                </Col>
                <Col xs={1}>
                  <Button className="pull-right" bsStyle="primary" onClick={this.showFeatureModal}>
                    <Glyphicon glyph="plus"/> Add Feature
                  </Button>
                </Col>
              </Row>
            </Panel.Title>
          </Panel.Heading>
          <Panel.Body>
            {features_panel}
          </Panel.Body>
          <ListGroup>
            {features.map((x, index) =>
              <ListGroupItem key={index}>
                <strong>{x.title}:</strong> {x.description}
                <span className='pull-right'>{x.status}</span>
              </ListGroupItem>
            )}
          </ListGroup>
        </Panel>
        <Panel>
          <Panel.Heading>
            <Panel.Title componentClass="h2">
              <Row>
                <Col xs={11}>
                  Comments
                </Col>
                <Col xs={1}>
                  <Button className="pull-right" bsStyle="primary" onClick={this.showCommentModal}>
                    <Glyphicon glyph="plus"/> Add Comment
                  </Button>
                </Col>
              </Row>
            </Panel.Title>
          </Panel.Heading>
          {comment_panel}
          <ListGroup>
            {comments.map((x, index) =>
              <ListGroupItem key={index}>
                <blockquote className="blockquote">
                  <p className="mb-0">{x.body}</p>
                  <footer className="blockquote-footer">
                    Michael Howerter on <cite title="Source Title">
                    {new Intl.DateTimeFormat('en-US', { 
                      year: 'numeric', 
                      month: 'long', 
                      day: '2-digit',
                      hour: 'numeric',
                      minute: 'numeric',
                      second: 'numeric',
                      timeZone: 'America/New_York',
                      hour12: false
                    }).format(new Date(x.date))}
                    </cite>
                  </footer>
                </blockquote>
              </ListGroupItem>
            )}
          </ListGroup>
        </Panel>
        <Modal show={this.state.featureModal} onHide={this.hideFeatureModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Feature</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal>
              <FormGroup>
                <Col xs={2} componentClass={ControlLabel}>Name</Col>
                <Col xs={10}>
                <FormControl
                  type="text"
                  name="title"
                  placeholder="Title"
                  onChange={this.handleFeatureChange}
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
                  onChange={this.handleFeatureChange}
                />
                </Col>
              </FormGroup>
            </Form>
            <Row>
              <Col xsOffset={6} xs={6}>
                <ButtonToolbar className="pull-right">
                  <Button bsStyle="primary" onClick={this.addFeature}>Add Feature</Button>
                  <Button bsStyle="primary" onClick={this.hideFeatureModal}>Close</Button>
                </ButtonToolbar>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
        <Modal show={this.state.commentModal} onHide={this.hideCommentModal}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Comment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form horizontal>
              <FormGroup>
                <Col xs={2} componentClass={ControlLabel}>Comment</Col>
                <Col xs={10}>
                <FormControl
                  componentClass="textarea"
                  name="body"
                  placeholder="Comment"
                  onChange={this.handleCommentChange}
                />
                </Col>
              </FormGroup>
            </Form>
            <Row>
              <Col xsOffset={6} xs={6}>
                <ButtonToolbar className="pull-right">
                  <Button bsStyle="primary" onClick={this.addComment}>Add Comment</Button>
                  <Button bsStyle="primary" onClick={this.hideCommentModal}>Close</Button>
                </ButtonToolbar>
              </Col>
            </Row>
          </Modal.Body>
        </Modal>
      </div>
    )
  }
}
