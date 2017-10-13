package repository;

import java.util.List;

import javax.ejb.Local;
import javax.ejb.Stateless;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.apache.log4j.Logger;

import model.User;
@Stateless
@Local
public class UserDAO {
	@PersistenceContext(name="RFTDS")
	private EntityManager em;
	
	private static Logger logger = Logger.getLogger(UserDAO.class);
	
	public void createUser(User u){
		logger.info("create user: " + u.getUserName());
		try {
			em.persist(u);
			em.flush();
		} catch (Exception e) {
			logger.error("createUser exception message: " + e.getMessage());
			e.printStackTrace();
		}
	}
	
	public User updateUser(User u){
		logger.info("update user: " + u.getUserName());
		User tmp = null;
		try {
			tmp = em.merge(u);
			em.flush();
			return tmp;
		} catch (Exception e) {
			logger.error("updateuser exception message: " + e.getMessage());
			e.printStackTrace();
		}
		return tmp;
		
	}
	
	public List<User> findAll(){
		List<User> tmp = null;
		try {
			logger.info("finding all users");
			tmp = em.createNamedQuery("User.findAll", User.class).getResultList();
			logger.info("Number of users found: " + tmp.size());
			return tmp;
		} catch (Exception e) {
			logger.error("findAlluser exception message: " + e.getMessage());
			e.printStackTrace();
		}
		return tmp;
	}
	
	public User findByUserName(String username){
		try {
			return em.createNamedQuery("User.findByUserName",User.class).setParameter("username", username).getSingleResult();
		} catch (Exception e) {
			logger.error("findByUserName exception message: " + e.getMessage());
			e.printStackTrace();
		}
		return null;
	}
	
}
