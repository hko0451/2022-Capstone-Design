package com.capstone.springlogin.config.auth.dto;

import com.capstone.springlogin.model.User;
import lombok.Getter;

@Getter
public class SessionUser {
    private String name;
    private String email;

    public SessionUser(User user){
        this.name = user.getUsername();
        this.email = user.getEmail();
    }
}
