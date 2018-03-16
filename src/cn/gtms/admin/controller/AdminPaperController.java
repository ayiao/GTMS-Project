package cn.gtms.admin.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.linkgoo.web.restful.controller.CURDController;

import cn.gtms.admin.entity.AdminPaper;
import cn.gtms.admin.service.AdminPaperService;

/**
 * Title: admin_paper
 *
 * Company: Copyright @ 2017 Linkgooç‰ˆæƒæ‰?æœ?
 *
 * @author: Linkgoo
 * @date: 2018-3-1 23:03:12
 * @version 1.0
 */
 
@RestController
@CrossOrigin(origins = "http://localhost:8080")
@RequestMapping(value = "/api/admin/adminpaper")
public class AdminPaperController extends
		CURDController<AdminPaper,AdminPaperService> {
	
}
