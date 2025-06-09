import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { fornecedorService } from '../services/entityServices';
import { useTheme } from '../themeContext';

function FornecedorForm() {
  const [fornecedor, setFornecedor] = useState({ nome: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;
  const { darkMode } = useTheme();

  useEffect(() => {
    if (isEditing) {
      loadFornecedor();
    }
  }, [id, isEditing]);

  const loadFornecedor = async () => {
    try {
      setLoading(true);
      const data = await fornecedorService.getById(id);
      setFornecedor(data);
    } catch (err) {
      setError('Erro ao carregar fornecedor');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!fornecedor.nome.trim()) {
      setError('Nome é obrigatório');
      return;
    }

    try {
      setLoading(true);
      if (isEditing) {
        await fornecedorService.update(id, fornecedor);
        setSuccess('Fornecedor atualizado com sucesso!');
      } else {
        await fornecedorService.create(fornecedor);
        setSuccess('Fornecedor criado com sucesso!');
        setFornecedor({ nome: '' });
      }
    } catch (err) {
      setError('Erro ao salvar fornecedor');
      console.log(err);

    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFornecedor({
      ...fornecedor,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>{isEditing ? 'Editar Fornecedor' : 'Adicionar Fornecedor'}</h1>
        <Button variant="secondary" onClick={() => navigate('/fornecedores')}>
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
                value={fornecedor.nome}
                onChange={handleChange}
                placeholder="Digite o nome do fornecedor"
                maxLength={60}
                required
              />
              <Form.Text className="text-muted">
                Máximo 60 caracteres
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
                onClick={() => navigate('/fornecedores')}
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

export default FornecedorForm;