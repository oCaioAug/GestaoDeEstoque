import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { tipoProdutoService } from '../services/entityServices';
import { useTheme } from '../themeContext';

function TiposProdutoList() {
  const [tiposProduto, setTiposProduto] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tipoToDelete, setTipoToDelete] = useState(null);
  const { darkMode } = useTheme();

  useEffect(() => {
    loadTiposProduto();
  }, []);

  const loadTiposProduto = async () => {
    try {
      setLoading(true);
      const data = await tipoProdutoService.getAll();
      setTiposProduto(data);
    } catch (err) {
      setError('Erro ao carregar tipos de produto');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (tipo) => {
    setTipoToDelete(tipo);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await tipoProdutoService.delete(tipoToDelete.id);
      setTiposProduto(tiposProduto.filter(t => t.id !== tipoToDelete.id));
      setShowDeleteModal(false);
      setTipoToDelete(null);
    } catch (err) {
      setError('Erro ao excluir tipo de produto');
    }
  };

  if (loading) return <Container className="mt-4"><div>Carregando...</div></Container>;

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Tipos de Produtos</h1>
        <Link to="/tipos-produto/novo" className="btn btn-primary">
          <i className="fas fa-plus"></i> Adicionar Tipo
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
          {tiposProduto.map(tipo => (
            <tr key={tipo.id}>
              <td>{tipo.nome}</td>
              <td>
                <div className="d-flex gap-2">
                  <Link 
                    to={`/tipos-produto/editar/${tipo.id}`} 
                    className="btn btn-sm btn-secondary"
                  >
                    <i className="fas fa-edit"></i> Editar
                  </Link>
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={() => handleDeleteClick(tipo)}
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
          Tem certeza que deseja excluir o tipo "{tipoToDelete?.nome}"?
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

export default TiposProdutoList;