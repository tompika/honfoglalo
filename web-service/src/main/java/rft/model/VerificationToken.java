package rft.model;

import java.io.Serializable;
import java.sql.Date;
import java.sql.Timestamp;
import java.util.Calendar;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToOne;

/**
 *
 * @author Szilvácsku Péter
 */
@Entity
@NamedQueries({
    @NamedQuery(name = "VerificationToken.findAll", query = "SELECT b FROM VerificationToken b")
    , @NamedQuery(name = "VerificationToken.findById", query = "SELECT b FROM VerificationToken b WHERE b.id = :id")
    , @NamedQuery(name = "VerificationToken.findByToken", query = "SELECT b FROM VerificationToken b WHERE b.token = :token")})
public class VerificationToken implements Serializable {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private static final int EXPIRATION = 60 * 24;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String token;

    @OneToOne(fetch=FetchType.EAGER)
    @JoinColumn(name = "ID_USER")
    private User user;

    private Date expiryDate;

    public VerificationToken() {
    }

    public VerificationToken(String token) {
        this.token = token;
        this.expiryDate = calculateExpiryDate(EXPIRATION);
    }

    private Date calculateExpiryDate(int expiryTimeInMinutes) {
        Calendar cal = Calendar.getInstance();
        
        cal.setTime(new Timestamp(cal.getTime().getTime()));
        cal.add(Calendar.MINUTE, expiryTimeInMinutes);
        
        return new Date(cal.getTime().getTime());
    }

    public Long getId() {
        return id;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public Date getExpiryDate() {
        return expiryDate;
    }

    public void setExpiryDate(Date expiryDate) {
        this.expiryDate = expiryDate;
    }

    @Override
    public String toString() {
        return "VerificationToken{" + "id=" + id + ", token=" + token + ", user=" + user + ", expiryDate=" + expiryDate + '}';
    }

}
