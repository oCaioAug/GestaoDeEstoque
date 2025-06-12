const API_BASE_URL = 'http://localhost:5116'; // Ajuste para sua URL do backend

const apiService = {
  // Métodos genéricos
  get: async (endpoint) => {
    try {
      console.log(`Fazendo requisição GET para: ${API_BASE_URL}${endpoint}`);
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      
      console.log(`Status da resposta: ${response.status} ${response.statusText}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Erro na requisição: ${response.status} - ${errorText}`);
        throw new Error(`Erro ${response.status}: ${response.statusText} - ${errorText}`);
      }
      
      const data = await response.json();
      console.log(`Dados recebidos:`, data);
      return data;
    } catch (error) {
      console.error(`Erro ao fazer requisição para ${endpoint}:`, error);
      throw error;
    }
  },

  post: async (endpoint, data) => {
    try {
      console.log(`Fazendo requisição POST para: ${API_BASE_URL}${endpoint}`);
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      
      console.log(`Status da resposta POST: ${response.status} ${response.statusText}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Erro na requisição POST: ${response.status} - ${errorText}`);
        throw new Error(`Erro ${response.status} (${response.statusText}) ao contatar o servidor: ${errorText}`);
      }
      
      const responseData = await response.json();
      console.log(`Dados recebidos da resposta POST:`, responseData);
      return responseData;
    } catch (error) {
      console.error(`Erro durante requisição POST para ${API_BASE_URL}${endpoint}:`, error);
      throw error;
    }
  },

  put: async (endpoint, data) => {
    try {
      console.log(`Fazendo requisição PUT para: ${API_BASE_URL}${endpoint}`);
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });

      console.log(`Status da resposta PUT: ${response.status} ${response.statusText}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Erro na requisição PUT: ${response.status} - ${errorText}`);
        throw new Error(`Erro ${response.status} (${response.statusText}) ao contatar o servidor: ${errorText}`);
      }
      
      if (response.status === 204) {
        console.log('Resposta PUT 204 NoContent, retornando objeto vazio.');
        return {}; 
      }
      
      const responseData = await response.json(); 
      console.log('Dados recebidos da resposta PUT:', responseData);
      return responseData;
    } catch (error) {
      console.error(`Erro durante requisição PUT para ${API_BASE_URL}${endpoint}:`, error);
      throw error;
    }
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