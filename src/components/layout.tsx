import React, { ReactNode, FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Ul } from './list';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  > main {
    flex-grow: 1;
  }
`;

const NavList = styled(Ul)`
  display: flex;
  align-items: center;
`;

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = function Layout({ children }) {
  return (
    <PageContainer>
      <Navbar as="header" className="bg-body-tertiary" expand="lg">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">EasyGPT</Navbar.Brand>
          <Navbar.Toggle aria-controls="main-header-nav" />
          <Navbar.Collapse id="main-header-nav">
            <Nav as="nav" className="me-auto">
              <NavList>
                <Nav.Item as="li">
                  <Nav.Link as={Link} to="/login">Login</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Nav.Link as={Link} to="/register">Register</Nav.Link>
                </Nav.Item>
              </NavList>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main>{children}</main>
    </PageContainer>
  );
};

export default Layout;
