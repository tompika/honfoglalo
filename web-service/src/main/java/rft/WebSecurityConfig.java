package rft;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import rft.util.PWEncryptor;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {
	
	@Autowired
	@Qualifier("userDetailsService")
	UserDetailsService userDetailsService;
	
	private static PWEncryptor pw = new PWEncryptor();
	
	@Autowired
	public void configureGlobal(AuthenticationManagerBuilder auth) throws Exception {
		
		auth.userDetailsService(userDetailsService).passwordEncoder(pw);
	}
	
	
	@Override
    protected void configure(HttpSecurity http) throws Exception {
		http.authorizeRequests().antMatchers("/welcome")
		.access("hasRole('ROLE_USER')").and().formLogin()
		.loginPage("/login").failureUrl("/login")
			.usernameParameter("username")
			.passwordParameter("password")
			.and().logout().logoutSuccessUrl("/login?logout")
			.and().csrf()
			.and().exceptionHandling().accessDeniedPage("/403");
	}
	
	
}
