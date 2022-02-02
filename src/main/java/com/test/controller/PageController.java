package com.test.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class PageController {

	@RequestMapping("/")
	public String main(Model model) {
		//return "index";
		return "home";
	}
	

	@RequestMapping("/home")
	public String home(Model model) {
		return "home";
	}
	
	
}
