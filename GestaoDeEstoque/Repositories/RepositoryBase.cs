using GestaoDeEstoque.Interfaces;
using GestaoDeEstoque.Models;
using Microsoft.EntityFrameworkCore;

namespace GestaoDeEstoque.Repositories
{
    public class RepositoryBase<T> : IRepositoryBase<T>, IDisposable where T : class
    {
        public AppDbContext context;
        public bool saveChanges = true;

        public RepositoryBase(AppDbContext pContext, bool pSaveChanges = true)
        {
            context = pContext;
            saveChanges = pSaveChanges;
        }

        public void Dispose()
        {
            throw new NotImplementedException();
        }

        public async Task ExcluirAsync(T entity)
        {
            context.Entry<T>(entity).State = EntityState.Deleted;

            if (saveChanges)
            {
                await context.SaveChangesAsync();
            }
        }

        public async Task ExcluirAsync(int id)
        {
            var obj = await SelecionarChavesAsync(id);

            if (obj != null)
            {
                context.Entry<T>(obj).State = EntityState.Deleted;

                if (saveChanges)
                {
                    await context.SaveChangesAsync();
                }
            }
        }

        public async Task<T> IncluirAsync(T entity)
        {
            await context.Set<T>().AddAsync(entity);

            if (saveChanges)
            {
                await context.SaveChangesAsync();
            }

            return entity;
        }

        public async Task<List<T>> ListarTodosAsync()
        {
            return await context.Set<T>().ToListAsync();
        }

        public async Task<T> SelecionarChavesAsync(params object[] variavel)
        {
            return await context.Set<T>().FindAsync(variavel);
        }

        public async Task<T> AlterarAsync(T entity)
        {
            context.Entry<T>(entity).State = EntityState.Modified;
            if (saveChanges)
            {
                await context.SaveChangesAsync();
            }
            return entity;
        }
    }
}
