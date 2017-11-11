package rft.dao;

import java.util.List;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Repository;

import rft.model.User;

@Repository
public class UserDao implements UserService {

    @PersistenceContext
    private EntityManager em;
    private static Logger logger = Logger.getLogger(UserDao.class);

    @Override
    public User findById(long id) {

        try {
            return em.createNamedQuery("User.findById", User.class).setParameter("id", id).getSingleResult();
        } catch (NoResultException e) {
            return null;
        }

    }

    @Override
    public User findByName(String username) {
        logger.info("Keresett username: " + username);
        try {

            User temp = em.createNamedQuery("User.findByUserName", User.class).setParameter("username", username).getSingleResult();
            return temp;

        } catch (NoResultException e) {
            logger.info("Nincs ilyen username: " + username);
            return null;
        }

    }

    @Override
    public void saveUser(User user) {
        logger.info("create user: " + user.getUsername());
        try {
            em.persist(user);
            em.flush();
        } catch (Exception e) {
            logger.error("createUser exception message: " + e.getMessage());
            e.printStackTrace();
        }
    }

    @Override
    public User updateUser(User user) {
        logger.info("update user: " + user.getUsername());
        User tmp = null;
        try {
            tmp = em.merge(user);
            em.flush();
            return tmp;
        } catch (Exception e) {
            logger.error("updateuser exception message: " + e.getMessage());
            e.printStackTrace();
        }
        return tmp;

    }

    @Override
    public List<User> findAllUsers() {
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

    @Override
    public boolean isUserExist(User user) {
        return findAllUsers().stream().anyMatch(e -> e.equals(user));

    }

}
