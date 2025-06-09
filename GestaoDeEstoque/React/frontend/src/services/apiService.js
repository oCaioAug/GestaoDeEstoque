const API_BASE_URL = 'http://localhost:5116'; // Ajuste para sua URL do backend

const apiService = {
  // Métodos genéricos
  get: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`);
    if (!response.ok) throw new Error('Erro na requisição');
    return response.json();
  },

  post: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Erro na requisição');
    return response.json();
  },

  put: async (endpoint, data) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    if (!response.ok) throw new Error('Erro na requisição');
    
    // Para PUT, a API retorna NoContent (204), então não há JSON para fazer parse
    if (response.status === 204) {
      return {}; // Retorna objeto vazio para indicar sucesso
    }
    
    // Se houver conteúdo, faz o parse do JSON
    const text = await response.text();
    return text ? JSON.parse(text) : {};
  },

  delete: async (endpoint) => {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE'
    });
    if (!response.ok) throw new Error('Erro na requisição');
    return response.ok;
  }
};

export default apiService;