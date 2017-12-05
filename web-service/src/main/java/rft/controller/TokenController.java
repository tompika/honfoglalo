/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rft.controller;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.logging.Level;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import rft.dao.UserService;
import rft.dao.VerificationTokenService;
import rft.model.User;
import rft.model.VerificationToken;

/**
 *
 * @author Szilvácsku Péter
 */
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api")
public class TokenController {

    public static final Logger logger = LoggerFactory.getLogger(TokenController.class);

    @Autowired
    VerificationTokenService tokenService;

    @Autowired
    UserService userService;

    @RequestMapping(value = "/confirm", method = RequestMethod.GET)
    public ResponseEntity<?> confirmRegtoken(@RequestParam(value = "token", required = true) String token) {

        logger.info("Kapott token: " + token);

        VerificationToken verToken = tokenService.findByToken(token);

        if (verToken != null) {

            User user = userService.findById(verToken.getUser().getId());
            
            
            
            user.setEnabled(true);
            user.removeToken();
            userService.saveUser(user);
            
            logger.info("User {} enabled!", user.getUsername());

            

             
            return new ResponseEntity<>("Sikeres megerosites! - " + user.getUsername(), HttpStatus.OK);
            
            
            
        } else {
            return new ResponseEntity<String>("Nincs ilyen token!", HttpStatus.OK);
        }
    }

}
