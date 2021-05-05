import { Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={Link} to="/">
        Football app
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ml-auto">
          <Nav.Link as={Link} to="/">
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/team/1">
            Team Test
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
