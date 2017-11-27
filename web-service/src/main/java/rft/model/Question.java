package rft.model;

import java.io.Serializable;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;

@Entity
@Table(name = "QUESTIONS")
@NamedQueries({
    @NamedQuery(name = "Question.findAll", query = "Select q from Question q")
})
public class Question implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @Column(name = "ID_QUESTION")
    @SequenceGenerator(name = "QUESTION_SEQ", sequenceName = "QUESTION_SEQ", allocationSize = 1, initialValue = 1000)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "QUESTION_SEQ")
    private Long id;
    
    @Column(name = "QUESTION")
    private String question;
    
    @Column(name = "ANSWER1")
    private String answer1;
    
    @Column(name = "ANSWER2")
    private String answer2;
    
    @Column(name = "ANSWER3")
    private String answer3;
    
    @Column(name = "ANSWER4")
    private String answer4;
    
    @Column(name = "CANSWER")
    private String canswer;

    public Question() {
    }

    public Question(String question, String answer1, String answer2, String answer3, String answer4, String canswer) {
        super();
        this.question = question;
        this.answer1 = answer1;
        this.answer2 = answer2;
        this.answer3 = answer3;
        this.answer4 = answer4;
        this.canswer = canswer;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }

    public String getAnswer1() {
        return answer1;
    }

    public void setAnswer1(String answer1) {
        this.answer1 = answer1;
    }

    public String getAnswer2() {
        return answer2;
    }

    public void setAnswer2(String answer2) {
        this.answer2 = answer2;
    }

    public String getAnswer3() {
        return answer3;
    }

    public void setAnswer3(String answer3) {
        this.answer3 = answer3;
    }

    public String getAnswer4() {
        return answer4;
    }

    public void setAnswer4(String answer4) {
        this.answer4 = answer4;
    }

    public String getCanswer() {
        return canswer;
    }

    public void setCanswer(String canswer) {
        this.canswer = canswer;
    }

    @Override
    public int hashCode() {
        final int prime = 31;
        int result = 1;
        result = prime * result + ((question == null) ? 0 : question.hashCode());
        return result;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null) {
            return false;
        }
        if (getClass() != obj.getClass()) {
            return false;
        }
        Question other = (Question) obj;
        if (question == null) {
            if (other.question != null) {
                return false;
            }
        } else if (!question.equals(other.question)) {
            return false;
        }
        return true;
    }

    @Override
    public String toString() {
        return "Question [id=" + id + ", question=" + question + ", answer1=" + answer1 + ", answer2=" + answer2
                + ", answer3=" + answer3 + ", answer4=" + answer4 + ", canswer=" + canswer + "]";
    }

}
