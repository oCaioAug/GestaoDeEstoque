# 📦 Sistema de Gestão de Estoque

Um sistema completo de gestão de estoque desenvolvido com ASP.NET Core e React, oferecendo controle total sobre produtos, fornecedores e tipos de produtos com interface moderna e responsiva.

## 🚀 Funcionalidades

### 📊 Dashboard
- **Estatísticas em tempo real**: Total de produtos, fornecedores e tipos de produto
- **Alertas inteligentes**: Produtos vencidos e com baixo estoque
- **Indicadores visuais**: Cards coloridos e badges informativos
- **Ações rápidas**: Links diretos para cadastro de novos itens

### 🛍️ Gestão de Produtos
- **CRUD completo**: Criar, listar, editar e excluir produtos
- **Controle de validade**: Monitoramento de prazo de validade com alertas
- **Gestão de estoque**: Controle de quantidade com indicadores visuais
- **Relacionamentos**: Vinculação com fornecedores e tipos de produto
- **Campos suportados**:
  - Nome do produto
  - Tipo de produto
  - Fornecedor
  - Prazo de validade
  - Preço
  - Quantidade em estoque
  - Observações

### 🏢 Gestão de Fornecedores
- **Cadastro completo**: Informações dos fornecedores
- **Relacionamento**: Vinculação com produtos
- **Interface intuitiva**: Listagem e edição simplificada

### 🏷️ Gestão de Tipos de Produto
- **Categorização**: Organização de produtos por tipo
- **Relacionamento**: Vinculação com produtos
- **Flexibilidade**: Fácil criação e edição de categorias

### 🎨 Interface
- **Dual Interface**: Versão web tradicional (Razor) e moderna (React)
- **Tema Dark/Light**: Alternância entre temas
- **Responsiva**: Compatível com dispositivos móveis
- **UX/UI Moderna**: Bootstrap e FontAwesome

## 🛠️ Tecnologias Utilizadas

### Backend
- **ASP.NET Core 9.0**: Framework principal
- **Entity Framework Core**: ORM para acesso a dados
- **SQL Server**: Banco de dados relacional
- **Repository Pattern**: Arquitetura de dados
- **Service Layer**: Camada de serviços

### Frontend
- **React**: Biblioteca JavaScript para UI
- **React Router**: Roteamento SPA
- **React Bootstrap**: Componentes de UI
- **FontAwesome**: Ícones
- **SweetAlert2**: Alertas e modais elegantes
- **DataTables**: Tabelas interativas (versão Razor)

### Ferramentas e Bibliotecas
- **Bootstrap 5**: Framework CSS
- **jQuery**: Manipulação DOM (versão Razor)
- **Fetch API**: Requisições HTTP
- **Entity Framework Migrations**: Versionamento do banco

## 📋 Pré-requisitos

- [.NET 9.0 SDK](https://dotnet.microsoft.com/download)
- [Node.js 18+](https://nodejs.org/) (para o frontend React)
- [SQL Server](https://www.microsoft.com/sql-server) ou [SQL Server Express](https://www.microsoft.com/sql-server/sql-server-downloads)
- [Visual Studio 2022](https://visualstudio.microsoft.com/) ou [VS Code](https://code.visualstudio.com/)

## ⚙️ Configuração e Instalação

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd GestaoDeEstoque
```

### 2. Configure o Banco de Dados
1. Abra o arquivo `appsettings.json`
2. Ajuste a connection string para seu SQL Server:
```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=SEU_SERVIDOR;Database=GestaoEstoque;Trusted_Connection=true;TrustServerCertificate=true;"
  }
}
```

### 3. Execute as Migrations
```bash
dotnet ef database update
```

### 4. Configure o Backend
```bash
# Instalar dependências
dotnet restore

# Executar a aplicação
dotnet run
```

### 5. Configure o Frontend React (Opcional)
```bash
cd React/frontend
npm install
npm start
```

## 🚀 Executando a Aplicação

### Backend (ASP.NET Core)
```bash
dotnet run
```
A aplicação estará disponível em: `https://localhost:5116` ou `http://localhost:5116`

### Frontend React (Opcional)
```bash
cd React/frontend
npm start
```
O frontend React estará disponível em: `http://localhost:3000`

## 📱 Interfaces Disponíveis

### 1. Interface Web Tradicional (Razor)
- Acesse: `https://localhost:5116`
- Interface server-side com Razor Pages
- DataTables para listagens
- SweetAlert para notificações

### 2. Interface Moderna (React)
- Acesse: `http://localhost:3000` (se executando separadamente)
- SPA (Single Page Application)
- Tema dark/light
- Componentes modernos

## 🗄️ Estrutura do Banco de Dados

### Entidades Principais

#### Produtos
- `Id`: Identificador único
- `Nome`: Nome do produto (max 50 caracteres)
- `TipoProdutoId`: Chave estrangeira para TipoProduto
- `FornecedorId`: Chave estrangeira para Fornecedor
- `PrazoDeValidade`: Data de validade (opcional)
- `Preco`: Preço do produto
- `Quantidade`: Quantidade em estoque
- `Observacao`: Observações adicionais

#### Fornecedores
- `Id`: Identificador único
- `Nome`: Nome do fornecedor (max 60 caracteres)

#### TiposProduto
- `Id`: Identificador único
- `Nome`: Nome do tipo (max 50 caracteres)

### Relacionamentos
- **Produto** → **Fornecedor** (N:1)
- **Produto** → **TipoProduto** (N:1)

## 📊 API Endpoints

### Produtos
- `GET /api/Produto` - Listar todos os produtos
- `GET /api/Produto/{id}` - Obter produto por ID
- `POST /api/Produto` - Criar novo produto
- `PUT /api/Produto/{id}` - Atualizar produto
- `DELETE /api/Produto/{id}` - Excluir produto

### Fornecedores
- `GET /api/Fornecedor` - Listar todos os fornecedores
- `GET /api/Fornecedor/{id}` - Obter fornecedor por ID
- `POST /api/Fornecedor` - Criar novo fornecedor
- `PUT /api/Fornecedor/{id}` - Atualizar fornecedor
- `DELETE /api/Fornecedor/{id}` - Excluir fornecedor

### Tipos de Produto
- `GET /api/TipoProduto` - Listar todos os tipos
- `GET /api/TipoProduto/{id}` - Obter tipo por ID
- `POST /api/TipoProduto` - Criar novo tipo
- `PUT /api/TipoProduto/{id}` - Atualizar tipo
- `DELETE /api/TipoProduto/{id}` - Excluir tipo

## 🏗️ Arquitetura do Projeto

```
GestaoDeEstoque/
├── Controllers/           # Controllers MVC e API
│   ├── Api/              # Controllers da API REST
│   ├── FornecedorController.cs
│   ├── ProdutoController.cs
│   └── TipoProdutoController.cs
├── Models/               # Modelos de dados
│   ├── AppDbContext.cs
│   ├── Produto.cs
│   ├── Fornecedor.cs
│   └── TipoProduto.cs
├── Repositories/         # Camada de acesso a dados
│   ├── RepositoryBase.cs
│   ├── RepositoryProduto.cs
│   ├── RepositoryFornecedor.cs
│   └── RepositoryTipoProduto.cs
├── Services/             # Camada de serviços
│   └── ServiceProduto.cs
├── Views/                # Views Razor
│   ├── Produto/
│   ├── Fornecedor/
│   ├── TipoProduto/
│   └── Shared/
├── React/                # Frontend React
│   └── frontend/
│       └── src/
│           ├── components/
│           ├── pages/
│           └── services/
└── wwwroot/             # Arquivos estáticos
```

## 🎯 Funcionalidades Avançadas

### Controle de Estoque
- **Indicadores visuais**: Cores diferentes para níveis de estoque
- **Alertas automáticos**: Notificações para produtos com baixo estoque
- **Limites configuráveis**: Controle flexível de quantidades mínimas

### Controle de Validade
- **Monitoramento automático**: Verificação de produtos vencidos
- **Alertas visuais**: Destaque para produtos próximos ao vencimento
- **Dashboard informativo**: Estatísticas centralizadas

### Interface Responsiva
- **Mobile First**: Design pensado para dispositivos móveis
- **Tema adaptável**: Suporte a modo escuro e claro
- **Acessibilidade**: Componentes acessíveis e semânticos

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👥 Autores

- **Caio Augusto** - *Desenvolvimento inicial* - [oCaioAug](https://github.com/ocaioaug)
- **Lucas Gama** - *Desenvolvimento inicial* - [lononeiro](https://github.com/lononeiro)

## 🔄 Versões

### v1.0.0 (Atual)
- ✅ CRUD completo de Produtos, Fornecedores e Tipos
- ✅ Dashboard com estatísticas
- ✅ Interface web tradicional (Razor)
- ✅ Interface moderna (React)
- ✅ API REST completa
- ✅ Controle de estoque e validade
- ✅ Tema dark/light

### Próximas Versões
- 🔄 Relatórios avançados
- 🔄 Exportação de dados
- 🔄 Notificações por email
- 🔄 Auditoria de operações
- 🔄 Integração com código de barras

---

⭐ **Se este projeto foi útil, considere dar uma estrela!** ⭐