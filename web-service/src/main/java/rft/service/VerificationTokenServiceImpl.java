/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package rft.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import rft.dao.VerificationTokenService;
import rft.model.VerificationToken;

/**
 *
 * @author Szilvácsku Péter
 */
@Service
public class VerificationTokenServiceImpl {
    
    @Autowired
    VerificationTokenService dao;
    
    public VerificationToken findByToken(String token){
        return dao.findByToken(token);
    }
    
    public void save(VerificationToken token){
        dao.save(token);
    }
    
    boolean delete(long id){
        return dao.deleteById(id);
    }
    
}
