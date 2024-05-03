package com.YoloCamping.domain;

import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDate;

@Getter
@MappedSuperclass // JPA Entity클래스가 해당 클래스를 상속할경우 해당클래스의 필드들도 칼럼으로 인식.
@EntityListeners(AuditingEntityListener.class) //Auditing기능 포함.
public abstract class BaseEntityTime {

    @CreatedDate //Entity가 생성되어 저장될때 시간.
    private LocalDate createedDate;

    @LastModifiedDate //조회한 Entity가 수정되어 저장될때의 시간.
    private LocalDate modifiedDate;

}
