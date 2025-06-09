import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fornecedorService } from '../services/entityServices';
import { useTheme } from '../themeContext';
import LoadingSpinner from '../components/LoadingSpinner';

function FornecedoresList() {
  const [fornecedores, setFornecedores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [fornecedorToDelete, setFornecedorToDelete] = useState(null);
  const { darkMode } = useTheme();

  useEffect(() => {
    loadFornecedores();
  }, []);

  const loadFornecedores = async () => {
    try {
      setLoading(true);
      const data = await fornecedorService.getAll();
      setFornecedores(data);
    } catch (err) {
      setError('Erro ao carregar fornecedores');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (fornecedor) => {
    setFornecedorToDelete(fornecedor);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await fornecedorService.delete(fornecedorToDelete.id);
      setFornecedores(fornecedores.filter(f => f.id !== fornecedorToDelete.id));
      setShowDeleteModal(false);
      setFornecedorToDelete(null);
    } catch (err) {
      setError('Erro ao excluir fornecedor');
    }
  };

  if (loading) return <LoadingSpinner message="Carregando fornecedores..." />;

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Lista de Fornecedores</h1>
        <Link to="/fornecedores/novo" className="btn btn-primary">
          <i className="fas fa-plus"></i> Adicionar Fornecedor
        </Link>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Table striped bordered hover variant={darkMode ? 'dark' : undefined}>
        <thead>
          <tr>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {fornecedores.map(fornecedor => (
            <tr key={fornecedor.id}>
              <td>{fornecedor.nome}</td>
              <td>
                <div className="d-flex gap-2">
                  <Link 
                    to={`/fornecedores/editar/${fornecedor.id}`} 
                    className="btn btn-sm btn-secondary"
                  >
                    <i className="fas fa-edit"></i> Editar
                  </Link>
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={() => handleDeleteClick(fornecedor)}
                  >
                    <i className="fas fa-trash"></i> Apagar
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal de confirmação de exclusão */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir o fornecedor "{fornecedorToDelete?.nome}"?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Excluir
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default FornecedoresList;