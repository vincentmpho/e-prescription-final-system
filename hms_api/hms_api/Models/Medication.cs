using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace hms_api.Models
{
    public class Medication
    {
        [Key]
        [Required]
        [Column(TypeName = "nvarchar(15)")]
        public string MedicationNumber { get; set; }

        [Column(TypeName = "nvarchar(50)")]
        public string Dosage { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string ActiveEngredients { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string Strengths { get; set; }

        [Column(TypeName = "nvarchar(20)")]
        public string Schedule { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string ContraIndicationR { get; set; }
    }
}
