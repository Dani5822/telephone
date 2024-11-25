import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function CustomNavbar(){
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/tabletfelvetel">Telefon Felvétel</Nav.Link>
            <Nav.Link as={Link} to="/tablettorles">Telefon Törlés</Nav.Link>
            <Nav.Link as={Link} to="/tableteklista">Telefon Listája</Nav.Link>
            <Nav.Link as={Link} to="/raktar">Raktár</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

