using Microsoft.Data.Sqlite;

public class DatabaseService
{
    private readonly string _connectionString = "Data Source=DB/Resturant.db";

    public void Init()
    {
        using var connection = new SqliteConnection(_connectionString);
        connection.Open();

        var command = connection.CreateCommand();
        command.CommandText =
        @"
            CREATE TABLE IF NOT EXISTS bookings (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL,
                date TEXT NOT NULL,
                time TEXT NOT NULL,
                guests INTEGER NOT NULL,
                duration INTEGER NOT NULL DEFAULT 1
            );
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                passwordhash TEXT NOT NULL,
                isadmin INTEGER NOT NULL DEFAULT 0
            );
        ";
        command.ExecuteNonQuery();

        // Try to add duration column if it doesn't exist (for migration)
        var alterCommand = connection.CreateCommand();
        alterCommand.CommandText = "ALTER TABLE bookings ADD COLUMN duration INTEGER NOT NULL DEFAULT 1;";
        try { alterCommand.ExecuteNonQuery(); } catch { /* Ignore if already exists */ }
    }
}