using GestaoDeEstoque.Models;
using Microsoft.EntityFrameworkCore;

namespace GestaoDeEstoque.Repositories
{
    public class RepositoryProduto : RepositoryBase<Produto>
    {
        public RepositoryProduto(AppDbContext pContext, bool pSaveChanges = true) : base(pContext, pSaveChanges)
        {
        }

        public async Task<List<Produto>> ListarTodosAsync()
        {
            return await context.Produtos
                .Include(p => p.Fornecedor)
                .Include(p => p.TipoProduto)
                .ToListAsync();
        }
    }
}
