package rft.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import rft.dao.QuestionService;
import rft.model.Question;


@Service
public class QuestionServiceImpl{
	
	@Autowired
	QuestionService dao;
	
	public Question getQuestion() {
		return dao.getQuestion();
	}

}
