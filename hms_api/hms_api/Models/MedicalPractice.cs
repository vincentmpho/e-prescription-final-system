using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace hms_api.Models
{
    public class MedicalPractice
    {
        [Key]
        [Required]
        [Column(TypeName = "nvarchar(15)")]
        public string PracticeNumber { get; set; }

        [Column(TypeName ="nvarchar(15)")]
        public string Contact { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        [Display(Name ="PracticeName")]
        public string Name { get; set; }

        [Column(TypeName = "nvarchar(150)")]
        public string Address { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string Email { get; set; }


    }
}
