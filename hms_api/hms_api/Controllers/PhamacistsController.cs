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
    public class PhamacistsController : ControllerBase
    {
        private readonly hms_apiContext _context;

        public PhamacistsController(hms_apiContext context)
        {
            _context = context;
        }

        // GET: api/Phamacists
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Phamacist>>> GetPhamacist()
        {
            return await _context.Phamacist.ToListAsync();
        }

        // GET: api/Phamacists/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Phamacist>> GetPhamacist(string id)
        {
            var phamacist = await _context.Phamacist.FindAsync(id);

            if (phamacist == null)
            {
                return NotFound();
            }

            return phamacist;
        }

        // PUT: api/Phamacists/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPhamacist(string id, Phamacist phamacist)
        {
            if (id != phamacist.PhamacistNumber)
            {
                return BadRequest();
            }

            _context.Entry(phamacist).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PhamacistExists(id))
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

        // POST: api/Phamacists
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Phamacist>> PostPhamacist(Phamacist phamacist)
        {
            _context.Phamacist.Add(phamacist);
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PhamacistExists(phamacist.PhamacistNumber))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetPhamacist", new { id = phamacist.PhamacistNumber }, phamacist);
        }

        // DELETE: api/Phamacists/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Phamacist>> DeletePhamacist(string id)
        {
            var phamacist = await _context.Phamacist.FindAsync(id);
            if (phamacist == null)
            {
                return NotFound();
            }

            _context.Phamacist.Remove(phamacist);
            await _context.SaveChangesAsync();

            return phamacist;
        }

        private bool PhamacistExists(string id)
        {
            return _context.Phamacist.Any(e => e.PhamacistNumber == id);
        }
    }
}
