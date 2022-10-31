package com.capstone.springlogin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestApi {

    @GetMapping("/test")
    public String index(){
        return "HelloWorld";
    }
    @GetMapping("/test2")
    public String test(){
        return "";
    }

}
