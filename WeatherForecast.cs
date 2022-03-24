namespace WebApi
{
    public class WeatherForecast
    {
        public static readonly string[] Summaries = new[]
        {
            "Freezing", "Bracing", "Chilly", "Cool", "Mild", "Warm", "Balmy", "Hot", "Sweltering", "Scorching"
        };

        public int? Id { get; set; }

        public DateTime Date { get; set; }

        public int TemperatureC { get; set; }

        public string? Summary { get; set; }

        public int? CityId { get; set; }

        public WeatherForecast()
        {
            Date = DateTime.Now.AddDays(Random.Shared.Next(31));
            TemperatureC = Random.Shared.Next(-20, 55);
            Summary = Summaries[Random.Shared.Next(Summaries.Length)];
        }

        public WeatherForecast(DateTime date, int temperatureC, string summary = "", int cityId = 0)
        {
            this.Id = null;
            this.Date = date;
            this.TemperatureC = temperatureC;
            this.Summary = summary;
            this.CityId = cityId;
        }

        public WeatherForecast(int id, DateTime date, int temperatureC, string summary = "", int cityId = 0)
        {
            this.Id = id;
            this.Date = date;
            this.TemperatureC = temperatureC;
            this.Summary = summary;
            this.CityId = cityId;
        }
    }
}