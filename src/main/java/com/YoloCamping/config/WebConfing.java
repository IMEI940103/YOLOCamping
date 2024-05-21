package com.YoloCamping.config;

import com.YoloCamping.config.auth.LoginUserArgumentResolver;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@RequiredArgsConstructor
@Configuration // 싱글톤 유지 및 설정파일을 만들기 위한 어노테이션 + 빈등록.
public class WebConfing implements WebMvcConfigurer { // LoginUserArgumentResolver 스프링에 인식되게끔 설정.

    private final LoginUserArgumentResolver loginUserArgumentResolver;

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers){
        resolvers.add(loginUserArgumentResolver);
    }

}
