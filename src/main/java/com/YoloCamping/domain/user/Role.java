package com.YoloCamping.domain.user;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {
    /*
     *   enum클래스의 특징
     *       1. 열거형으로 선언된 순서에 따라 0부터 index값을 가진다.(순차적증가)
     *       2. 열거형으로 지정된 상수들은 모두 대문자로 선언한다.
     *       3. 열거형 변수들을 선언한수 마지막에 (;)을 찍지않는다.
     *       4. 상수와 특정값을 연결 시킬경우 마지막에 ; 을 붙여줘야한다.
     * */

    // 스프링 시큐리티에서는 권한코드에 항상 ROLE_ 이 앞에있어야함.
    USER("ROLE_USER","일반 사용자"),
    ADMIN("ROLE_ADMIN","캠핑 관리자");

    private final String key;
    private final String title;
}
