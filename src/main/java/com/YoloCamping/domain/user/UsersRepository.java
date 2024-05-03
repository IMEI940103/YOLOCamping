package com.YoloCamping.domain.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UsersRepository extends JpaRepository<Users, Long> {

    Optional<Users> findByEmail(String email); // 소셜로그인으로 반환되는 값 - email을 통해 기존회원인지 아닌지 판단.

}
