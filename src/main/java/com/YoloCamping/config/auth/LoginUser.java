package com.YoloCamping.config.auth;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.PARAMETER)
// 어노테이션이 생성될 수 있는 위치를 선정--> parameter
//메소드의 파라미터로 선언된 객체에서만 유효
@Retention(RetentionPolicy.RUNTIME)
// 어노테이션의 라이플 사이클 지정 --> Runtime까지 유효.
public @interface LoginUser { //@interface 어노테이션 클래스로 지정. *커스텀 어노테이션
}
