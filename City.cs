namespace WebApi
{
    public class City
    {
        public int? Id { get; set; }

        public string Name { get; set; }

        public City()
        {
            this.Id = null;
            this.Name = "";
        }

        public City(string name)
        {
            this.Id = null;
            this.Name = name;
        }
        public City(int id, string name)
        {
            this.Id = id;
            this.Name = name;
        }
    }
}
