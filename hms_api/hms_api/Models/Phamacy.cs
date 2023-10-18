using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace hms_api.Models
{
    public class Phamacy
    {

        [Key]
        [Required]
        [Column(TypeName = "nvarchar(15)")]
        public string PhamacyNumber { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string PhamacyName { get; set; }

        [Column(TypeName = "nvarchar(20)")]
        public string PhamacyContact { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string PhamacyEmail { get; set; }

        public int PhamacyLicenceNumber { get; set; }
        
    }
}
