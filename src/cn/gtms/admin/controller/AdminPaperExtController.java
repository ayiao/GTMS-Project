package cn.gtms.admin.controller;

import java.util.Date;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.linkgoo.framework.core.repository.SearchCriteria;
import com.linkgoo.framework.util.StringUtils2;
import com.linkgoo.web.extensions.MediaTypes;

import cn.gtms.BaseResponse;
import cn.gtms.admin.entity.AdminPaper;
import cn.gtms.admin.service.AdminPaperService;
import cn.gtms.constants.Constants;

@RestController
@CrossOrigin
@RequestMapping(value = "/api/admin/adminpaperext")
public class AdminPaperExtController {

	
	@Autowired
	protected AdminPaperService adminPaperService;
	
	@SuppressWarnings("rawtypes")
	@CrossOrigin
	@RequestMapping(value = "/save_paper", method = RequestMethod.POST, produces = MediaTypes.JSON)
	public ResponseEntity<String> savePaper(@RequestBody AdminPaper adminPaper,
			HttpServletRequest httpServletRequest, HttpServletResponse response, Model model) {	
		BaseResponse baseResponse=new BaseResponse<>();
		adminPaper.setUtcCreate(new Date());
		adminPaperService.save(adminPaper);
		baseResponse.setStatus(Constants.STATUS.SUCCESS);
		response.setHeader("Access-Control-Allow-Origin", "*");
		return ResponseEntity.ok(JSON.toJSONString(baseResponse, SerializerFeature.DisableCircularReferenceDetect));
	}
	
	@SuppressWarnings("rawtypes")
	@RequestMapping(value = "/update_paper", method = RequestMethod.POST, produces = MediaTypes.JSON)
	public ResponseEntity<String> updatePaper(@RequestBody AdminPaper adminPaper,
			HttpServletRequest httpServletRequest, HttpServletResponse response, Model model) {	
		BaseResponse baseResponse=new BaseResponse<>();
		adminPaper.setUtcUpdate(new Date());
		adminPaperService.update(adminPaper);
		baseResponse.setStatus(Constants.STATUS.SUCCESS);
		response.setHeader("Access-Control-Allow-Origin", "*");
		return ResponseEntity.ok(JSON.toJSONString(baseResponse, SerializerFeature.DisableCircularReferenceDetect));
	}
	
	@RequestMapping(value = "/find", method = RequestMethod.POST, produces = MediaTypes.JSON)
	public ResponseEntity<String> findPaper(@RequestBody Map<String,Object> parameter,
			HttpServletRequest httpServletRequest, HttpServletResponse response, Model model) {	
		BaseResponse<List<AdminPaper>> baseResponse=new BaseResponse<>();
		baseResponse.setOutput(adminPaperService.find(SearchCriteria.toList(parameter)));
		baseResponse.setStatus(Constants.STATUS.SUCCESS);
		response.setHeader("Access-Control-Allow-Origin", "*");
		return ResponseEntity.ok(JSON.toJSONString(baseResponse, SerializerFeature.DisableCircularReferenceDetect));
	}
	
	@RequestMapping(value = "/delete_paper", method = RequestMethod.POST, produces = MediaTypes.JSON)
	public ResponseEntity<String> deletePaper(@RequestBody Map<String,Object> parameter,
			HttpServletRequest httpServletRequest, HttpServletResponse response, Model model) {	
		BaseResponse<List<AdminPaper>> baseResponse=new BaseResponse<>();
		List<String> ids=StringUtils2.strToList(parameter.get("ids").toString(), ",");
		adminPaperService.removeAll(ids);
		baseResponse.setStatus(Constants.STATUS.SUCCESS);
		response.setHeader("Access-Control-Allow-Origin", "*");
		return ResponseEntity.ok(JSON.toJSONString(baseResponse, SerializerFeature.DisableCircularReferenceDetect));
	}
}
