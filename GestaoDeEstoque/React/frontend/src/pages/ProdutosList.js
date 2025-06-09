import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert, Modal, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { produtoService } from '../services/entityServices';
import { useTheme } from '../themeContext';

function ProdutosList() {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [produtoToDelete, setProdutoToDelete] = useState(null);
  const { darkMode } = useTheme();

  useEffect(() => {
    loadProdutos();
  }, []);

  const loadProdutos = async () => {
    try {
      setLoading(true);
      const data = await produtoService.getAll();
      setProdutos(data);
    } catch (err) {
      setError('Erro ao carregar produtos');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (produto) => {
    setProdutoToDelete(produto);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    try {
      await produtoService.delete(produtoToDelete.id);
      setProdutos(produtos.filter(p => p.id !== produtoToDelete.id));
      setShowDeleteModal(false);
      setProdutoToDelete(null);
    } catch (err) {
      setError('Erro ao excluir produto');
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const isExpired = (dateString) => {
    if (!dateString) return false;
    return new Date(dateString) < new Date();
  };

  if (loading) return <Container className="mt-4"><div>Carregando...</div></Container>;

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Lista de Produtos</h1>
        <Link to="/produtos/novo" className="btn btn-primary">
          <i className="fas fa-plus"></i> Adicionar Produto
        </Link>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="table-responsive">
        <Table striped bordered hover variant={darkMode ? 'dark' : undefined}>
          <thead>
            <tr>
              <th>Nome</th>
              <th>Tipo</th>
              <th>Fornecedor</th>
              <th>Prazo de Validade</th>
              <th>Preço</th>
              <th>Quantidade</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {produtos.map(produto => (
              <tr key={produto.id}>
                <td>{produto.nome}</td>
                <td>{produto.tipoProduto?.nome || '-'}</td>
                <td>{produto.fornecedor?.nome || '-'}</td>
                <td>
                  {produto.prazoDeValidade ? (
                    <span className={isExpired(produto.prazoDeValidade) ? 'text-danger' : ''}>
                      {formatDate(produto.prazoDeValidade)}
                      {isExpired(produto.prazoDeValidade) && (
                        <Badge bg="danger" className="ms-1">Vencido</Badge>
                      )}
                    </span>
                  ) : '-'}
                </td>
                <td>{formatCurrency(produto.preco)}</td>
                <td>
                  <Badge bg={produto.quantidade > 10 ? 'success' : produto.quantidade > 5 ? 'warning' : 'danger'}>
                    {produto.quantidade}
                  </Badge>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <Link 
                      to={`/produtos/editar/${produto.id}`} 
                      className="btn btn-sm btn-secondary"
                    >
                      <i className="fas fa-edit"></i> Editar
                    </Link>
                    <Button 
                      variant="danger" 
                      size="sm"
                      onClick={() => handleDeleteClick(produto)}
                    >
                      <i className="fas fa-trash"></i> Apagar
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Modal de confirmação de exclusão */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Exclusão</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza que deseja excluir o produto "{produtoToDelete?.nome}"?
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

export default ProdutosList;