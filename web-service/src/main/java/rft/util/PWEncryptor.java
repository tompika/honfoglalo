package rft.util;

import org.jasypt.util.password.ConfigurablePasswordEncryptor;
import org.springframework.security.crypto.password.PasswordEncoder;


public class PWEncryptor implements PasswordEncoder{
	private ConfigurablePasswordEncryptor passwordEncryptor;
			
	public PWEncryptor() {
		passwordEncryptor = new ConfigurablePasswordEncryptor();
		passwordEncryptor.setAlgorithm("SHA-1");
		passwordEncryptor.setPlainDigest(true);
	}


	@Override
	public String encode(CharSequence rawPassword) {
		return passwordEncryptor.encryptPassword(rawPassword.toString());
	}

	@Override
	public boolean matches(CharSequence rawPassword, String encodedPassword) {
		return passwordEncryptor.checkPassword(rawPassword.toString(), encodedPassword);
	}
}