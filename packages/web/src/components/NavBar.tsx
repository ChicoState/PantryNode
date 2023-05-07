import React, { useContext, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import UserContext from "../store/context/UserContext";

interface Props {
  isAuthenticated: boolean;
}

const CustomNavbar: React.FC<Props> = ({ isAuthenticated }) => {
  const [expanded, setExpanded] = useState<boolean>(false);
  const userContext = useContext(UserContext);

  return (
    <React.Fragment>
      <Navbar
        // bg="dark"
        variant="dark"
        expand="md"
        expanded={expanded}
        style={{ zIndex: 2, backgroundColor: "#8c2332" }}
      >
        <Container>
          <Navbar.Brand>
            <h1>
              <Nav.Link as={NavLink} to="/home">
                Pantry
              </Nav.Link>
            </h1>
          </Navbar.Brand>
          <Navbar.Toggle
            aria-controls="navbar-nav"
            onClick={() => setExpanded(expanded ? false : true)}
          />
          <Navbar.Collapse id="navbar-nav">
            <Nav className="me-auto">
              {isAuthenticated ? (
                <React.Fragment>
                  <Nav.Link
                    as={NavLink}
                    onClick={() => setExpanded(false)}
                    to="/home/"
                  >
                    Home
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    onClick={() => setExpanded(false)}
                    to="/stock"
                  >
                    stock
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    onClick={() => setExpanded(false)}
                    to="/checkout"
                  >
                    checkout
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    onClick={() => setExpanded(false)}
                    to="/sale"
                  >
                    Sale
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    onClick={() => setExpanded(false)}
                    to="/chart"
                  >
                    Chart
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    onClick={() => {
                      userContext?.logout();
                      setExpanded(false);
                      window.location.reload();
                    }}
                    to="/auth/login"
                  >
                    Logout
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    onClick={() => setExpanded(false)}
                    to="/home/welcome"
                  >
                    Welcome {userContext?.userState.username}
                  </Nav.Link>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Nav.Link
                    as={NavLink}
                    onClick={() => setExpanded(false)}
                    to="/auth/login"
                  >
                    Login
                  </Nav.Link>
                  <Nav.Link
                    as={NavLink}
                    onClick={() => setExpanded(false)}
                    to="/auth/signup"
                  >
                    Register
                  </Nav.Link>
                </React.Fragment>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </React.Fragment>
  );
};

export default CustomNavbar;
