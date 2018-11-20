import React, { Component } from "react"
import {PageHeader,Panel,Glyphicon,Button} from "react-bootstrap"
import axios from 'axios'

export default class Home extends Component {
  state = {
    projects: []
  }

  componentDidMount() {
    axios.get(`http://localhost:90/api/projects`)
      .then(res => {
        const projects = res.data;
        this.setState({ projects });
      })
  }

  render(){
    const {projects} = this.state
    return(
      <div>
        <PageHeader>Projects</PageHeader>
          {projects.map((x, index) =>
            <Panel key={index} id={"collapsible-panel-" + index}>
              <Panel.Heading>
                <Panel.Title toggle>
                  <Glyphicon glyph="chevron-right" />{x.name}
                </Panel.Title>
              </Panel.Heading>
              <Panel.Collapse>
                <Panel.Body>
                  <p><strong>Description:</strong></p>
                  <p>{x.description}</p>
                </Panel.Body>
              </Panel.Collapse>
            </Panel>
          )}
        <Button className="pull-right" bsStyle="primary" bsSize="large">
            Submit Project Bidding
        </Button>
      </div>
    )
  }
}
