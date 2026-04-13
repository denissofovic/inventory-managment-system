using backend.Context;
using Microsoft.EntityFrameworkCore;
using DotNetEnv;


// Load .env file
DotNetEnv.Env.Load();


// ... the rest of your code


var builder = WebApplication.CreateBuilder(args);


// Get connection string from environment variable
var connectionString = Environment.GetEnvironmentVariable("DB_CONNECTION_STRING");

builder.Services.AddDbContext<InventoryContext>(options =>
{
    options.UseSqlServer(connectionString);
});


// Add controllers
builder.Services.AddControllers();

// Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CORS policy for frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000") // frontend service name from Docker
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Use CORS named policy
app.UseCors("AllowFrontend");

app.UseAuthorization();

app.MapControllers();

app.Run();
