using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using hms_api.Data;
using hms_api.Models;

namespace hms_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicalPracticesController : ControllerBase
    {
        private readonly hms_apiContext _context;

        public MedicalPracticesController(hms_apiContext context)
        {
            _context = context;
        }

        // GET: api/MedicalPractices
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MedicalPractice>>> GetMedicalPractice()
        {
            return await _context.MedicalPractice.ToListAsync();
        }

        // GET: api/MedicalPractices/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MedicalPractice>> GetMedicalPractice(string id)
        {
            var medicalPractice = await _context.MedicalPractice.FindAsync(id);

            if (medicalPractice == null)
            {
                return NotFound();
            }

            return medicalPractice;
        }

        // PUT: api/MedicalPractices/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMedicalPractice(string id, MedicalPractice medicalPractice)
        {
            if (id != medicalPractice.PracticeNumber)
            {
                return BadRequest();
            }

            _context.Entry(medicalPractice).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MedicalPracticeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/MedicalPractices
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<MedicalPractice>> PostMedicalPractice(MedicalPractice medicalPractice)
        {
            _context.MedicalPractice.Add(medicalPractice);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (MedicalPracticeExists(medicalPractice.PracticeNumber))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetMedicalPractice", new { id = medicalPractice.PracticeNumber }, medicalPractice);
        }

        // DELETE: api/MedicalPractices/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<MedicalPractice>> DeleteMedicalPractice(string id)
        {
            var medicalPractice = await _context.MedicalPractice.FindAsync(id);
            if (medicalPractice == null)
            {
                return NotFound();
            }

            _context.MedicalPractice.Remove(medicalPractice);
            await _context.SaveChangesAsync();

            return medicalPractice;
        }

        private bool MedicalPracticeExists(string id)
        {
            return _context.MedicalPractice.Any(e => e.PracticeNumber == id);
        }
    }
}
