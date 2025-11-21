
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
    private readonly string jwtKey = "super_secret_jwt_key_12345_very_long_and_secure_key_67890"; // Byt till säkrare i prod

    // Debug-endpoint: Lista alla användare och admin-status
    [HttpGet("all-users-debug")] // Ta bort denna när du är klar!
    public IActionResult GetAllUsersDebug()
    {
        var users = new List<object>();
        using var connection = new SqliteConnection(_connectionString);
        connection.Open();
        var cmd = connection.CreateCommand();
        cmd.CommandText = "SELECT id, name, email, isadmin FROM users";
        using var reader = cmd.ExecuteReader();
        while (reader.Read())
        {
            users.Add(new {
                Id = reader.GetInt32(0),
                Name = reader.GetString(1),
                Email = reader.GetString(2),
                IsAdmin = reader.GetInt32(3) == 1
            });
        }
        return Ok(users);
    }

    [HttpPost("register")]
    public IActionResult Register([FromBody] UserRegisterDto dto)
    {
        // Kontrollera om användarnamn redan finns
        using var connection = new SqliteConnection(_connectionString);
        connection.Open();
        var checkCmd = connection.CreateCommand();
        checkCmd.CommandText = "SELECT COUNT(*) FROM users WHERE email = $email";
        checkCmd.Parameters.AddWithValue("$email", dto.Email);
        var exists = (long)checkCmd.ExecuteScalar() > 0;
        if (exists) return BadRequest("Email already exists");

        // Hasha lösenordet
        var passwordHash = HashPassword(dto.Password);

        // Spara användaren
        var cmd = connection.CreateCommand();
        // Första användaren blir admin, övriga blir vanliga användare
        var isAdmin = 0;
        var countCmd = connection.CreateCommand();
        countCmd.CommandText = "SELECT COUNT(*) FROM users";
        var userCount = (long)countCmd.ExecuteScalar();
        if (userCount == 0) isAdmin = 1;
        cmd.CommandText = "INSERT INTO users (name, email, passwordhash, isadmin) VALUES ($name, $email, $passwordhash, $isadmin)";
        cmd.Parameters.AddWithValue("$name", dto.Name);
        cmd.Parameters.AddWithValue("$email", dto.Email);
        cmd.Parameters.AddWithValue("$passwordhash", passwordHash);
        cmd.Parameters.AddWithValue("$isadmin", isAdmin);
        cmd.ExecuteNonQuery();
        return Ok();
    }

    [HttpPost("login")]
    public IActionResult Login([FromBody] UserLoginDto dto)
    {
        using var connection = new SqliteConnection(_connectionString);
        connection.Open();
        var cmd = connection.CreateCommand();
        cmd.CommandText = "SELECT id, name, email, passwordhash, isadmin FROM users WHERE email = $email";
        cmd.Parameters.AddWithValue("$email", dto.Email);
        using var reader = cmd.ExecuteReader();
        if (!reader.Read()) return Unauthorized("Invalid credentials");
        var user = new User
        {
            Id = reader.GetInt32(0),
            Name = reader.GetString(1),
            Email = reader.GetString(2),
            PasswordHash = reader.GetString(3),
            IsAdmin = reader.GetInt32(4) == 1
        };
        if (!Verify(dto.Password, user.PasswordHash))
            return Unauthorized("Invalid credentials");

        // Skapa JWT-token
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(jwtKey);
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Name),
            new Claim(ClaimTypes.Email, user.Email)
        };
        if (user.IsAdmin)
            claims.Add(new Claim(ClaimTypes.Role, "admin"));
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddHours(12),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);
        var jwt = tokenHandler.WriteToken(token);
        return Ok(new { token = jwt, name = user.Name, email = user.Email, isAdmin = user.IsAdmin });
    }
}

public class UserRegisterDto
{
    public string? Name { get; set; }
    public string? Email { get; set; }
    public string? Password { get; set; }
}

public class UserLoginDto
{
    public string? Email { get; set; }
    public string? Password { get; set; }
}
