using System.Text;
using System.Reflection;
using Microsoft.OpenApi.Models;
using feedback_zoologic.Models;
using feedback_zoologic.Features.Especies.Domain;
using feedback_zoologic.Features.Global.Application;
using feedback_zoologic.Features.Global.Infraestructure;
using feedback_zoologic.Features.Especies.Infrastructure.Persistence;
using feedback_zoologic.Features.Especies.Application;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddExceptionHandler<GlobalExceptionHandler>();
builder.Services.AddExceptionHandler<BadRequestExceptionHandler>();
builder.Services.AddExceptionHandler<NotFoundExceptionHandler>();
builder.Services.AddProblemDetails();

builder.Services.AddCors(p => p.AddPolicy("corsapp", builder =>
{
    builder.WithOrigins("*").AllowAnyMethod().AllowAnyHeader().WithExposedHeaders("Content-Disposition");
}));

builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssemblies(typeof(Program).Assembly));

builder.Services.AddHttpContextAccessor();

builder.Services.AddScoped<IEventDispatcher, EventDispatcher>(); // Asegúrate de que la implementación existe
builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();

builder.Services.AddDBStorage<EspecieDbContext>(builder.Configuration,typeof(Program).Assembly);
builder.Services.AddTransient<IEspecieRepository, EspecieRepository>();
builder.Services.AddTransient<IEspecieQueryRepository, EspecieRepository>();

builder.Services.AddAutoMapper(
     (_, config) => config
                    .AddProfile(new MappingProfile(typeof(Program).Assembly)),
                Array.Empty<Assembly>()
    );
                
builder.Services.AddControllersWithViews().AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = null);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    // Titulo:
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "Api Zoologic", Version = "v1" });

    // Boton Autorize (Swagger), para ingresar el token:
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "Jwt Authorization",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer Token"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            new string[] {}
        }
    });
});

builder.Services.AddHttpContextAccessor();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseCors("corsapp");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}");
app.MapControllerRoute(
            name: "ReactApp",
            pattern: "{*url}",
            defaults: new { controller = "Home", action = "Index" }
        );
app.Run();