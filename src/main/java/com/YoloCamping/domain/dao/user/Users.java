package com.YoloCamping.domain.dao.user;

import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@Getter
@NoArgsConstructor // 기본생성자 추가
@Entity // DB Table과 연결될 클래스 설정
public class Users {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) // Mysql의 auto_increment와 동일
    private Long userNo;

    @Column
    private int userType;

    @Column(nullable = false) //null 허용X
    private String userEmail;

    @Column
    private String userName;

    @Column
    private String userPhone;

    @Builder
    public Users(String userEmail, String userName){
        this.userEmail = userEmail;
        this.userName = userName;
    }


}
