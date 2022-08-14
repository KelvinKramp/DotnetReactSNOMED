using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;

namespace REACT.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class ConsultationsDbController : ControllerBase
    {

        private static List<Consult> consults = new List<Consult>
        {
            new Consult {Id=1, Name="Kelvin", BirthDate="11-1-2000", Gender="M", RFE="Nothing specials"},
            new Consult {Id=2, Name="asd", BirthDate="1s-1-2000", Gender="F", RFE="Nothinasd specials"}
        };

        private readonly DataContext _context;

        public ConsultationsDbController(DataContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<List<Consult>>> Get()
        {
            var consultsBack = await _context.Consults.ToArrayAsync();
            return Ok(consultsBack.ToArray());
        }

        [HttpGet("{name}")]
        public async Task<ActionResult<List<Consult>>> Get(string name)
        {
            var consult2 = _context.Consults
                .Where(c => c.Name.StartsWith(name))
                .FirstOrDefault();
            Console.WriteLine(consult2);
            Debug.WriteLine(consult2);
            if (consult2 == null)
                return BadRequest("Consult not found");
            return Ok(consult2);
        }

        [HttpPost]
        public async Task<ActionResult<List<Consult>>> AddConsultation(Consult consult)
        {
            Console.WriteLine(consult);
            Debug.WriteLine(consult);
            _context.Consults.Add(consult);
            await _context.SaveChangesAsync();
            var consultsBack = await _context.Consults.ToArrayAsync();
            return Ok(consultsBack.ToArray());
        }
    }
}