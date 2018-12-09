import React from "react"
import {
    Col,
    Row,
    PageHeader,
    Grid
} from "react-bootstrap"
import "../../style.css"

const Home = () =>
  <div>
    <PageHeader>Welcome to the UF Student Team Portal</PageHeader>
    <h3 className="text-muted">What would you like to do?</h3>
    <Grid>
      <Row>
        <Col xs={6} md={4}>
          <a href="/ProjectList">
            <div className="projects-nav">See available projects</div>
          </a>
        </Col>
        <Col xs={6} md={4}>
          <a href="TeamPortal">
            <div className="teamprofile-nav">Edit my teams profile</div>
          </a>
        </Col>
        <Col xs={6} md={4}>
          <a href="Profile">
            <div className="selfprofile-nav">Edit my profile</div>
          </a>
        </Col>
      </Row>
    </Grid>
  </div>

export default Home
