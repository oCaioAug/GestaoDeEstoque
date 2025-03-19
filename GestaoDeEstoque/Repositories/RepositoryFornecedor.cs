using GestaoDeEstoque.Models;

namespace GestaoDeEstoque.Repositories
{
    public class RepositoryFornecedor : RepositoryBase<Fornecedor>
    {
        public RepositoryFornecedor(AppDbContext pContext, bool pSaveChanges = true) : base(pContext, pSaveChanges)
        {
        }
    }
}
