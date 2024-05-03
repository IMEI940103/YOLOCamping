package com.YoloCamping.config.auth.dto;

import com.YoloCamping.domain.user.Users;
import lombok.Getter;

import java.io.Serializable;

@Getter
public class SessionUser implements Serializable {
    // 인증된 사용자 정보만 필요

    private String name;
    private String email;

    public SessionUser(Users users){
        this.name = users.getName();
        this.email = users.getEmail();
    }
}
