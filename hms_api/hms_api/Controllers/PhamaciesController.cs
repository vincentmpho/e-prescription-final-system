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
    public class PhamaciesController : ControllerBase
    {
        private readonly hms_apiContext _context;

        public PhamaciesController(hms_apiContext context)
        {
            _context = context;
        }

        // GET: api/Phamacies
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Phamacy>>> GetPhamacy()
        {
            return await _context.Phamacy.ToListAsync();
        }

        // GET: api/Phamacies/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Phamacy>> GetPhamacy(string id)
        {
            var phamacy = await _context.Phamacy.FindAsync(id);

            if (phamacy == null)
            {
                return NotFound();
            }

            return phamacy;
        }

        // PUT: api/Phamacies/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPhamacy(string id, Phamacy phamacy)
        {
            if (id != phamacy.PhamacyNumber)
            {
                return BadRequest();
            }

            _context.Entry(phamacy).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PhamacyExists(id))
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

        // POST: api/Phamacies
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Phamacy>> PostPhamacy(Phamacy phamacy)
        {
            _context.Phamacy.Add(phamacy);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PhamacyExists(phamacy.PhamacyNumber))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPhamacy", new { id = phamacy.PhamacyNumber }, phamacy);
        }

        // DELETE: api/Phamacies/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Phamacy>> DeletePhamacy(string id)
        {
            var phamacy = await _context.Phamacy.FindAsync(id);
            if (phamacy == null)
            {
                return NotFound();
            }

            _context.Phamacy.Remove(phamacy);
            await _context.SaveChangesAsync();

            return phamacy;
        }

        private bool PhamacyExists(string id)
        {
            return _context.Phamacy.Any(e => e.PhamacyNumber == id);
        }
    }
}
