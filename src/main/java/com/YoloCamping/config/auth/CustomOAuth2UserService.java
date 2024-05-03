package com.YoloCamping.config.auth;

import com.YoloCamping.config.auth.dto.OAuthAttributes;
import com.YoloCamping.config.auth.dto.SessionUser;
import com.YoloCamping.domain.user.Users;
import com.YoloCamping.domain.user.UsersRepository;
import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.util.Collections;

import static org.json.XMLTokener.entity;

@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService implements OAuth2UserService<OAuth2UserRequest, OAuth2User> {

    private final UsersRepository usersRepository;
    private final HttpSession httpSession;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2UserService<OAuth2UserRequest, OAuth2User> delegate = new DefaultOAuth2UserService();
        OAuth2User oAuth2User = delegate.loadUser(userRequest);

        // 현재 로그인 진행중인 소셜을 구분하는 코드
        String registraionId = userRequest.getClientRegistration().getRegistrationId();

        // OAuth2 로그인 진행시 PK키
        // 구글의 기본코드 - sub
        String userNameAttributeName = userRequest.getClientRegistration().getProviderDetails().getUserInfoEndpoint().getUserNameAttributeName();

        //OAuth2UserService를 통해 가져온 OAuth2User의 Attibute를 담을 클래스
        OAuthAttributes attributes = OAuthAttributes.of(registraionId, userNameAttributeName, oAuth2User.getAttributes());
        Users users = saveOrUpdate(attributes);

        // session에 사용자정보 저장 --> sessionUser생성이유 : User Entity클래스와 타 클래스간의 관계성을 가질지 모르기에 직렬화기능을 가진 sessionUser클래스 생성.
        httpSession.setAttribute("user", new SessionUser(users));

        return new DefaultOAuth2User(
            Collections.singleton(new SimpleGrantedAuthority(users.getRoleKey())),
                attributes.getAttributes(),
                attributes.getNameAttributeKey()
        );
    }

    public Users saveOrUpdate(OAuthAttributes attributes){
        Users users = usersRepository.findByEmail(attributes.getEmail())
                .map(entity -> entity.update(attributes.getName()))
                .orElse(attributes.toEntity());

        return usersRepository.save(users);

    }


}
