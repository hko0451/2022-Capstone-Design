package com.capstone.springlogin.config;

import com.capstone.springlogin.config.auth.CustomOAuth2UserService;
import com.capstone.springlogin.config.auth.OAuth2SuccessHandler;
import com.capstone.springlogin.config.auth.jwt.JwtAuthFilter;
import com.capstone.springlogin.config.auth.jwt.JwtManager;
import io.jsonwebtoken.Jwt;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@RequiredArgsConstructor
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final CustomOAuth2UserService oAuth2UserService;
    private final OAuth2SuccessHandler successHandler;

    private final JwtManager jwtManager;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.httpBasic().disable()
                .csrf().disable()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                    .authorizeRequests()
                        .anyRequest().authenticated()
                .and()
                    .oauth2Login()
                        .successHandler(successHandler)
                        .userInfoEndpoint()
                            .userService(oAuth2UserService);
        http.addFilterBefore(new JwtAuthFilter(jwtManager), UsernamePasswordAuthenticationFilter.class);
    }
}
