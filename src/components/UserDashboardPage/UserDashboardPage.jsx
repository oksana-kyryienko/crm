import React, { useState } from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';
import './UserDashboardPage.css';
import {
  // eslint-disable-next-line no-unused-vars
  BrowserRouter as Router,
  Route,
  Routes,
  Link,
} from 'react-router-dom';
import Account from '../Account/Account';
import Trips from '../Trips/Trips';
import History from '../History/History';

const UserDashboardPage = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
    <Navbar.Toggle aria-controls="navbar-nav" onClick={handleToggleMenu} />;
  };


  return (
    <>
      <Navbar bg="light" expand="md">
        <Navbar.Brand>Моя СРМ</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" onClick={handleToggleMenu} />
        {menuOpen && (
          <Navbar.Collapse id="navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/account">
                Аккаунт
              </Nav.Link>
              <Nav.Link as={Link} to="/trips">
                Подорожі
              </Nav.Link>
              <Nav.Link as={Link} to="/history">
                Історія
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        )}
      </Navbar>
      <Container className="mt-5">
        <Row>
          <Col md={12}>
            <Routes>
              <Route
                path="/"
                element={<h1>Ласкаво просимо на екран користувача</h1>}
              />
              <Route path="/account" element={<Account />} />
              <Route path="/trips" element={<Trips />} />
              
              <Route path="/history" element={<History />} />
            </Routes>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserDashboardPage;
