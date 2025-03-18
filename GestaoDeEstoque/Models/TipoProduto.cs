using System.ComponentModel.DataAnnotations;

namespace GestaoDeEstoque.Models
{
    public class TipoProduto
    {
        [Key]
        [Required(ErrorMessage = "O campo Id é obrigatório")]
        public int Id { get; set; }

        [Required(ErrorMessage = "O campo Nome é obrigatório")]
        [MaxLength(50, ErrorMessage = "O campo Nome deve ter no máximo 50 caracteres")]
        public string Nome { get; set; }

        public virtual ICollection<Produto> Produtos { get; set; }
    }
}
