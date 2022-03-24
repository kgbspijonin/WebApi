using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WeatherForecastController : ControllerBase
    {
        private readonly ILogger<WeatherForecastController> _logger;

        public WeatherForecastController(ILogger<WeatherForecastController> logger)
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
                    var toRemove = ctx.Forecasts.Single(x => x.Id == id);
                    ctx.Forecasts.Remove(toRemove);
                    ctx.SaveChanges();
                    return Ok(new { message = "Forecast updated" });
                }
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPut("{id}")]
        public object Update(int id, WeatherForecast model)
        {
            try {
                using (var ctx = new Context())
                {
                    var old = ctx.Forecasts.Single(x => x.Id == id);
                    old.Date = model.Date;
                    old.TemperatureC = model.TemperatureC;
                    old.Summary = model.Summary;
                    old.CityId = model.CityId;
                    ctx.Forecasts.Update(old);
                    ctx.SaveChanges();
                    return Ok(new { message = "Forecast updated" });
                }
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost(Name = "CreateWeatherForecast")]
        public IActionResult Create(WeatherForecast model)
        {
            try
            {
                using (var ctx = new Context())
                {
                    ctx.Forecasts.Add(new WeatherForecast(model.Date, model.TemperatureC, model.Summary, model.CityId.GetValueOrDefault()));
                    ctx.SaveChanges();
                    return Ok(new { message = "Forecast created" });
                }
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<WeatherForecast> Get()
        {
            using (var ctx = new Context())
            {
                return ctx.Forecasts.ToList();
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetById(int id)
        {
            try
            {
                using (var ctx = new Context())
                {
                    var forecast = ctx.Forecasts.Single(x => x.Id == id);
                    return Ok(forecast);
                }
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpGet("/bycity/{id}")]
        public IEnumerable<WeatherForecast> GetByCityId(int id)
        {
            using (var ctx = new Context())
            {
                var forecasts = ctx.Forecasts.Where(x => x.CityId == id).ToList();
                return forecasts;
            }
        }
    }
}
