using backend.Entities;
using Microsoft.EntityFrameworkCore;

namespace backend.Context
{
    public class InventoryContext : DbContext
    {
        public InventoryContext(DbContextOptions<InventoryContext> options) : base(options)
        {
        }
        public DbSet<InventoryItemEntity> InventoryItems { get; set; }
    }
}
