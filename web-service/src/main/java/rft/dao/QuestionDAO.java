package rft.dao;

import java.util.List;
import java.util.Random;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.apache.log4j.Logger;
import org.springframework.stereotype.Repository;

import rft.model.Question;


@Repository
public class QuestionDAO implements QuestionService{
	private Logger logger = Logger.getLogger(QuestionDAO.class);
	
	@PersistenceContext
	private EntityManager em;
	
	
	@Override
	public Question getQuestion() {
            
            List<Question> all = em.createNamedQuery("Question.findAll",Question.class).getResultList();
            
            Random random = new Random();
            int min, max, rand;
            min = 0;
            max = all.size()-1;
            rand = random.nextInt(max - min + 1) + min;
           
            
            return all.get(rand);
	}


	@Override
	public List<Question> getRandomQuestions() {
		logger.info("getq");
		return em.createNativeQuery("SELECT * FROM QUESTIONS ORDER BY RAND() LIMIT 5",Question.class).getResultList();
	}
	
	
	

}
