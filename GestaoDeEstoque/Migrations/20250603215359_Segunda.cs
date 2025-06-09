using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace GestaoDeEstoque.Migrations
{
    /// <inheritdoc />
    public partial class Segunda : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PrazoDeValiade",
                table: "Produtos",
                newName: "PrazoDeValidade");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PrazoDeValidade",
                table: "Produtos",
                newName: "PrazoDeValiade");
        }
    }
}
