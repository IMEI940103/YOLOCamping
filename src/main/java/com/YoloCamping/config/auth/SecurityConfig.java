package com.YoloCamping.config.auth;

import com.YoloCamping.domain.user.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.graphql.security.GraphQlWebMvcSecurityAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;


@RequiredArgsConstructor
@EnableJpaAuditing // 스프링 시큐리티 설정 활성화.
public class SecurityConfig extends GraphQlWebMvcSecurityAutoConfiguration {

    private final CustomOAuth2UserService customOAuth2UserService;

    protected void configure(HttpSecurity http) throws Exception{
        http
                .authorizeHttpRequests(//URL별 권한 관리를 설정하는 옵션의 시작점.
                        authorzeHttpRequests -> authorzeHttpRequests
                                        .requestMatchers("/admin/**").hasRole(Role.ADMIN.name())
                                        //.requestMatchers("/**").hasRole("USER")
                                .requestMatchers("/","/css/**","/images/**","js/**").permitAll()//모두사용가능
                                .anyRequest().permitAll()// 설정한 이외값들도 모두사용
                ) 
                .logout(
                        logout -> logout
                                    .deleteCookies("remove")
                                    .logoutSuccessUrl("/yolo")
                )
                .oauth2Login(
                        oauth2Login -> oauth2Login
                                        .defaultSuccessUrl("/yolo") //로그인 성공시 경로
                                        .failureUrl("/yolo") // 로그인 실패시 경로
                                        .userInfoEndpoint(
                                                userInfoEndpoint -> userInfoEndpoint
                                                                .userService(customOAuth2UserService)//소셜 로그인 성공시 후속조치를 실행할 인터페이스 구현체 설정.
                                        )
                );
                

    }
}
