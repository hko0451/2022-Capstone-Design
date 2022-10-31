package com.capstone.springlogin.config.auth.jwt;

import com.capstone.springlogin.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.GenericFilterBean;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Arrays;

@RequiredArgsConstructor
public class JwtAuthFilter extends GenericFilterBean {
    private final JwtManager jwtManager;

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        String token = ((HttpServletRequest)request).getHeader("Auth");

        if (token != null && jwtManager.verifyToken(token)) {
            String email = jwtManager.getEmailFromToken(token);
            String name = jwtManager.getUsernameFromToken(token);

            User user = User.builder()
                    .email(email)
                    .username(name)
                    .build();

            Authentication auth = getAuthentication(user);
            SecurityContextHolder.getContext().setAuthentication(auth);
        }
//        else if{
//
//        }
//        else{
//
//        }

        chain.doFilter(request, response);
    }

    public Authentication getAuthentication(User member) {
        return new UsernamePasswordAuthenticationToken(member, "",
                Arrays.asList(new SimpleGrantedAuthority("ROLE_USER")));
    }
}

