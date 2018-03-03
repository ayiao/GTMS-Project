package cn.gtms.admin.controller;

import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;

import cn.gtms.BaseResponse;
import cn.gtms.admin.entity.AdminUser;
import cn.gtms.admin.service.AdminUserService;

@RestController
@RequestMapping(value = "/api/user")
public class UserInfoController {
	

	@Autowired
	protected AdminUserService adminUserService;
	
	
	@RequestMapping(value = "/login", method = RequestMethod.GET, produces = "application/json; charset=UTF-8")
	public ResponseEntity<String> login(HttpServletRequest httpServletRequest, HttpServletResponse response,
			Model model) {
		String account=httpServletRequest.getParameter("account");
		String password=httpServletRequest.getParameter("password");
		List<AdminUser> adminUsers= adminUserService.findByField("account", account);
		BaseResponse<AdminUser> responseObj=new BaseResponse<AdminUser>();
		if(adminUsers.isEmpty()){
			responseObj.setStatus("1");
			responseObj.setMessage("Account not exist!");
		}else if(!password.equals(adminUsers.get(0).getPassword())){
			responseObj.setStatus("1");
			responseObj.setMessage("Password not correct!");
		}else{
			AdminUser adminUser=adminUsers.get(0);
			adminUser.setPassword(null);
			responseObj.setStatus("0");
			responseObj.setOutput(adminUser);
		}
		response.setHeader("Access-Control-Allow-Origin", "*");
		return ResponseEntity.ok(JSON.toJSONString(responseObj));
	}
}
