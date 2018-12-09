import React from "react";
import {Container } from "../../components/Grid";
import {Col,Row} from "react-bootstrap";

const Profile = () =>
  <Container fluid>
    <Row>
      <Col size="md-10">
        <h1>WebApps @ UF Student Team Portal</h1>
        <h3>Profile Page</h3>
        <form>
          <label>
            First Name:
            <input type="text" name="name" />
          </label>
        </form>
        <form>
        <label>
            Last Name:
            <input type="text" last="lastname" />
          </label>
        </form>
        <form>
        <label>
            Email:
            <input type="text" email="email" />
          </label>
        </form>
        <form>
        <label>
            Password:
            <input type="text" password="password" />
          </label>
        </form>
        <form>
        <label>
            Re-enter Password:
            <input type="text" last="password2" />
          </label>
        </form>
        <form>
        <label>
            Upload Photo:
            <input type="text" last="photo" />
          </label>
        </form>
        <form>
        <label>
            Skills:
            <input type="text" last="skills" />
          </label>
        </form>
        <form>
        <input type="submit" value="Submit" />
        </form>
      </Col>
    </Row>
  </Container>;

export default Profile;
