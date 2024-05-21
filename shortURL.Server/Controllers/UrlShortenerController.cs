using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using shortURL.Server.Data;
using shortURL.Server.DTO;
using shortURL.Server.Model;
using shortURL.Server.Service;

namespace shortURL.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UrlShortenerController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public UrlShortenerController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<ShortUrlDto>> CreateShortUrlAsync(CreateShortUrlDto createShortUrlDto)
        {
            var shortUrl = new ShortUrl
            {
                OriginalUrl = createShortUrlDto.OriginalUrl,
                ShortenedUrl = UrlShortenerHelper.GenerateShortUrl(),
                CreatedAt = DateTime.UtcNow
            };

            _context.ShortUrls.Add(shortUrl);
            await _context.SaveChangesAsync();

            var shortUrlDto = new ShortUrlDto
            {
                OriginalUrl = shortUrl.OriginalUrl,
                ShortenedUrl = shortUrl.ShortenedUrl
            };

            return Ok(shortUrlDto);
        }

        [HttpGet("{shortUrl}")]
        public async Task<IActionResult> GetOriginalUrl(string shortUrl)
        {
            var url = await _context.ShortUrls.FirstOrDefaultAsync(u => u.ShortenedUrl == shortUrl);

            if (url == null)
            {
                return NotFound();
            }
            return Redirect(url.OriginalUrl);
        }
        [HttpGet]
        public async Task<IActionResult> GetAllOriginalUrl()
        {
            var allUrls = await _context.ShortUrls
                .Select(url => new ShortUrlDto
                {
                    OriginalUrl = url.OriginalUrl,
                    ShortenedUrl = url.ShortenedUrl
                })
                .ToListAsync();

            return Ok(allUrls);
        }
    }
}
