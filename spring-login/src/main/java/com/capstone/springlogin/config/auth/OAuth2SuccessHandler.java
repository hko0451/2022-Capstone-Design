package com.capstone.springlogin.config.auth;

import com.capstone.springlogin.config.auth.dto.OAuthAttributes;
import com.capstone.springlogin.config.auth.dto.Token;
import com.capstone.springlogin.config.auth.jwt.JwtManager;
import com.capstone.springlogin.model.Role;
import com.capstone.springlogin.model.User;
import com.capstone.springlogin.repository.UserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.filters.RemoteIpFilter;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.DefaultRedirectStrategy;
import org.springframework.security.web.RedirectStrategy;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RequiredArgsConstructor
@Slf4j
@Component
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtManager jwtManager;
    private final UserRepository userRepository;

    //private final RedirectStrategy redirectStrategy = new DefaultRedirectStrategy();

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication)
            throws IOException, ServletException {
        OAuth2User oAuth2User = (OAuth2User)authentication.getPrincipal();
        Map<String, Object> attributes = oAuth2User.getAttributes();


        User savedUser = saveOrUpdate(attributes);


        Token token = Token.builder()
                .accessToken(jwtManager.generateAccessToken(savedUser))
                .refreshToken(jwtManager.generateRefreshToken(savedUser))
                .build();

        log.info("{}", token);
        handle(request,response,authentication,token);
    }

    protected void handle(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication,
            Token token
    ) throws IOException {

        String targetUrl = determineTargetUrl(authentication);


        if (response.isCommitted()) {
            log.debug(
                    "Response has already been committed. Unable to redirect to "
                            + targetUrl);
            return;
        }

        HttpStatus targetStatus = HttpStatus.TEMPORARY_REDIRECT;
        String queryString = Optional.ofNullable(request.getQueryString()).orElseGet(String::new);

        response.setStatus(targetStatus.value());

        Cookie refreshToken = new Cookie("refreshToken", token.getRefreshToken());
        Cookie accessToken = new Cookie("accessToken", token.getAccessToken());
        refreshToken.setPath("/");
        accessToken.setPath("/");


        response.addCookie(refreshToken);
        response.addCookie(accessToken);
        response.setHeader("Location",targetUrl + queryString);
    }

    protected String determineTargetUrl(final Authentication authentication) {

        Map<String, String> roleTargetUrlMap = new HashMap<>();
        roleTargetUrlMap.put("ROLE_USER", "http://localhost:3001/oauth/redir");
        roleTargetUrlMap.put("ROLE_ADMIN", "http://localhost:3001/");

        final Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        for (final GrantedAuthority grantedAuthority : authorities) {
            String authorityName = grantedAuthority.getAuthority();
            if(roleTargetUrlMap.containsKey(authorityName)) {
                return roleTargetUrlMap.get(authorityName);
            }
        }

        throw new IllegalStateException();
    }

    private User saveOrUpdate(Map<String, Object> attributes){
        User SavedUser = userRepository.findByEmail((String) attributes.get("email"))
                .map(entity -> entity.update((String) attributes.get("name")))
                .orElse(User.builder()
                        .role(Role.USER)
                        .email((String) attributes.get("email"))
                        .username((String) attributes.get("name"))
                        .build());

        return userRepository.save(SavedUser);
    }

}
