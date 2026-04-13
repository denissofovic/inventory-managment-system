using System.ComponentModel.DataAnnotations;

namespace backend.Dtos
{
    public class CreateInventoryItemDto
    {
        public long? Id { get; set; }
        public string? EmployeeName { get; set; } = "";
        
        public string EquipmentType { get; set; }

        public string Model { get; set; }

        
        public DateTime Warranty { get; set; }

        
        public string Manufactor { get; set; }


        public string SerialNumber { get; set; }

        public string? InventoryNumber { get; set; } = "";
    }
}

