using intern_project.Entities;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text.Json.Serialization;
using Microsoft.Extensions.Configuration;
using Castle.Core.Configuration;
using Microsoft.Data.SqlClient;
using System.Text;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;

var builder = WebApplication.CreateBuilder(args);
var dbcontext =new InternDbContext();
//seed data
//if (dbcontext.Phattus.Count() == null)
//{
//for (int i = 3; i <= 100; i++)
//{
//    Phattu phattu = new Phattu()
//    {
//        Anhchup = $"picnumb{i}",
//        Dahoantuc = true,
//        Email = "abc",
//        Gioitinh = 1,
//        Ho = "abc",
//        Ngayhoantuc = DateTime.Now,
//        Ngaysinh = DateTime.Now,
//        Ngayxuatgia = DateTime.Now,
//        Password = "123",
//        Phapdanh = "abc",
//        Sodienthoai = "0123456789",
//        Ten = "abc",
//        Tendem = "abc",
//        Chuaid = 1,
//        Kieuthanhvienid = 1,
//        IsActive = true
//    };
//    dbcontext.Phattus.Add(phattu);

//}
//dbcontext.SaveChanges();
//}

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Description = "Standard Authorization header using the Bearer scheme (\"bearer {token}\")",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey

    });
    options.OperationFilter<SecurityRequirementsOperationFilter>();
});

//tranh loi vong 

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(opt =>
{
    opt.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
    {
        //Tu Cap Token
        ValidateIssuer = false,
        ValidateAudience = false,
        //ValidateLifetime = true,

        //ValidIssuer = builder.Configuration["Jwt:Issuer"],
        //ValidAudience = builder.Configuration["Jwt:Audience"],
        //Ky vao Token
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
                            .GetBytes(builder.Configuration.GetSection("Appsettings:Token").Value))
        
    };
});
// Tạo phân quyền cho API
builder.Services.AddAuthorization(option =>
{
    option.AddPolicy("ADMINANDMEMBER", policy =>
        policy.RequireClaim(
             ClaimTypes.Role, new string[] { "ADMIN", "MEMBER" }
            )
    );
    option.AddPolicy("MEMBER", policy => policy.RequireClaim(
        ClaimTypes.Role, "MEMBER"
        ));
    option.AddPolicy("ADMIN", policy => policy.RequireClaim(
     ClaimTypes.Role, "ADMIN"
     ));
});
builder.Services.AddControllers().AddJsonOptions(options =>
{
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    options.JsonSerializerOptions.WriteIndented = true;
});
//tranh loi vong lap

var app = builder.Build();
builder.Services.AddCors();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(c => c.AllowAnyHeader().AllowAnyMethod().AllowAnyOrigin());
app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
