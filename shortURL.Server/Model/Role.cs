﻿namespace shortURL.Server.Model
{
    public class Role
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public ICollection<UserRole> UserRoles { get; set; }
    }
}
