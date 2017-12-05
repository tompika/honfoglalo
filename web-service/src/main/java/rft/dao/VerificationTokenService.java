/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rft.dao;

import rft.model.VerificationToken;

/**
 *
 * @author Szilvácsku Péter
 */
public interface VerificationTokenService {
    
    VerificationToken findByToken(String token); 
    boolean deleteById(long id);
    void save(VerificationToken token);
}
