using feedback_zoologic.Features.Global.Application;

namespace feedback_zoologic.Features.Global.Infraestructure
{
    public class CurrentUserService : ICurrentUserService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly IConfiguration _configuration;
        private readonly int _defaultSystemUserId;

        public CurrentUserService(IHttpContextAccessor httpContextAccessor, IConfiguration configuration)
        {
            _httpContextAccessor = httpContextAccessor;
            _configuration = configuration;
            _defaultSystemUserId = _configuration.GetValue<int>("SystemUser:Id");
        }

        public int UsuarioId
        {
            get
            {
                int userId = Convert.ToInt32(_httpContextAccessor?.HttpContext?.User.FindFirst("UsuarioId")?.Value);
                return userId != 0 ? userId : _defaultSystemUserId;
            }
        }
    }
}
