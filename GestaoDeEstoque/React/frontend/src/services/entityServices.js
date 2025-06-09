import apiService from './apiService';

export const fornecedorService = {
  getAll: () => apiService.get('/api/Fornecedor'),
  getById: (id) => apiService.get(`/api/Fornecedor/${id}`),
  create: (fornecedor) => apiService.post('/api/Fornecedor', fornecedor),
  update: (id, fornecedor) => apiService.put(`/api/Fornecedor/${id}`, fornecedor),
  delete: (id) => apiService.delete(`/api/Fornecedor/${id}`)
};

export const tipoProdutoService = {
  getAll: () => apiService.get('/api/TipoProduto'),
  getById: (id) => apiService.get(`/api/TipoProduto/${id}`),
  create: (tipoProduto) => apiService.post('/api/TipoProduto', tipoProduto),
  update: (id, tipoProduto) => apiService.put(`/api/TipoProduto/${id}`, tipoProduto),
  delete: (id) => apiService.delete(`/api/TipoProduto/${id}`)
};

export const produtoService = {
  getAll: () => apiService.get('/api/Produto'),
  getById: (id) => apiService.get(`/api/Produto/${id}`),
  create: (produto) => apiService.post('/api/Produto', produto),
  update: (id, produto) => apiService.put(`/api/Produto/${id}`, produto),
  delete: (id) => apiService.delete(`/api/Produto/${id}`)
};