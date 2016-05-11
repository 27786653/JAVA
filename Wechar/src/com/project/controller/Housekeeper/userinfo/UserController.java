package com.project.controller.Housekeeper.userinfo;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.alibaba.fastjson.JSON;
import com.google.gson.Gson;
import com.project.common.BaseController;
import com.project.common.data.jsonData;
import com.project.dao.UsersMapper;
import com.project.entitys.Users;
import com.project.entitys.UsersExample;


@Controller
public class UserController {

	@Resource
	UsersMapper usersMapper;
	private String gotopage;
	private String info;
	private jsonData jsondata;
	
	
	@RequestMapping("/dologin")
	@ResponseBody
	public jsonData dologin(Users user){
		System.out.println("dologin");
		UsersExample usersExample=new UsersExample();
		usersExample.createCriteria().andUNameEqualTo(user.getuName());
		List<Users> userlist = usersMapper.selectByExample(usersExample);
		if(userlist!=null&&userlist.size()>0){
			if(userlist.get(0).getuPwd().equals(user.getuPwd())){
				gotopage="execute.action?path=Community/Communitymanagement";
				info="登录成功,进入会员中心";
			}else{
				info="密码错误,请输入新密码";
			}
		}else{
			info="账户不存在,请先注册！";
		}
		 jsondata = jsonData.getjsondata(info, "y", "3000", gotopage, null);   //这个方法就是得到一个对象
		return jsondata;
	}
	
	
	@RequestMapping("/regist")
	public jsonData regist(Users user){
		jsondata = jsonData.getjsondata(info, "y", "3000", gotopage, null);
			return jsondata;
	}
	
	@ResponseBody
		@RequestMapping(value="uploadimages",method=RequestMethod.POST)
		public String uploadimages(HttpServletRequest req, ModelMap map) throws IllegalStateException, IOException{
		
			if(req instanceof MultipartHttpServletRequest){
		    	MultipartFile pictureFile=	((MultipartHttpServletRequest) req).getMultiFileMap().getFirst("pictureFile");
				String pictureFile_name =  pictureFile.getOriginalFilename();
				String newFileName = UUID.randomUUID().toString()+pictureFile_name.substring(pictureFile_name.lastIndexOf("."));
				File uploadPic = new java.io.File("F:\\pic\\tmp\\"+newFileName);   //修改新名称
				if(!uploadPic.exists()){   //判断文件路径是否存在
					uploadPic.mkdirs();      //不存在即创建
				}
				pictureFile.transferTo(uploadPic);   	//向磁盘写文件
//				map.put("pic", newFileName);          //把文件的名称返回给页面
			}else{
				System.out.println("不是正确的访问类型");
			}
			return "上传成功";
		}
	
	
}
