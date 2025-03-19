using GestaoDeEstoque.Models;

namespace GestaoDeEstoque.Repositories
{
    public class RepositoryTipoProduto : RepositoryBase<TipoProduto>
    {
        public RepositoryTipoProduto(AppDbContext pContext, bool pSaveChanges = true) : base(pContext, pSaveChanges)
        {
        }
    }
}
