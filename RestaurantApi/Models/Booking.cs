namespace RestaurantApi.Models
{
    public class Booking
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Date { get; set; }
        public string? Time { get; set; }
        public int Guests { get; set; }
        public int Duration { get; set; } 
    }
}
