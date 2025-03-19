public class SmtpSettings
{
    public string FromAddress { get; set; } = string.Empty;
    public string Host { get; set; } = string.Empty;
    public int Port { get; set; }
    public string CredentialEmail { get; set; } = string.Empty;
    public string CredentialPassword { get; set; } = string.Empty;
    public bool EnableSsl { get; set; }
}