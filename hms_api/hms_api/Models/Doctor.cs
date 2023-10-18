using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace hms_api.Models
{
    public class Doctor
    {
        [Key]
        [Required]
        [Column(TypeName = "nvarchar(15)")]
        public string DoctorNumber { get; set; }

        [Column(TypeName = "nvarchar(125)")]
        public string DoctorName { get; set; }

        [Column(TypeName = "nvarchar(125)")]
        public string DoctorSurname { get; set; }

        [Column(TypeName = "nvarchar(125)")]
        public string DoctorContact { get; set; }

        [Column(TypeName = "nvarchar(125)")]
        public string DoctorEmail { get; set; }

        [Column(TypeName = "nvarchar(150)")]
        public string DoctorQualification { get; set; }

        public int DoctorPracticeNumber { get; set; }

        [Display(Name = "Health Council Registration Number")]
        public int DoctorHCRN { get; set; }
    }
}
