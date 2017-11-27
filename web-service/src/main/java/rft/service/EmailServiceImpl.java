/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rft.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import rft.common.MailMail;

/**
 *
 * @author Szilvácsku Péter
 */
@Service
public class EmailServiceImpl {

    public static final Logger logger = LoggerFactory.getLogger(EmailServiceImpl.class);

    @Autowired
    private MailMail mail;

    
    public void sendMail(String from, String to, String subject, String content) {
        mail.sendMail(from, to, subject, content);
        logger.info("Mail elkuldve!");
    }
}
