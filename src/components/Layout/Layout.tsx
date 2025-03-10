import React, { PropsWithChildren } from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { NavLink, useLocation } from "react-router-dom";

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const path = location.pathname.split("/");
  const pathname = path[1];

  let content: React.ReactNode = null;

  if (pathname === "admin") {
    content = (
      <>
        <NavLink to="/admin" className="navbar-brand">
          Turtle pizza admin
        </NavLink>
        <Nav className="ms-auto">
          <NavLink to="/admin/dishes" className="nav-link">
            Dishes
          </NavLink>
          <NavLink to="/admin/orders" className="nav-link">
            Orders
          </NavLink>
        </Nav>
      </>
    );
  } else
    content = (
      <NavLink to="/" className="navbar-brand">
        Turtle pizza
      </NavLink>
    );

  return (
    <>
      <header className="mb-5">
        <Navbar bg="dark" data-bs-theme="dark">
          <Container>{content}</Container>
        </Navbar>
      </header>

      <Container>{children}</Container>
    </>
  );
};

export default Layout;
