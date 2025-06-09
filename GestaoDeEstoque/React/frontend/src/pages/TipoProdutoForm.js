import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { tipoProdutoService } from '../services/entityServices';
import { useTheme } from '../themeContext';

function TipoProdutoForm() {
  const [tipoProduto, setTipoProduto] = useState({ nome: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  const { darkMode } = useTheme();

  useEffect(() => {
    if (isEditing) {
      loadTipoProduto();
    }
  }, [id, isEditing]);

  const loadTipoProduto = async () => {
    try {
      setLoading(true);
      const data = await tipoProdutoService.getById(id);
      setTipoProduto(data);
    } catch (err) {
      setError('Erro ao carregar tipo de produto');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!tipoProduto.nome.trim()) {
      setError('Nome é obrigatório');
      return;
    }

    try {
      setLoading(true);
      if (isEditing) {
        await tipoProdutoService.update(id, tipoProduto);
        setSuccess('Tipo de produto atualizado com sucesso!');
      } else {
        await tipoProdutoService.create(tipoProduto);
        setSuccess('Tipo de produto criado com sucesso!');
        setTipoProduto({ nome: '' });
      }
    } catch (err) {
      setError('Erro ao salvar tipo de produto');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setTipoProduto({
      ...tipoProduto,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>{isEditing ? 'Editar Tipo de Produto' : 'Adicionar Tipo de Produto'}</h1>
        <Button variant="secondary" onClick={() => navigate('/tipos-produto')}>
          Voltar à Lista
        </Button>
      </div>

      <Card bg={darkMode ? 'dark' : undefined} text={darkMode ? 'white' : undefined}>
        <Card.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Nome *</Form.Label>
              <Form.Control
                type="text"
                name="nome"
                value={tipoProduto.nome}
                onChange={handleChange}
                placeholder="Digite o nome do tipo de produto"
                maxLength={50}
                required
              />
              <Form.Text className="text-muted">
                Máximo 50 caracteres
              </Form.Text>
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
                onClick={() => navigate('/tipos-produto')}
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

export default TipoProdutoForm;