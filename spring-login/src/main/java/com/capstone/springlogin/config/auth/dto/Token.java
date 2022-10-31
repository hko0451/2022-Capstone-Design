package com.capstone.springlogin.config.auth.dto;

import lombok.*;

@ToString
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Builder
public class Token {
    private String accessToken;
    private String refreshToken;

}
