package com.YoloCamping.domain.user;

import com.YoloCamping.domain.BaseEntityTime;
import jakarta.persistence.*;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;



@Getter
@NoArgsConstructor
@Entity
public class Users extends BaseEntityTime {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String email;

    @Enumerated(EnumType.STRING) //JPA로 데이터저장시 Enum값을 어떤타입으로 저장할것인지 결정. 기본값 int
    @Column(nullable = false)
    private Role role;

    @Builder
    public Users(String name, String email, Role role){
        this.name = name;
        this.email = email;
        this.role = role;
    }

    public Users update(String name){
        this.name = name;

        return this;
    }

    public String getRoleKey() { return this.role.getKey(); }

}
