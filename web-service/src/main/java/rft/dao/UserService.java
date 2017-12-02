package rft.dao;


import java.util.List;

import rft.model.User;



public interface UserService {
	
	User findById(long id);
	
	User findByName(String name);
	
	void saveUser(User user);
	
	User updateUser(User user);

	List<User> findAllUsers();
	
	boolean isUserExist(User user);
	
	
}
