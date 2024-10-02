using System.ComponentModel.DataAnnotations;

namespace backend.Entities
{
    public class InventoryItemEntity
    {
        [Key]
        public long id { get; set; }

        public string? EmployeeName { get; set; }
      
        public string EquipmentType { get; set; }
        
        public string Model { get; set; }

        
        public DateTime? Warranty { get; set; }

        
        public string Manufactor  { get; set; }


        
        public string SerialNumber { get; set; }

        public string? InventoryNumber { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;


    }
}
