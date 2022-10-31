package com.capstone.springlogin.config.auth.jwt;

import com.capstone.springlogin.model.Role;
import com.capstone.springlogin.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@Component
public class JwtManager {
    private final String securityKey= "CAPSTONE";
    private final long exTimeForRefresh= Duration.ofMinutes(30).toMillis();
    private final long exTimeForAcess= Duration.ofDays(14).toMillis();

    /**
     * RefreshToken 발급
     *
     * @param user
     * @return String RefreshToken
     */
    public String generateRefreshToken(User user){
        return generateJwtToken(user, exTimeForRefresh);
    }

    /**
     * AccessToken발급
     *
     * @param user
     * @return String Accesstoken
     */
    public String generateAccessToken(User user){
        return generateJwtToken(user, exTimeForAcess);
    }


    /**
     * JWT Token을 생성
     *
     * @param user
     * @return JWT token
     */
    public String generateJwtToken(User user, long expiredTime){
        Date now = new Date();
        return Jwts.builder()
                .setSubject(user.getUsername())
                .setHeader(createHeader())
                .setClaims(createClaims(user))
                .setExpiration(new Date(now.getTime() + expiredTime))
                .signWith(SignatureAlgorithm.HS256,securityKey)
                .compact();

    }

    /**
     * JWT token header 생성
     *
     * @return Map <String, Object> header
     */
    private Map<String, Object> createHeader(){
        Map<String, Object> header = new HashMap<>();
        header.put("typ", "JWT");
        header.put("alg","HS256");
        header.put("regDate", System.currentTimeMillis());
        return header;
    }

    /**
     * JWT token Claim 생성
     *
     * @param user
     * @return Map<String, Object> Claim </>
     */
    private Map<String, Object> createClaims(User user){
        Map<String, Object> claims = new HashMap<>();
        claims.put("username", user.getUsername());
        claims.put("email",user.getEmail());
        claims.put("roles", user.getRole());
        return claims;
    }

    /**
     * Token에서 claim 추출
     *
     * @param token
     * @return
     */
    private Claims getClaims(String token){
        return Jwts.parser().setSigningKey(securityKey).parseClaimsJws(token).getBody();

    }

    /**
     * Token에서 유저 이름 추출
     *
     * @param token
     * @return String username
     */
    public String getUsernameFromToken(String token){

        return (String) getClaims(token).get("username");
    }

    /**
     * Token에서 RoleType 추출
     *
     * @param token
     * @return Set <RoleType> RoleType
     */
    public Set<Role> getRolFromToken(String token){

        return (Set<Role>) getClaims(token).get("roles");
    }

    /**
     * Token에서 email 추출
     * @param token
     * @return String email
     */
    public String getEmailFromToken(String token) {
        return (String)getClaims(token).get("email");
    }

    /**
     * Token 검증
     * @param token
     * @return
     */
    public boolean verifyToken(String token){
        try {
            Jws<Claims> claims = Jwts.parser()
                    .setSigningKey(securityKey)
                    .parseClaimsJws(token);
            return claims.getBody()
                    .getExpiration()
                    .after(new Date());
        } catch (Exception e) {
            return false;
        }
    }


}
