import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useTheme } from '../themeContext';

function AppNavbar() {
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <Navbar bg={darkMode ? 'dark' : 'light'} variant={darkMode ? 'dark' : 'light'} expand="lg" className="mb-0">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <i className="fas fa-warehouse me-2"></i>
          Gestão de Estoque
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              <i className="fas fa-home me-1"></i>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/produtos">
              <i className="fas fa-box me-1"></i>
              Produtos
            </Nav.Link>
            <Nav.Link as={Link} to="/fornecedores">
              <i className="fas fa-truck me-1"></i>
              Fornecedores
            </Nav.Link>
            <Nav.Link as={Link} to="/tipos-produto">
              <i className="fas fa-tags me-1"></i>
              Tipos de Produto
            </Nav.Link>
          </Nav>
          <Button 
            variant={darkMode ? 'outline-light' : 'outline-dark'} 
            size="sm"
            onClick={toggleDarkMode}
            className="d-flex align-items-center"
          >
            <i className={`fas ${darkMode ? 'fa-sun' : 'fa-moon'} me-1`}></i>
            {darkMode ? 'Modo Claro' : 'Modo Escuro'}
          </Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AppNavbar;