import React, { ReactNode, FC } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container } from 'react-bootstrap';
import useCurrentUser from '../providers/current-user';
import { Ul } from './list';

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  > main {
    flex-grow: 1;
  }
`;

const NavContainer = styled(Container)`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavList = styled(Ul)`
  display: flex;
  align-items: center;
  justify-content: flex-end;

  > li:not(:last-of-type) {
    margin-right: .8em;
  }
`;

interface Props {
  children: ReactNode;
}

const Layout: FC<Props> = function Layout({ children }) {
  const { user } = useCurrentUser();

  return (
    <PageContainer>
      <Navbar as="header" className="bg-body-tertiary" expand="lg">
        <NavContainer fluid>
          <Navbar.Brand as={Link} to="/">EasyGPT</Navbar.Brand>
          <Nav as="nav" className="me-auto">
            <NavList>
              {user ? (
                <>
                  <Nav.Item as="li">
                    <Nav.Link as={Link} to="/conversations">Conversations</Nav.Link>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <Nav.Link as={Link} to="/logout">Logout</Nav.Link>
                  </Nav.Item>
                </>
              ) : (
                <>
                  <Nav.Item as="li">
                    <Nav.Link as={Link} to="/login">Login</Nav.Link>
                  </Nav.Item>
                  <Nav.Item as="li">
                    <Nav.Link as={Link} to="/register">Register</Nav.Link>
                  </Nav.Item>
                </>
              )}
            </NavList>
          </Nav>
        </NavContainer>
      </Navbar>

      <main>{children}</main>
    </PageContainer>
  );
};

export default Layout;
