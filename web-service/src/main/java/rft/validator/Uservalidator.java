package rft.validator;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

import rft.model.User;
import rft.service.UserServiceImpl;

public class Uservalidator implements Validator{

	@Autowired
	UserServiceImpl userService;
	
	@Override
	public boolean supports(Class<?> arg0) {
		return User.class.equals(arg0);
	}

	@Override
	public void validate(Object o, Errors errors) {
		
		User user = (User) o;
		
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "username", "NotEmpty");
		if (user.getUsername().length() < 2 || user.getUsername().length() > 32) {
            errors.rejectValue("username", "Size.userForm.username");
        }
		
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "password", "NotEmpty");
        if (user.getPassword().length() < 1 || user.getPassword().length() > 32) {
            errors.rejectValue("password", "Size.userForm.password");
        }
        
        ValidationUtils.rejectIfEmptyOrWhitespace(errors, "email", "NotEmpty");
		if (user.getEmail().length() < 2 || user.getEmail().length() > 32) {
            errors.rejectValue("email", "Size.userForm.email");
        }
		
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "firstname", "NotEmpty");
		if (user.getFirstname().length() < 2 || user.getFirstname().length() > 32) {
            errors.rejectValue("firstname", "Size.userForm.firstname");
        }
		
		ValidationUtils.rejectIfEmptyOrWhitespace(errors, "lastname", "NotEmpty");
		if (user.getLastname().length() < 2 || user.getLastname().length() > 32) {
            errors.rejectValue("lastname", "Size.userForm.lastname");
        }
		
		
        
        
	}

}
