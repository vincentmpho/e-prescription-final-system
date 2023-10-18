using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace hms_api.Models
{
    public class Phamacist
    {
        [Key]
        [Required]
        [Column(TypeName = "nvarchar(15)")]
        public string PhamacistNumber { get; set; }

        [Column(TypeName ="nvarchar(100)")]
        public string PhamacistName { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string PhamacistSurname { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string PhamacistContact { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string PhamacistEmail { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string PhamacistRegistrationNumber { get; set; }

        public string PhamacyNumber { get; set; }
        public Phamacy Phamacy { get; set; }
    }
}
