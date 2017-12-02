package rft.model;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.SequenceGenerator;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;


@Entity
@Table(name = "USERS", uniqueConstraints={
		@UniqueConstraint(columnNames="USERNAME"),
		@UniqueConstraint(columnNames="EMAIL")
})
@NamedQueries({
	@NamedQuery(name="User.findAll", query="Select u from User u"),
	@NamedQuery(name="User.findByUserName", query="select u from User u where u.username = :username"),
	@NamedQuery(name="User.findById", query="select u from User u where u.id = :id")
	
})
public class User implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@Id
	@Column(name = "ID_USER")
	@SequenceGenerator(name = "USER_SEQ", sequenceName = "USER_SEQ", allocationSize = 1, initialValue = 1000)
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "USER_SEQ")
    private long id;
	
	@Column(name = "USERNAME", nullable = false)
	private String username;
        
       
	@Column(name = "PASSWORD", nullable = false)
	private String password;
	
	@Column(name = "ENABLED")
	private boolean enabled;
	
	@Column(name = "FIRST_NAME")
	private String firstname;
	
	@Column(name = "LAST_NAME")
	private String lastname;

	@Column(name = "DATE_OF_BIRTH")
	private Date date;

	@Column(name = "EMAIL", nullable = false)
	private String email;
	
	@Column(name="FRIENDS")
	@ElementCollection(targetClass=String.class,fetch=FetchType.EAGER)
	private List<String> friendlist;

	public User() {}
	
	public User(String username, String password, boolean enabled) {
		super();
		this.username = username;
		this.password = password;
		this.enabled = enabled;
	}


	public void addFriend(User friend) {
		friendlist.add(friend.getUsername());
	}
	
	public void removeFriend(User friend) {
		friendlist.remove(friend.getUsername());
		
	}
	

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((username == null) ? 0 : username.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		User other = (User) obj;
		
		if (username == null) {
			if (other.username != null)
				return false;
		} else if (!username.equals(other.username))
			return false;
		return true;
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}
        
       
	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	

	public String getFirstname() {
		return firstname;
	}

	public void setFirstname(String firstname) {
		this.firstname = firstname;
	}

	public String getLastname() {
		return lastname;
	}

	public void setLastname(String lastname) {
		this.lastname = lastname;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public boolean isEnabled() {
		return enabled;
	}

	public void setEnabled(boolean enabled) {
		this.enabled = enabled;
	}
	
	public List<String> getFriendlist() {
		return friendlist;
	}
	
	public void setFriendlist(List<String> friendlist) {
		this.friendlist = friendlist;
	}




	@Override
	public String toString() {
		return "User [id=" + id + ", username=" + username + ", password=" + password + ", enabled=" + enabled + ", firstname=" + firstname + ", lastname=" + lastname + ", date=" + date
				+ ", email=" + email + ", friendlist=" + friendlist + "]";
	}

	
	
	
	
}