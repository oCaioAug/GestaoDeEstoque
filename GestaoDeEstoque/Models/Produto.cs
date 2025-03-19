﻿using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace GestaoDeEstoque.Models
{
    public class Produto
    {
        [Key]
        [Required]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string? Nome { get; set; }

        [ForeignKey("TipoProduto")]
        [Display(Name = "Tipo de Produto")]
        public int TipoProdutoId { get; set; }
        public virtual TipoProduto? TipoProduto { get; set; }

        [ForeignKey("Fornecedor")]
        [Display(Name = "Fornecedor")]
        public int FornecedorId { get; set; }
        public virtual Fornecedor? Fornecedor { get; set; }

        public DateTime? PrazoDeValidade { get; set; }

        [Required]
        public decimal Preco { get; set; }

        [Required]
        public int Quantidade { get; set; }

        public string? Observacao { get; set; }
    }
}
