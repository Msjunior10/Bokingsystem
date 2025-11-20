using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using RestaurantApi.Models;

[ApiController]
[Route("[controller]")]
public class BookingController : ControllerBase
{
    private readonly string _connectionString = "Data Source=DB/Resturant.db";

    [HttpGet]
    public IActionResult GetAll()
    {
        var bookings = new List<Booking>();
        using var connection = new SqliteConnection(_connectionString);
        connection.Open();
        var command = connection.CreateCommand();
        command.CommandText = "SELECT id, name, email, date, time, guests, duration FROM bookings";
        using var reader = command.ExecuteReader();
        while (reader.Read())
        {
            bookings.Add(new Booking
            {
                Id = reader.GetInt32(0),
                Name = reader.GetString(1),
                Email = reader.GetString(2),
                Date = reader.GetString(3),
                Time = reader.GetString(4),
                Guests = reader.GetInt32(5),
                Duration = reader.GetInt32(6)
            });
        }
        return Ok(bookings);
    }

//Skapar en ny bokning
    [HttpPost]
    public IActionResult Create([FromBody] Booking booking)
    {
        using var connection = new SqliteConnection(_connectionString);
        connection.Open();
        var command = connection.CreateCommand();
        command.CommandText = @"INSERT INTO bookings (name, email, date, time, guests, duration) VALUES ($name, $email, $date, $time, $guests, $duration);";
        command.Parameters.AddWithValue("$name", booking.Name);
        command.Parameters.AddWithValue("$email", booking.Email);
        command.Parameters.AddWithValue("$date", booking.Date);
        command.Parameters.AddWithValue("$time", booking.Time);
        command.Parameters.AddWithValue("$guests", booking.Guests);
        command.Parameters.AddWithValue("$duration", booking.Duration);
        command.ExecuteNonQuery();
        return Ok();
    }

//Tar bort en bokning baserat på ID
    [HttpDelete("{id}")]
    public IActionResult Delete(int id)
    {
        using var connection = new SqliteConnection(_connectionString);
        connection.Open();
        var command = connection.CreateCommand();
        command.CommandText = "DELETE FROM bookings WHERE id = $id";
        command.Parameters.AddWithValue("$id", id);
        int rowsAffected = command.ExecuteNonQuery();
        if (rowsAffected == 0)
            return NotFound();
        return NoContent();
    }

//Uppdaterar en befintlig bokning
    [HttpPut("{id}")]
    public IActionResult Update(int id, [FromBody] Booking booking)
    {
        Console.WriteLine($"PUT /booking/{{id}}: id={{id}}, date={{booking.Date}}, time={{booking.Time}}, guests={{booking.Guests}}, duration={{booking.Duration}} ");
        using var connection = new SqliteConnection(_connectionString);
        connection.Open();
        var command = connection.CreateCommand();
        command.CommandText = @"UPDATE bookings SET date = $date, time = $time, guests = $guests, duration = $duration WHERE id = $id";
        command.Parameters.AddWithValue("$date", booking.Date);
        command.Parameters.AddWithValue("$time", booking.Time);
        command.Parameters.AddWithValue("$guests", booking.Guests);
        command.Parameters.AddWithValue("$duration", booking.Duration);
        command.Parameters.AddWithValue("$id", id);
        int rowsAffected = command.ExecuteNonQuery();
        Console.WriteLine($"Rows affected: {rowsAffected}");
        if (rowsAffected == 0)
            return NotFound();
        return NoContent();
    }


//Visar tillgängliga tider för ett givet datum
    [HttpGet("/available-times")]
    public IActionResult GetAvailableTimes([FromQuery] string date)
    {
        Console.WriteLine($"[AvailableTimes] date-param: {date}");
        var allTimes = new List<string> { "01:00" ,"02:00" ,"03:00" ,"04:00" ,"05:00" ,"06:00" ,"07:00" ,"08:00", "09:00" ,"10:00" ,"11:00" ,"12:00" ,"13:00" ,"14:00" ,"15:00" ,"16:00" ,"17:00", "18:00", "19:00", "20:00", "21:00", "22:00", "23:00", "00:00",};
        // Get all bookings for the date, including time and duration
        var bookings = new List<(TimeSpan time, int duration)>();
        using var connection = new SqliteConnection(_connectionString);
        connection.Open();
        var command = connection.CreateCommand();
        command.CommandText = "SELECT time, duration FROM bookings WHERE date = $date";
        command.Parameters.AddWithValue("$date", date);
        using var reader = command.ExecuteReader();
        while (reader.Read())
        {
            var time = TimeSpan.Parse(reader.GetString(0));
            var duration = reader.GetInt32(1);
            bookings.Add((time, duration));
        }
        // For each possible start time, check if it overlaps with any booking
        var availableTimes = new List<string>();
        foreach (var t in allTimes)
        {
            var start = TimeSpan.Parse(t);
            var end = start.Add(TimeSpan.FromMinutes(30)); // Each slot is 30 min
            bool overlaps = bookings.Any(b =>
                // Booking start and end
                {
                    var bStart = b.time;
                    var bEnd = b.time.Add(TimeSpan.FromHours(b.duration));
                    // If the slot start or end is within a booking, or booking is within slot
                    return (start < bEnd && end > bStart);
                });
            if (!overlaps)
                availableTimes.Add(t);
        }
        Console.WriteLine($"[AvailableTimes] availableTimes: {string.Join(", ", availableTimes)}");
        return Ok(availableTimes.Select(t => new { date, time = t }));
    }
}
