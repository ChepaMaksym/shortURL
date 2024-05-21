using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using shortURL.Server.Model;
using shortURL.Server.DTO;
using System.Text.Json;
using shortURL.Server.Data;
using Microsoft.EntityFrameworkCore;

namespace shortURL.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UserController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterUserDTO request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request.");
            }

            if (await _context.Users.AnyAsync(u => u.Email == request.Email))
            {
                return Conflict("Username already exists.");
            }


            var newUser = new User
            {
                Name = request.Name,
                Email = request.Email,
                Password = request.Password,// TODO: hash need
                Roles = new List<Role>
                {
                    new Role { Id = 1, Name = "User" }
                }
            };

            _context.Users.Add(newUser);
            await _context.SaveChangesAsync();
            var roles = newUser.Roles.Select(r => r.Name).ToList();

            return Ok(new { roles });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginUserDTO request)
        {
            if (request == null)
            {
                return BadRequest("Invalid request.");
            }

            var user = await _context.Users
                            .Include(u => u.Roles)
                            .FirstOrDefaultAsync(u => u.Email == request.Email && u.Password == request.Password);
            if (user == null)
            {
                return Unauthorized("Invalid email or password.");
            }

            var roles = user.Roles.Select(r => r.Name).ToList();


            return Ok(new { roles });
        }
    }
}
