package rft.dao;

import java.util.List;

import rft.model.Question;

public interface QuestionService {
	
	Question getQuestion();
	
	List<Question> getRandomQuestions();

}
