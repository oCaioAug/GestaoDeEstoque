using GestaoDeEstoque.Models;
using GestaoDeEstoque.Repositories;

namespace GestaoDeEstoque.Services
{
    public class ServiceProduto
    {
        private AppDbContext _context;
        public RepositoryProduto RptProduto;
        public RepositoryFornecedor RptFornecedor;
        public RepositoryTipoProduto RptTipoProduto;

        public ServiceProduto(AppDbContext context)
        {
            _context = context;
            RptProduto = new RepositoryProduto(_context);
            RptFornecedor = new RepositoryFornecedor(_context);
            RptTipoProduto = new RepositoryTipoProduto(_context);
        }
    }
}
