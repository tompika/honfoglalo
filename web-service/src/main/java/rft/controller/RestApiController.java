package rft.controller;

import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.UriComponentsBuilder;

import rft.dao.UserDao;
import rft.model.Question;
import rft.model.User;
import rft.service.QuestionServiceImpl;
import rft.service.UserServiceImpl;
import rft.util.CustomErrorType;



@RestController
@RequestMapping("/api")
public class RestApiController {

	public static final Logger logger = Logger.getLogger(RestApiController.class);

	@Autowired
	 UserServiceImpl userService;
	@Autowired
	 QuestionServiceImpl questionService;
	
	//getQuestion
	@RequestMapping(value="/test/" ,method=RequestMethod.GET)
	public ResponseEntity<String> getQuestion(){
		logger.info("Test string");
		return new ResponseEntity<String>("asd",HttpStatus.OK);
	}
	
	@RequestMapping(value="/question/" ,method=RequestMethod.GET)
	public ResponseEntity<Question> test(){
		logger.info("asdsa");
		Question q = questionService.getQuestion();
		logger.info("Getting simple question");
		return new ResponseEntity<Question>(q,HttpStatus.OK);
	}
	
	@RequestMapping(value="/user/" ,method=RequestMethod.GET)
	public ResponseEntity<User> getCurrentuser(){
		User u = userService.findByName(SecurityContextHolder.getContext().getAuthentication().getName());
		logger.info("Getting current user");
		return new ResponseEntity<User>(u,HttpStatus.OK);
	}
	


}