using System.ComponentModel.DataAnnotations;

namespace GestaoDeEstoque.Models
{
    public class Fornecedor
    {
        [Key]
        [Required(ErrorMessage = "O campo Id é obrigatório")]
        public int Id { get; set; }

        [Required(ErrorMessage = "O campo Nome é obrigatório")]
        [MaxLength(60, ErrorMessage = "O campo Nome deve ter no máximo 60 caracteres")]
        public string Nome { get; set; }

        public virtual ICollection<Produto>? Produtos { get; set; }
    }
}
