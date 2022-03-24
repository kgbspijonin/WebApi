using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CitiesController : ControllerBase
    {
        private readonly ILogger<CitiesController> _logger;

        public CitiesController(ILogger<CitiesController> logger)
        {
            _logger = logger;
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            try
            {
                using (var ctx = new Context())
                {
                    var toRemove = ctx.Cities.Single(x => x.Id == id);
                    ctx.Cities.Remove(toRemove);
                    ctx.SaveChanges();
                    return Ok(new { message = "City updated" });
                }
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPut("{id}")]
        public object Update(int id, City model)
        {
            try
            {
                using (var ctx = new Context())
                {
                    var old = ctx.Cities.Single(x => x.Id == id);
                    old.Name = model.Name;
                    ctx.Cities.Update(old);
                    ctx.SaveChanges();
                    return Ok(new { message = "City updated" });
                }
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost(Name = "CreateCity")]
        public IActionResult Create(City model)
        {
            try
            {
                using (var ctx = new Context())
                {
                    ctx.Cities.Add(new City(model.Name));
                    ctx.SaveChanges();
                    return Ok(new { message = "City created" });
                }
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet(Name = "GetCity")]
        public IEnumerable<City> Get()
        {
            using (var ctx = new Context())
            {
                return ctx.Cities.ToList();
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                using (var ctx = new Context())
                {
                    var city = ctx.Cities.Single(x => x.Id == id);
                    return Ok(city);
                }
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}