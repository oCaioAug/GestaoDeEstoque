import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './themeContext';
import Navbar from './components/Navbar';

// Páginas
import Home from './pages/Home';
import FornecedoresList from './pages/FornecedoresList';
import FornecedorForm from './pages/FornecedorForm';
import TiposProdutoList from './pages/TiposProdutoList';
import TipoProdutoForm from './pages/TipoProdutoForm';
import ProdutosList from './pages/ProdutosList';
import ProdutoForm from './pages/ProdutoForm';

// Estilos
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="App">
          <Navbar />
          <main>
            <Routes>
              {/* Home */}
              <Route path="/" element={<Home />} />
              
              {/* Fornecedores */}
              <Route path="/fornecedores" element={<FornecedoresList />} />
              <Route path="/fornecedores/novo" element={<FornecedorForm />} />
              <Route path="/fornecedores/editar/:id" element={<FornecedorForm />} />
              
              {/* Tipos de Produto */}
              <Route path="/tipos-produto" element={<TiposProdutoList />} />
              <Route path="/tipos-produto/novo" element={<TipoProdutoForm />} />
              <Route path="/tipos-produto/editar/:id" element={<TipoProdutoForm />} />
              
              {/* Produtos */}
              <Route path="/produtos" element={<ProdutosList />} />
              <Route path="/produtos/novo" element={<ProdutoForm />} />
              <Route path="/produtos/editar/:id" element={<ProdutoForm />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
