package rft.controller;


import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import rft.model.Question;
import rft.model.User;
import rft.service.QuestionServiceImpl;
import rft.service.UserServiceImpl;

@CrossOrigin(origins = "http://localhost:4200")
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
		/*User u = userService.findByName(SecurityContextHolder.getContext().getAuthentication().getName());
		logger.info("Getting current user");
		return new ResponseEntity<User>(u,HttpStatus.OK);*/
                return null;
	}

	@RequestMapping(value="/randomquestions/" ,method=RequestMethod.GET)
	public ResponseEntity<List<Question>> getRandomQuestions(){
		List<Question> q = questionService.getRandomQuestions();
		logger.info("Getting random questions");

		for (Question question : q) {
			logger.info(question);
		}

		return new ResponseEntity<List<Question>>(q,HttpStatus.OK);
	}

	@RequestMapping(value="/getfriendlist/{username}", method=RequestMethod.GET)
	public ResponseEntity<List<String>> addFriend(@PathVariable("username") String username){
		User user = userService.findByName(username);

		return new ResponseEntity<>(user.getFriendlist(),HttpStatus.OK);
	}

	@RequestMapping(value="/addfriend/{to},{who}", method=RequestMethod.GET)
	public ResponseEntity<String> addFriend(@PathVariable("to") String touser, @PathVariable("who") String whouser){
		StringBuilder sb = new StringBuilder();
		User to = userService.findByName(touser);
		User who = userService.findByName(whouser);	
		
		if (who == null) {
			sb.append("HIBA");
			return new ResponseEntity<>(sb.toString(),HttpStatus.OK);
		
		}
			
		
		

		logger.info("user: " + to);
		logger.info("user2: " + who);

		if (!to.getFriendlist().contains(who.getUsername()) && !who.getFriendlist().contains(to.getUsername())){
			to.addFriend(who);
			who.addFriend(to);
		}

		to = userService.updateUser(to);
		who = userService.updateUser(who);
		

		for (int i = 0; i<to.getFriendlist().size(); i++) {
			if (i==to.getFriendlist().size()-1) {
				sb.append(to.getFriendlist().get(i));
			}else {
				sb.append(to.getFriendlist().get(i) + ",");
			}
			
		}
		sb.append("&&");
		for (int i = 0; i<who.getFriendlist().size(); i++) {
			if (i==who.getFriendlist().size()-1) {
				sb.append(who.getFriendlist().get(i));
			}else {
				sb.append(who.getFriendlist().get(i) + ",");
			}
			
		}

		return new ResponseEntity<>(sb.toString(),HttpStatus.OK);
	}

	@RequestMapping(value="/removefriend/{to},{who}", method=RequestMethod.GET)
	public ResponseEntity<String> removeFriend(@PathVariable("to") String touser, @PathVariable("who") String whouser){
		StringBuilder sb = new StringBuilder();
		User to = userService.findByName(touser);
		User who = userService.findByName(whouser);

		if (to.getFriendlist().contains(who.getUsername()) && who.getFriendlist().contains(to.getUsername())) {
			to.removeFriend(who);
			who.removeFriend(to);
		}

		to = userService.updateUser(to);
		who = userService.updateUser(who);


		for (int i = 0; i<to.getFriendlist().size(); i++) {
			if (i==to.getFriendlist().size()-1) {
				sb.append(to.getFriendlist().get(i));
			}else {
				sb.append(to.getFriendlist().get(i) + ",");
			}
			
		}
		sb.append("&&");
		for (int i = 0; i<who.getFriendlist().size(); i++) {
			if (i==who.getFriendlist().size()-1) {
				sb.append(who.getFriendlist().get(i));
			}else {
				sb.append(who.getFriendlist().get(i) + ",");
			}
			
		}
		
		return new ResponseEntity<>(sb.toString(),HttpStatus.OK);
	}


       

}
