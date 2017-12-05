package rft.common;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import com.sendgrid.*;
import java.io.IOException;
import org.springframework.beans.factory.annotation.Value;

@Transactional
@Repository
public class MailMail {

    public static final Logger logger = LoggerFactory.getLogger(MailMail.class);

    @Value("${sendgrid.apikey}")
    private String apiKey;

    public void sendMail(String _from, String _to, String _subject, String _msg) {

        Email from = new Email(_from);
        String subject = _subject;
        Email to = new Email(_to);
        Content content = new Content("text/html", _msg);
        Mail mail = new Mail(from, subject, to, content);

        

        SendGrid sg = new SendGrid("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");
        Request request = new Request();
        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
                       
            Response response = sg.api(request);
            logger.info("StatusCode: " + response.getStatusCode());
            logger.info("Body: " + response.getBody());
            logger.info("Headers: " + response.getHeaders());
        } catch (IOException ex) {
            logger.warn(ex.getMessage());
        }

    }
}
