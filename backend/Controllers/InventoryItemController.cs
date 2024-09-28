using backend.Context;
using backend.Dtos;
using backend.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InventoryItemController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public InventoryItemController(ApplicationDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<List<InventoryItemEntity>>> GetAllInventoryItems()
        {
            var inventoryItems = await _context.InventoryItems.ToListAsync();
            return Ok(inventoryItems);
        }

        [HttpGet]
        [Route("id")]
        public async Task<ActionResult<InventoryItemEntity>> GetInventoryItemByID([FromRoute] long id)
        {
            var inventoryItem = await _context.InventoryItems.FirstOrDefaultAsync(q => q.id == id);
            if (inventoryItem is null)
            {
                return NotFound("Product Not Found");
            }
            return Ok(inventoryItem);
        }

        [HttpPost]
        public async Task<IActionResult> CreateInventoryItem([FromBody] CreateInventoryItemDto dto)
        {
            var newInventoryItem = new InventoryItemEntity()
            {
               
                EmployeeName = dto.EmployeeName,
                EquipmentType = dto.EquipmentType,
                Manufactor = dto.Manufactor,
                Model = dto.Model,
                Warranty = dto.Warranty,
                SerialNumber = dto.SerialNumber,
                InventoryNumber = dto.InventoryNumber,
            }; 
            
            await _context.InventoryItems.AddAsync(newInventoryItem);
            
            await _context.SaveChangesAsync();
            return Ok("Inventory item Saved Successfully");
        }

        
    }
}
