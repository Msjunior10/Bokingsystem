using static BCrypt.Net.BCrypt;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.Sqlite;
using Microsoft.IdentityModel.Tokens;
using RestaurantApi.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

[ApiController]
[Route("[controller]")]
public class AuthController : ControllerBase
{
    private readonly string _connectionString = "Data Source=DB/Resturant.db";
    private readonly string jwtKey = "super_secret_jwt_key_12345"; // Byt till säkrare i prod

    [HttpPost("register")]
    public IActionResult Register([FromBody] UserRegisterDto dto)
    {
        // Kontrollera om användarnamn redan finns
        using var connection = new SqliteConnection(_connectionString);
        connection.Open();
        var checkCmd = connection.CreateCommand();
        checkCmd.CommandText = "SELECT COUNT(*) FROM users WHERE username = $username";
        checkCmd.Parameters.AddWithValue("$username", dto.Username);
        var exists = (long)checkCmd.ExecuteScalar() > 0;
        if (exists) return BadRequest("Username already exists");

        // Hasha lösenordet
        var passwordHash = HashPassword(dto.Password);

        // Spara användaren
        var cmd = connection.CreateCommand();
        cmd.CommandText = "INSERT INTO users (name, username, passwordhash) VALUES ($name, $username, $passwordhash)";
        cmd.Parameters.AddWithValue("$name", dto.Name);
        cmd.Parameters.AddWithValue("$username", dto.Username);
        cmd.Parameters.AddWithValue("$passwordhash", passwordHash);
        cmd.ExecuteNonQuery();
        return Ok();
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] UserLoginDto dto)
    {
        using var connection = new SqliteConnection(_connectionString);
        connection.Open();
        var cmd = connection.CreateCommand();
        cmd.CommandText = "SELECT id, name, username, passwordhash FROM users WHERE username = $username";
        cmd.Parameters.AddWithValue("$username", dto.Username);
        using var reader = cmd.ExecuteReader();
        if (!reader.Read()) return Unauthorized("Invalid credentials");
        var user = new User
        {
            Id = reader.GetInt32(0),
            Name = reader.GetString(1),
            Username = reader.GetString(2),
            PasswordHash = reader.GetString(3)
        };
        if (!Verify(dto.Password, user.PasswordHash))
            return Unauthorized("Invalid credentials");

        // Skapa JWT-token
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(jwtKey);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Name, user.Name),
                new Claim(ClaimTypes.Email, user.Username)
            }),
            Expires = DateTime.UtcNow.AddHours(12),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        var jwt = tokenHandler.WriteToken(token);
        return Ok(new { token = jwt, name = user.Name, username = user.Username });
    }
}

public class UserRegisterDto
{
    public string? Name { get; set; }
    public string? Username { get; set; }
    public string? Password { get; set; }
}

public class UserLoginDto
{
    public string? Username { get; set; }
    public string? Password { get; set; }
}
