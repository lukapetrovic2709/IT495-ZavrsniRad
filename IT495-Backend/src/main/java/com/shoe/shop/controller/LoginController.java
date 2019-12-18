package com.shoe.shop.controller;


import com.shoe.shop.dto.LoggedInUserDTO;
import com.shoe.shop.dto.LoginDTO;
import com.shoe.shop.security.TokenUtils;
import com.shoe.shop.service.UserService;
import com.shoe.shop.util.ShoeShopException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import com.shoe.shop.model.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class LoginController {

    @Autowired
    AuthenticationManager authenticationManager;

    @Qualifier("userDetailsServiceImpl")
    @Autowired
    UserDetailsService userDetailsService;

    @Autowired
    UserService userService;

    @Autowired
    TokenUtils tokenUtils;

    @RequestMapping(value = "/login", method = RequestMethod.POST, consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> login(@RequestBody LoginDTO user) {
        try {
            UsernamePasswordAuthenticationToken token = new UsernamePasswordAuthenticationToken(user.getEmail(),
                    user.getPassword());
            Authentication authentication = authenticationManager.authenticate(token);
            SecurityContextHolder.getContext().setAuthentication(authentication);
            UserDetails details = userDetailsService.loadUserByUsername(user.getEmail());
            User userDb = userService.findByEmail(user.getEmail());
            LoggedInUserDTO loggedIn = new LoggedInUserDTO(userDb.getId(), tokenUtils.generateToken(details),
                    details.getUsername(), userDb.getEmail(), details.getAuthorities());
            if (!userDb.getIsActive()) {
                throw new ShoeShopException(HttpStatus.BAD_REQUEST, "Your account is deactivated!");
            }
            if(!userDb.getIsVerified()){
                throw new ShoeShopException(HttpStatus.BAD_REQUEST, "You must confirm email to login!");
            }
            return new ResponseEntity<>(loggedIn, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(ex.getMessage(),HttpStatus.BAD_REQUEST);
        }
    }
}
