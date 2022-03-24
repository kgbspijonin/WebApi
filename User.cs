namespace WebApi
{
    public class User
    {
        public int? Id { get; set; }

        public string Username { get; set; }
        public string Password { get; set; }

        public User()
        {
            this.Id = null;
            this.Username = new String(Enumerable.Range(0, 10).Select(n => (Char)(Random.Shared.Next(32, 127))).ToArray());
            this.Password = "a";
        }

        public User(string username)
        {
            this.Id = null;
            this.Username = username;
            this.Password = "a";
        }
        public User(string username, string password)
        {
            this.Id = null;
            this.Username = username;
            this.Password = password;
        }
    }
}
