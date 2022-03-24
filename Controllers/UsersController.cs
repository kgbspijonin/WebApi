using Microsoft.AspNetCore.Mvc;

namespace WebApi.Controllers
{

    [ApiController]
    [Route("[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly ILogger<UsersController> _logger;

        public UsersController(ILogger<UsersController> logger)
        {
            _logger = logger;
        }

        [HttpGet("Login")]
        public IActionResult Get(string username, string password)
        {
            using (var ctx = new Context())
            {
                if(ctx.Users.Where(x => x.Username == username && x.Password == password).Count() != 0)
                {
                    return Ok(new { message = "User correct!" });
                }
                else
                {
                    return BadRequest();
                }
            }
        }

        [HttpPost("Register")]
        public IActionResult Create(User model)
        {
            try
            {
                using (var ctx = new Context())
                {
                    ctx.Users.Add(new User(model.Username, model.Password));
                    ctx.SaveChanges();
                    return Ok(new { message = "User created" });
                }
            }
            catch
            {
                return BadRequest();
            }
        }
    }
}
