package rft.service;

import java.util.List;
import java.util.stream.Collectors;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import rft.dao.UserService;
import rft.model.User;
import rft.model.UserRole;
@Service("userDetailsService")
public class UserDetailsServiceImpl implements UserDetailsService{
	
	private static Logger logger = Logger.getLogger(UserDetailsServiceImpl.class);
	
	@Autowired
	UserService userDao;
	
	@Transactional(readOnly=true)
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = null;
		try {
			user = userDao.findByName(username);
		} catch (Exception e) {
			logger.error("user not found");
		}
		
				
	
		if (user == null) {
			logger.info("dobta");
			throw new UsernameNotFoundException("user not found");
		}else {
			logger.info("user: " + user.getUsername());
			List<GrantedAuthority> authorities = buildUserAuthority(user.getUserRole());
			return buildUserForAuthentication(user, authorities);
		}
		
		
	}
	
	private org.springframework.security.core.userdetails.User buildUserForAuthentication(User user, List<GrantedAuthority> authorities) {
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), user.isEnabled(), true, true, true, authorities);
	}

	
	private List<GrantedAuthority> buildUserAuthority(List<UserRole> userRoles) {
		List<GrantedAuthority> tmp = userRoles.stream().map(e->new SimpleGrantedAuthority(e.getRole())).collect(Collectors.toList());
		for (GrantedAuthority grantedAuthority : tmp) {
			logger.info("grantedAuthority: " + grantedAuthority.getAuthority());
		}
		return tmp;
	}
	
}
