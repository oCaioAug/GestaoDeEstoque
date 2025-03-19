using GestaoDeEstoque.Models;

namespace GestaoDeEstoque.Repositories
{
    public class RepositoryProduto : RepositoryBase<Produto>
    {
        public RepositoryProduto(AppDbContext pContext, bool pSaveChanges = true) : base(pContext, pSaveChanges)
        {
        }
    }
}
