using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using GestaoDeEstoque.Models;
using GestaoDeEstoque.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;

namespace GestaoDeEstoque.Controllers
{
    public class ProdutoController : Controller
    {
        private readonly AppDbContext _context;
        private readonly ServiceProduto _serviceProduto;

        public ProdutoController(AppDbContext context)
        {
            _context = context;
            _serviceProduto = new ServiceProduto(_context);
        }

        public async Task CarregarCombos()
        {
            ViewData["Fornecedores"] = new SelectList(await _serviceProduto.RptFornecedor.ListarTodosAsync(), "Id", "Nome");
            ViewData["TipoProdutos"] = new SelectList(await _serviceProduto.RptTipoProduto.ListarTodosAsync(), "Id", "Nome");
        }

        // GET: Produto
        public async Task<IActionResult> Index()
        {
            var listaProdutos = await _serviceProduto.RptProduto.ListarTodosAsync();

            return View(listaProdutos);
        }

        // GET: Produto/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var produto = await _context.Produtos
                .Include(p => p.Fornecedor)
                .Include(p => p.TipoProduto)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (produto == null)
            {
                return NotFound();
            }

            return View(produto);
        }

        // GET: Produto/Create
        public async Task<IActionResult> Create()
        {
            await CarregarCombos();

            return View();
        }

        // POST: Produto/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create(Produto produto)
        {
            await CarregarCombos();

            if (ModelState.IsValid)
            {
                _context.Add(produto);
                ViewData["Mensagem"] = "Produto cadastrado com sucesso!";
                await _serviceProduto.RptProduto.IncluirAsync(produto);
                
                return View(produto);
            }

            return View();
        }

        // GET: Produto/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var produto = await _context.Produtos.FindAsync(id);
            if (produto == null)
            {
                return NotFound();
            }

            await CarregarCombos();

            return View(produto);
        }

        // POST: Produto/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, Produto produto)
        {
            if (id != produto.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(produto);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!ProdutoExists(produto.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }

                ViewData["Mensagem"] = "Produto cadastrado com sucesso!";
                
                return View();
            }

            await CarregarCombos();

            return View(produto);
        }

        // GET: Produto/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var produto = await _context.Produtos
                .Include(p => p.Fornecedor)
                .Include(p => p.TipoProduto)
                .FirstOrDefaultAsync(m => m.Id == id);
            if (produto == null)
            {
                return NotFound();
            }

            return View(produto);
        }

        // POST: Produto/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var produto = await _context.Produtos.FindAsync(id);
            if (produto != null)
            {
                _context.Produtos.Remove(produto);
            }

            await _context.SaveChangesAsync();
            ViewData["Mensagem"] = "Produto excluído com sucesso!";

            return View(produto);
        }

        private bool ProdutoExists(int id)
        {
            return _context.Produtos.Any(e => e.Id == id);
        }
    }
}
