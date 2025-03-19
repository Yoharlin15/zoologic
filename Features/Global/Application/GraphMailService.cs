using Azure.Identity;
using Microsoft.Graph;
using Microsoft.Graph.Models;
using Microsoft.Graph.Users.Item.SendMail;

namespace feedback_zoologic.GraphMailService
{

    public interface ICustomMailService
    {
        public void SendMail(string subject, string body, string recipientEmail, BodyType bodyType);
    }


    public class GraphMailService : ICustomMailService
    {
        IConfiguration _config;

        public GraphMailService(IConfiguration config)
        {
            _config = config;
        }

        public void SendMail(string subject, string body, string recipientEmail, BodyType bodyType)
        {

            GraphCredentials graph = new GraphCredentials(_config);

            var credentials = new ClientSecretCredential(
                 graph.TenantId,
                 graph.ClientId,
                 graph.SecretId,
            new TokenCredentialOptions { AuthorityHost = AzureAuthorityHosts.AzurePublicCloud });

            GraphServiceClient graphServiceClient = new GraphServiceClient(credentials);


            var message = new Message
            {
                Subject = subject,
                Body = new ItemBody
                {
                    ContentType = bodyType,
                    Content = body
                },
                ToRecipients = new List<Recipient>()
                {
                    new Recipient{EmailAddress = new EmailAddress
                    {
                        Address = recipientEmail
                    }}
                }
            };

            // Cuerpo de la solicitud de envío de correo
            var sendMailRequestBody = new SendMailPostRequestBody
            {
                Message = message,
                SaveToSentItems = true
            };

            // Enviar el correo electrónico de forma asincrónica
            graphServiceClient.Users[graph.GraphMail]
                .SendMail.PostAsync(sendMailRequestBody)
                .Wait();

        }
    }
}