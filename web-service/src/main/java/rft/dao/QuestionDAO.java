package rft.dao;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

import org.springframework.stereotype.Repository;

import rft.model.Question;


@Repository
public class QuestionDAO implements QuestionService{
	@PersistenceContext
	private EntityManager em;
	
	
	@Override
	public Question getQuestion() {
		return em.createNamedQuery("Question.findAll",Question.class).getSingleResult();
	}

}
