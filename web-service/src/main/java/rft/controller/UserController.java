package rft.controller;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import rft.model.User;
import rft.model.UserRole;
import rft.service.UserServiceImpl;
import rft.util.PWEncryptor;

@Controller
public class UserController {
	
	private static Logger logger = Logger.getLogger(UserController.class);
	
	@Autowired
	UserServiceImpl userService;
	private static PWEncryptor pw = new PWEncryptor();
	
	@RequestMapping(value = "/registration", method = RequestMethod.GET)
    public String registration(Model model) {
		logger.info("reg get");
        model.addAttribute("userForm", new User());
        return "registration";
    }

    @RequestMapping(value = "/registration", method = RequestMethod.POST)
    public String registration(@ModelAttribute("userForm") User userForm, BindingResult bindingResult, Model model) {
        //userValidator.validate(userForm, bindingResult);
    	logger.info("reg post");
        if (bindingResult.hasErrors()) {
            return "registration";
        }
        userForm.getUserRole().add(new UserRole(userForm,"ROLE_USER"));
        userForm.setPassword(pw.encode(userForm.getPassword()));
        userForm.setEnabled(true);
        userService.saveUser(userForm);

        //securityService.autologin(userForm.getUsername(), userForm.getPasswordConfirm());

        return "login";
    }

    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login(Model model, String error, String logout) {
    	 Authentication auth = SecurityContextHolder.getContext().getAuthentication();
    	logger.info("login get");
    	 	if (error != null ) {
    	 		logger.info("error" + error);
             model.addAttribute("error", "Your username and password is invalid.");
    	 	}
         if (logout != null ) {
        	 	logger.info("logout" + logout);
             model.addAttribute("message", "You have been logged out successfully.");
         }
         

         if (!(auth instanceof AnonymousAuthenticationToken)) {

             logger.info("redirect to welcome");
             return "forward:/welcome";
         }
         
        return "login";
    }
    
   
    
    @RequestMapping(value = "/welcome", method = RequestMethod.GET)
    public String welcome(Model model) {
    		logger.info("/welcome");
        return "welcome";
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String root(Model model) {
        return "redirect:/login";
    }
    
    
    
    
}
