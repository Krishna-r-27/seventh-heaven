using System.Data;
using Dapper;
using Microsoft.Extensions.Configuration;
using MySqlConnector;

namespace Seventh_Heaven_LLC.Server.Data
{
    public class DAL
    {
        private readonly IConfiguration _config;

        public DAL(IConfiguration config)
        {
            _config = config;
        }

        // Open a connection
        public IDbConnection GetConnection()
        {
            return new MySqlConnection(_config.GetConnectionString("DefaultConnection"));
        }

        // Execute a query that returns a list
        public async Task<IEnumerable<T>> QueryAsync<T>(string sql, object? param = null)
        {
            using var conn = GetConnection();
            return await conn.QueryAsync<T>(sql, param);
        }

        // Execute a command (insert/update/delete)
        public async Task<int> ExecuteAsync(string sql, object? param = null)
        {
            using var conn = GetConnection();
            return await conn.ExecuteAsync(sql, param);
        }

        // Execute scalar (single value)
        public async Task<T> ExecuteScalarAsync<T>(string sql, object? param = null)
        {
            using var conn = GetConnection();
            return await conn.ExecuteScalarAsync<T>(sql, param);
        }
    }
}
