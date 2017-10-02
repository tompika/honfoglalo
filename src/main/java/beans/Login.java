package beans;

import java.io.Serializable;
import java.util.Date;

import javax.annotation.PostConstruct;
import javax.faces.context.FacesContext;
import javax.faces.view.ViewScoped;
import javax.inject.Inject;
import javax.inject.Named;

import org.apache.log4j.Logger;

import model.User;
import repository.UserDAO;
import util.PWEncryptor;



@Named(value="LoginBean")
@ViewScoped
public class Login implements Serializable{
	/**
	 * 
	 */
	
	private static final long serialVersionUID = 1L;

	
	private static Logger logger = Logger.getLogger(Login.class);
	private PWEncryptor pwEncryptor = new PWEncryptor();
	private String username;
	private String password;
	
	@Inject
	UserDAO userDAO;

	public String login(){
		User u = userDAO.findByUserName(username);
		if (u != null) {
			if (pwEncryptor.checkPassword(password, u.getPassword())) {
				
				logger.info("login was successful with user " + u.getUserName());
				FacesContext.getCurrentInstance().getExternalContext().getSessionMap().put("sessionuser",u);
				return "/pages/main?faces-redirect=true";
				
			}else{
				logger.info("wrong pw");
				return "";
				//TODO szar pw
			}
		}else{
			logger.info("user does not exist");
			return "";
			//TODO nincs ilyen user
		}
	}
	
	
	@PostConstruct
	public void createDefault(){
		if (userDAO.findAll().size() == 0) {
			logger.info("create default user");
			User u = new User();
			Date currDate = new Date();
			u.setUserName("test");
			u.setFirstName("test");
			u.setLastName("test");
			u.setEmail("test@gmail.com");
			u.setPassword(pwEncryptor.getEncryptedPassword("test"));
			u.setDate(currDate);
			userDAO.createUser(u);
		}
	}
	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

}
