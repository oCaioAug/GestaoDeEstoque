import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Alert, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { produtoService, fornecedorService, tipoProdutoService } from '../services/entityServices';
import { useTheme } from '../themeContext';

function Home() {
  const [stats, setStats] = useState({
    totalProdutos: 0,
    totalFornecedores: 0,
    totalTiposProduto: 0,
    produtosVencidos: 0,
    produtosBaixoEstoque: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { darkMode } = useTheme();

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      console.log('Iniciando carregamento dos dados do dashboard...');
      
      const [produtos, fornecedores, tiposProduto] = await Promise.all([
        produtoService.getAll(),
        fornecedorService.getAll(),
        tipoProdutoService.getAll()
      ]);

      console.log('Dados carregados:', { produtos, fornecedores, tiposProduto });

      // Verificar se os dados são arrays válidos
      const produtosArray = Array.isArray(produtos) ? produtos : [];
      const fornecedoresArray = Array.isArray(fornecedores) ? fornecedores : [];
      const tiposProdutoArray = Array.isArray(tiposProduto) ? tiposProduto : [];

      const produtosVencidos = produtosArray.filter(p => 
        p.prazoDeValidade && new Date(p.prazoDeValidade) < new Date()
      ).length;

      const produtosBaixoEstoque = produtosArray.filter(p => p.quantidade <= 5).length;

      const newStats = {
        totalProdutos: produtosArray.length,
        totalFornecedores: fornecedoresArray.length,
        totalTiposProduto: tiposProdutoArray.length,
        produtosVencidos,
        produtosBaixoEstoque
      };

      console.log('Stats calculadas:', newStats);
      setStats(newStats);
    } catch (err) {
      console.error('Erro ao carregar dados do dashboard:', err);
      setError(`Erro ao carregar dados do dashboard: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="mt-4">
        <div>Carregando...</div>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Dashboard - Gestão de Estoque</h1>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Row>
        <Col md={3} className="mb-4">
          <Card bg={darkMode ? 'dark' : 'primary'} text="white">
            <Card.Body className="text-center">
              <div className="display-6">
                <i className="fas fa-box"></i>
              </div>
              <h4>{stats.totalProdutos}</h4>
              <p>Total de Produtos</p>
              <Link to="/produtos" className="btn btn-light btn-sm">
                Ver Produtos
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} className="mb-4">
          <Card bg={darkMode ? 'dark' : 'success'} text="white">
            <Card.Body className="text-center">
              <div className="display-6">
                <i className="fas fa-truck"></i>
              </div>
              <h4>{stats.totalFornecedores}</h4>
              <p>Fornecedores</p>
              <Link to="/fornecedores" className="btn btn-light btn-sm">
                Ver Fornecedores
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} className="mb-4">
          <Card bg={darkMode ? 'dark' : 'info'} text="white">
            <Card.Body className="text-center">
              <div className="display-6">
                <i className="fas fa-tags"></i>
              </div>
              <h4>{stats.totalTiposProduto}</h4>
              <p>Tipos de Produto</p>
              <Link to="/tipos-produto" className="btn btn-light btn-sm">
                Ver Tipos
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3} className="mb-4">
          <Card bg={darkMode ? 'dark' : 'warning'} text={darkMode ? 'white' : 'dark'}>
            <Card.Body className="text-center">
              <div className="display-6">
                <i className="fas fa-exclamation-triangle"></i>
              </div>
              <h4>{stats.produtosBaixoEstoque}</h4>
              <p>Baixo Estoque</p>
              {stats.produtosBaixoEstoque > 0 && (
                <Badge bg="danger">Atenção!</Badge>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-4">
          <Card bg={darkMode ? 'dark' : undefined} text={darkMode ? 'white' : undefined}>
            <Card.Header>
              <h5><i className="fas fa-calendar-times"></i> Produtos Vencidos</h5>
            </Card.Header>
            <Card.Body>
              {stats.produtosVencidos > 0 ? (
                <Alert variant="danger">
                  <strong>{stats.produtosVencidos}</strong> produto(s) com prazo de validade vencido!
                  <br />
                  <Link to="/produtos" className="alert-link">
                    Verificar produtos →
                  </Link>
                </Alert>
              ) : (
                <Alert variant="success">
                  <i className="fas fa-check-circle"></i> Nenhum produto vencido!
                </Alert>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={6} className="mb-4">
          <Card bg={darkMode ? 'dark' : undefined} text={darkMode ? 'white' : undefined}>
            <Card.Header>
              <h5><i className="fas fa-chart-line"></i> Ações Rápidas</h5>
            </Card.Header>
            <Card.Body>
              <div className="d-grid gap-2">
                <Link to="/produtos/novo" className="btn btn-primary">
                  <i className="fas fa-plus"></i> Adicionar Produto
                </Link>
                <Link to="/fornecedores/novo" className="btn btn-success">
                  <i className="fas fa-plus"></i> Adicionar Fornecedor
                </Link>
                <Link to="/tipos-produto/novo" className="btn btn-info">
                  <i className="fas fa-plus"></i> Adicionar Tipo de Produto
                </Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Home;