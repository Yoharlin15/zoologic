    public class GraphCredentials
    {
        IConfiguration _config;

        public GraphCredentials(IConfiguration config)
        {
            _config = config;
        }

        public string TenantId { get { return _config["GraphMail:TenantId"]!; } }
        public string ClientId { get { return _config["GraphMail:ClientId"]!; } }
        public string SecretId { get { return _config["GraphMail:ClientSecret"]!; } }
        public string GraphMail { get { return _config["GraphMail:UserObjectId"]!; } }
    }