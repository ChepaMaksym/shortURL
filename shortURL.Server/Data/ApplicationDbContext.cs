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

        public DbSet<UserRole> UserRoles { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


            modelBuilder.Entity<UserRole>()
                .HasKey(ur => new { ur.UserId, ur.RoleId });

            modelBuilder.Entity<UserRole>()
                .HasOne(ur => ur.User)
                .WithMany(u => u.UserRoles)
                .HasForeignKey(ur => ur.UserId);

            modelBuilder.Entity<UserRole>()
                .HasOne(ur => ur.Role)
                .WithMany(r => r.UserRoles)
                .HasForeignKey(ur => ur.RoleId);

            modelBuilder.Entity<Role>().HasData(
                new Role { Id = 1, Name = "User" },
                new Role { Id = 2, Name = "Admin" }
            );

            modelBuilder.Entity<ShortUrl>().HasData(
                new ShortUrl { Id = 1, OriginalUrl = "https://www.youtube.com", ShortenedUrl = "RiNXktx" }
            );

            modelBuilder.Entity<User>().HasData(
                new User { Id = 1, Name = "John Doe", Email = "john@gmail.com", Password = "password1" },
                new User { Id = 2, Name = "Jane Smith", Email = "jane@gmail.com", Password = "password2" },
                new User { Id = 3, Name = "Admin", Email = "admin@gmail.com", Password = "adminpassword" }
            );

            modelBuilder.Entity<UserRole>().HasData(
                new UserRole { UserId = 1, RoleId = 1 },
                new UserRole { UserId = 2, RoleId = 1 },
                new UserRole { UserId = 3, RoleId = 1 },
                new UserRole { UserId = 3, RoleId = 2 }
            );
        }
    }
}
