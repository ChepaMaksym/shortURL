using Microsoft.EntityFrameworkCore;
using shortURL.Server.Model;
using System.Collections.Generic;
using System.Reflection.Emit;

namespace shortURL.Server.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
        {
        }

        public DbSet<Role> Roles { get; set; }
        public DbSet<ShortUrl> ShortUrls { get; set; }
        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Role>().HasKey(r => r.Id);
            modelBuilder.Entity<Role>().Property(r => r.Name).IsRequired().HasMaxLength(100);

            modelBuilder.Entity<ShortUrl>().HasKey(s => s.Id);
            modelBuilder.Entity<ShortUrl>().Property(s => s.OriginalUrl).IsRequired();
            modelBuilder.Entity<ShortUrl>().Property(s => s.ShortenedUrl).IsRequired();
            modelBuilder.Entity<ShortUrl>().Property(s => s.CreatedAt).IsRequired();

            modelBuilder.Entity<User>().HasKey(u => u.Id);
            modelBuilder.Entity<User>().Property(u => u.Name).IsRequired().HasMaxLength(100);
            modelBuilder.Entity<User>().Property(u => u.Email).IsRequired().HasMaxLength(100);
            modelBuilder.Entity<User>().Property(u => u.Password).IsRequired();

            modelBuilder.Entity<User>()
                .HasMany(u => u.Roles)
                .WithMany()
                .UsingEntity<Dictionary<string, object>>(
                    "UserRole",
                    j => j.HasOne<Role>().WithMany().HasForeignKey("RoleId"),
                    j => j.HasOne<User>().WithMany().HasForeignKey("UserId"));
        }
    }
}
