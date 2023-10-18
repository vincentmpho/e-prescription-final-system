using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using hms_api.Models;

namespace hms_api.Data
{
    public class hms_apiContext : DbContext
    {
        public hms_apiContext (DbContextOptions<hms_apiContext> options)
            : base(options)
        {
        }

        public DbSet<hms_api.Models.Doctor> Doctor { get; set; }

        public DbSet<hms_api.Models.FirstVisit> FirstVisit { get; set; }

        public DbSet<hms_api.Models.MedicalPractice> MedicalPractice { get; set; }

        public DbSet<hms_api.Models.Medication> Medication { get; set; }

        public DbSet<hms_api.Models.Patient> Patient { get; set; }

        public DbSet<hms_api.Models.Phamacist> Phamacist { get; set; }

        public DbSet<hms_api.Models.Phamacy> Phamacy { get; set; }

        public DbSet<hms_api.Models.Prescription> Prescription { get; set; }

        public DbSet<hms_api.Models.User> User { get; set; }
    }
}
