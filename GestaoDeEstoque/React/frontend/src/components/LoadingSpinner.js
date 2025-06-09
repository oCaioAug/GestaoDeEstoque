import React from 'react';
import { Spinner, Container } from 'react-bootstrap';

function LoadingSpinner({ message = "Carregando..." }) {
  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: '200px' }}>
      <div className="text-center">
        <Spinner animation="border" variant="primary" className="mb-3" />
        <p className="text-muted">{message}</p>
      </div>
    </Container>
  );
}

export default LoadingSpinner;