namespace GestaoDeEstoque.Interfaces
{
    public interface IRepositoryBase<T> where T : class
    {
        Task<T> SelecionarChavesAsync(params object[] variavel);
        Task<T> IncluirAsync(T entity);
        Task<T> AlterarAsync(T entity);
        Task<List<T>> ListarTodosAsync();
        Task ExcluirAsync(T entity);
        Task ExcluirAsync(int id);
    }
}
