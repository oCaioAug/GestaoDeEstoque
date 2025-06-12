import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Card, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { produtoService, fornecedorService, tipoProdutoService } from '../services/entityServices';
import { useTheme } from '../themeContext';

function ProdutoForm() {
  const [produto, setProduto] = useState({
    nome: '',
    tipoProdutoId: '',
    fornecedorId: '',
    prazoDeValidade: '',
    preco: '',
    quantidade: '',
    observacao: ''
  });
  const [fornecedores, setFornecedores] = useState([]);
  const [tiposProduto, setTiposProduto] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  const { darkMode } = useTheme();

  useEffect(() => {
    loadComboData();
    if (isEditing) {
      loadProduto();
    }
  }, [id, isEditing]);

  const loadComboData = async () => {
    try {
      const [fornecedoresData, tiposData] = await Promise.all([
        fornecedorService.getAll(),
        tipoProdutoService.getAll()
      ]);
      setFornecedores(fornecedoresData);
      setTiposProduto(tiposData);
    } catch (err) {
      setError('Erro ao carregar dados');
    }
  };

  const loadProduto = async () => {
    try {
      setLoading(true);
      const data = await produtoService.getById(id);
      setProduto({
        nome: data.nome || '',
        tipoProdutoId: data.tipoProdutoId || '',
        fornecedorId: data.fornecedorId || '',
        prazoDeValidade: data.prazoDeValidade ? data.prazoDeValidade.split('T')[0] : '',
        preco: data.preco || '',
        quantidade: data.quantidade || '',
        observacao: data.observacao || ''
      });
    } catch (err) {
      setError('Erro ao carregar produto');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    // Validações
    if (!produto.nome.trim()) {
      setError('Nome é obrigatório');
      return;
    }
    if (!produto.tipoProdutoId) {
      setError('Tipo de produto é obrigatório');
      return;
    }
    if (!produto.fornecedorId) {
      setError('Fornecedor é obrigatório');
      return;
    }
    if (!produto.preco || produto.preco <= 0) {
      setError('Preço deve ser maior que zero');
      return;
    }
    if (!produto.quantidade || produto.quantidade < 0) {
      setError('Quantidade deve ser maior ou igual a zero');
      return;
    }

    try {
      setLoading(true);
      // Construct the base payload without ID
      const payload = {
        nome: produto.nome,
        tipoProdutoId: parseInt(produto.tipoProdutoId),
        fornecedorId: parseInt(produto.fornecedorId),
        preco: parseFloat(produto.preco),
        quantidade: parseInt(produto.quantidade),
        prazoDeValidade: produto.prazoDeValidade || null,
        observacao: produto.observacao
      };

      if (isEditing) {
        // For updates, add the ID to the payload
        const produtoDataForUpdate = { ...payload, id: parseInt(id) };
        await produtoService.update(id, produtoDataForUpdate);
        setSuccess('Produto atualizado com sucesso!');
      } else {
        // For creates, the payload does not (and should not) contain an ID
        await produtoService.create(payload);
        setSuccess('Produto criado com sucesso!');
        setProduto({ // Reset form
          nome: '',
          tipoProdutoId: '',
          fornecedorId: '',
          prazoDeValidade: '',
          preco: '',
          quantidade: '',
          observacao: ''
        });
      }
    } catch (err) {
      setError(err.message || 'Erro ao salvar produto'); // Use err.message which will be more detailed
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProduto({
      ...produto,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>{isEditing ? 'Editar Produto' : 'Adicionar Produto'}</h1>
        <Button variant="secondary" onClick={() => navigate('/produtos')}>
          Voltar à Lista
        </Button>
      </div>

      <Card bg={darkMode ? 'dark' : undefined} text={darkMode ? 'white' : undefined}>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nome *</Form.Label>
                  <Form.Control
                    type="text"
                    name="nome"
                    value={produto.nome}
                    onChange={handleChange}
                    placeholder="Digite o nome do produto"
                    maxLength={50}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Tipo de Produto *</Form.Label>
                  <Form.Select
                    name="tipoProdutoId"
                    value={produto.tipoProdutoId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione um tipo</option>
                    {tiposProduto.map(tipo => (
                      <option key={tipo.id} value={tipo.id}>
                        {tipo.nome}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Fornecedor *</Form.Label>
                  <Form.Select
                    name="fornecedorId"
                    value={produto.fornecedorId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Selecione um fornecedor</option>
                    {fornecedores.map(fornecedor => (
                      <option key={fornecedor.id} value={fornecedor.id}>
                        {fornecedor.nome}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Prazo de Validade</Form.Label>
                  <Form.Control
                    type="date"
                    name="prazoDeValidade"
                    value={produto.prazoDeValidade}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Preço *</Form.Label>
                  <Form.Control
                    type="number"
                    name="preco"
                    value={produto.preco}
                    onChange={handleChange}
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Quantidade *</Form.Label>
                  <Form.Control
                    type="number"
                    name="quantidade"
                    value={produto.quantidade}
                    onChange={handleChange}
                    placeholder="0"
                    min="0"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Observação</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="observacao"
                value={produto.observacao}
                onChange={handleChange}
                placeholder="Digite observações sobre o produto"
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button 
                type="submit" 
                variant="primary" 
                disabled={loading}
              >
                {loading ? 'Salvando...' : (
                  <>
                    <i className="fas fa-save"></i> {isEditing ? 'Atualizar' : 'Salvar'}
                  </>
                )}
              </Button>
              <Button 
                type="button" 
                variant="secondary" 
                onClick={() => navigate('/produtos')}
              >
                Cancelar
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default ProdutoForm;