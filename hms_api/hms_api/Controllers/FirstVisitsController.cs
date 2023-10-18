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
    public class FirstVisitsController : ControllerBase
    {
        private readonly hms_apiContext _context;

        public FirstVisitsController(hms_apiContext context)
        {
            _context = context;
        }

        // GET: api/FirstVisits
        [HttpGet]
        public async Task<ActionResult<IEnumerable<FirstVisit>>> GetFirstVisit()
        {
            return await _context.FirstVisit.ToListAsync();
        }

        // GET: api/FirstVisits/5
        [HttpGet("{id}")]
        public async Task<ActionResult<FirstVisit>> GetFirstVisit(int id)
        {
            var firstVisit = await _context.FirstVisit.FindAsync(id);

            if (firstVisit == null)
            {
                return NotFound();
            }

            return firstVisit;
        }

        // PUT: api/FirstVisits/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutFirstVisit(int id, FirstVisit firstVisit)
        {
            if (id != firstVisit.VisitId)
            {
                return BadRequest();
            }

            _context.Entry(firstVisit).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!FirstVisitExists(id))
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

        // POST: api/FirstVisits
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<FirstVisit>> PostFirstVisit(FirstVisit firstVisit)
        {
            _context.FirstVisit.Add(firstVisit);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetFirstVisit", new { id = firstVisit.VisitId }, firstVisit);
        }

        // DELETE: api/FirstVisits/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<FirstVisit>> DeleteFirstVisit(int id)
        {
            var firstVisit = await _context.FirstVisit.FindAsync(id);
            if (firstVisit == null)
            {
                return NotFound();
            }

            _context.FirstVisit.Remove(firstVisit);
            await _context.SaveChangesAsync();

            return firstVisit;
        }

        private bool FirstVisitExists(int id)
        {
            return _context.FirstVisit.Any(e => e.VisitId == id);
        }
    }
}
