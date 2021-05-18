package com.mobilous.mobileweb.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class TriggerController {

	@RequestMapping("/loadTriggers")
	@ResponseBody
	public void loadLocalDBTiggers(@PathVariable String projectid, @PathVariable String username, HttpServletRequest request,
			HttpServletResponse response){
		String baseURL = "http://" + request.getServerName() + "/";
		
	}
}
