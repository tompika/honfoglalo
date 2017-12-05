package rft.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import rft.dao.UserService;
import rft.model.User;

@Service
public class UserServiceImpl {
	
	@Autowired
	 UserService dao;
	

	public User findById(long id) {
		return dao.findById(id);
	}

	
	public User findByName(String username) {
		return dao.findByName(username);
	}

	
	public void saveUser(User user) {
		dao.saveUser(user);
	}

	
	public User updateUser(User user) {
		return dao.updateUser(user);
	}

	
	public List<User> findAllUsers() {
		return dao.findAllUsers();
	}


	
	public boolean isUserExist(User user) {
		return dao.isUserExist(user);
	}
	
	

}
