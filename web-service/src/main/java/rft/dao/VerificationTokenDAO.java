/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rft.dao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;
import rft.model.VerificationToken;

/**
 *
 * @author Szilvácsku Péter
 */
@Transactional
@Repository
public class VerificationTokenDAO implements VerificationTokenService {

    private static Logger logger = Logger.getLogger(VerificationTokenDAO.class);

    @PersistenceContext
    private EntityManager em;

    @Override
    public VerificationToken findByToken(String token) {

        try {
            VerificationToken temp = em.createNamedQuery("VerificationToken.findByToken", VerificationToken.class)
                    .setParameter("token", token)
                    .getSingleResult();

            return temp;

        } catch (Exception e) {
            logger.warn(e.getMessage());

            return null;
        }

    }

    @Override
    public boolean deleteById(long id) {

        VerificationToken token = em.find(VerificationToken.class, id);

        if (token != null) {
            logger.info("Token torles sikeres: " + token);
            em.remove(token);
            return true;
        } else {
            logger.info("Nincs ilyen token id-vel! id: " + id);
            return false;
        }
    }

    @Override
    public void save(VerificationToken token) {
        logger.info("Token save: " + token);
        em.persist(token);
    }

}
