using Microsoft.EntityFrameworkCore;

namespace GestaoDeEstoque.Models
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
        public DbSet<Fornecedor> Fornecedores { get; set; }
        public DbSet<TipoProduto> TiposProduto { get; set; }
        public DbSet<Produto> Produtos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configurando a relação entre Produto e Fornecedor
            modelBuilder.Entity<Produto>()
                .HasOne(p => p.Fornecedor) // Um Produto deve ter um Fornecedor
                .WithMany(f => f.Produtos) // Um Fornecedor pode ter muitos Produtos
                .HasForeignKey(p => p.FornecedorId); // Chave estrangeira

            // Configurando a relação entre Produto e Categoria (opcional)
            modelBuilder.Entity<Produto>()
                .HasOne(p => p.TipoProduto) // Um Produto pode ter uma Categoria
                .WithMany(c => c.Produtos) // Uma Categoria pode ter muitos Produtos
                .HasForeignKey(p => p.TipoProdutoId); // Chave estrangeira
        }
    }
}
