package com.YoloCamping.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.concurrent.TimeUnit;

@Configuration
public class MvcConfiguration implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(final ResourceHandlerRegistry registry) {
        registry.addResourceHandler("/**") // /시작하는 모든요청을 다룸
                .addResourceLocations("classpath:/templates/","classpath:/static/") // 요청을 처리할 자원을 찾을 위치설정
                .setCacheControl(CacheControl.maxAge(10, TimeUnit.MINUTES));// 요청에 관한 Cache 10분으로 설정
    }

}
