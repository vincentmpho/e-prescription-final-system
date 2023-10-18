using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace hms_api.Models
{
    public class FirstVisit
    {
        [Key]
        public int VisitId { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string ChronicHistory { get; set; }

        public string DoctorNumber { get; set; }
        public Doctor Doctor { get; set; }

        [Column(TypeName ="nvarchar(255)")]
        public string CurrentChronicMedication { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string KnownAllegies { get; set; }
    }
}
