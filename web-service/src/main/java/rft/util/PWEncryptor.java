package rft.util;

import org.jasypt.util.password.ConfigurablePasswordEncryptor;



public class PWEncryptor/* implements PasswordEncoder*/{
	private ConfigurablePasswordEncryptor passwordEncryptor;
			
	public PWEncryptor() {
		passwordEncryptor = new ConfigurablePasswordEncryptor();
		passwordEncryptor.setAlgorithm("SHA-1");
		passwordEncryptor.setPlainDigest(true);
	}


	public String getEncryptedPassword(String pw){
		return passwordEncryptor.encryptPassword(pw);
	}
	
	public boolean checkPassword(String plainPassword, String encryptedPassword){
		return passwordEncryptor.checkPassword(plainPassword, encryptedPassword);
	}
}