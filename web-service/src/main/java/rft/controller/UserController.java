package rft.controller;

import java.util.UUID;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import rft.model.User;
import rft.model.VerificationToken;
import rft.service.EmailServiceImpl;
import rft.service.UserServiceImpl;
import rft.service.VerificationTokenServiceImpl;
import rft.util.PWEncryptor;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
public class UserController {

    private static Logger logger = Logger.getLogger(UserController.class);

    @Autowired
    UserServiceImpl userService;
    private static PWEncryptor pw = new PWEncryptor();
    
    @Autowired
    EmailServiceImpl emailService;
    
    @Autowired
    VerificationTokenServiceImpl tokenService;

    
    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> getAuthentication(@RequestBody User user) {

        logger.info("Kapott objektum: " + user);

        if (userService.findByName(user.getUsername()) != null) {
            

            User temp = userService.findByName(user.getUsername());

            if (pw.checkPassword(user.getPassword(), temp.getPassword())) {
                return new ResponseEntity<User>(user, HttpStatus.OK);
            }
        }

        logger.warn("Sikertelen belepes!");
        return new ResponseEntity<String>("Sikertelen belepes!", HttpStatus.NOT_FOUND);
    }

    
    @RequestMapping(value = "/registration", method = RequestMethod.POST)
    public ResponseEntity<?> doRegist(@RequestBody User user) {

        logger.info("Regisztralando user neve: " + user.getUsername());

        User temp = userService.findByName(user.getUsername());

        if (temp != null) {

            return new ResponseEntity<String>("HIBA TORTENT!", HttpStatus.NOT_FOUND);
        }

        //user.getUserRole().add(new UserRole(user, "ROLE_USER"));
        user.setPassword(pw.getEncryptedPassword(user.getPassword()));
        user.setEnabled(false);
        

        
        String token = UUID.randomUUID().toString();
        
        logger.info("Generalt token: "+ token);
        
        VerificationToken verToken = new VerificationToken(token);
        
        
        logger.info(verToken);
        user.addToken(verToken);
        userService.saveUser(user);
        
        //tokenService.save(verToken);
        
        emailService.sendMail("rftproject@valami.hu", user.getEmail(), "Regisztráció megerősítés - " + user.getUsername(), 
                
                "Üdvözöllek <b>" + user.getFirstname() + " " + user.getLastname()+ "</b>!<br><br>"
                        + "Kérlek aktiváld magad az alábbi link segítségével: "
                        + "<a href=\"http://localhost:8090/SpringBootBasic/api/confirm?token=" + token + "\"" + ">Link</a>");
        
        logger.info(user.getUsername() + " sikeresen mentve!");

        return new ResponseEntity<String>(user + " ", HttpStatus.OK);
    }

    @RequestMapping(value = "/welcome", method = RequestMethod.GET)
    public String welcome(Model model) {
        logger.info("/welcome");
        return "welcome";
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String root() {
        return "Rossz helyen jarsz!";
    }

}
