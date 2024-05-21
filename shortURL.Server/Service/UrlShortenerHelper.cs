namespace shortURL.Server.Service
{
    public static class UrlShortenerHelper
    {
        private static readonly Random Random = new Random();
        private const string Characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

        public static string GenerateShortUrl(int length = 7)
        {
            return new string(Enumerable.Repeat(Characters, length)
                .Select(s => s[Random.Next(s.Length)]).ToArray());
        }
    }
}
