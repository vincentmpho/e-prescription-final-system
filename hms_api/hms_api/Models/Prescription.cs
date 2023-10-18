using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace hms_api.Models
{
    public class Prescription
    {
        [Key]
        public int PrescriptionId { get; set; }

        [Display(Name = "Prescription Date")]
        public DateTime PrescriptionDate { get; set; }

        public string MedicationNumber { get; set; }
        public Medication Medication { get; set; }

        [Display(Name = "Quantity")]
        public double Quantity { get; set; }

        [Column(TypeName ="nvarchar(255)")]
        public string Instructions { get; set; }

        [Column(TypeName = "nvarchar(255)")]
        public string Repetition { get; set; }

        public bool Filled { get; set; }

        public string PatientNumber { get; set; }
        public Patient Patient { get; set; }

        public string DoctorName { get; set; }
        public Doctor Doctor { get; set; }
    }
}
