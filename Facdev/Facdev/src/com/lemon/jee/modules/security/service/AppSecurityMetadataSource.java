package com.lemon.jee.modules.security.service;

import com.lemon.jee.modules.common.model.SysRole;
import com.lemon.jee.modules.common.service.SysRoleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.access.ConfigAttribute;
import org.springframework.security.access.SecurityConfig;
import org.springframework.security.web.FilterInvocation;
import org.springframework.security.web.access.intercept.FilterInvocationSecurityMetadataSource;

import java.util.*;

/**
 * 最核心的地方，就是提供某个资源对应的权限定义，即getAttributes方法返回的结果。 此类在初始化时，应该取到所有资源及其对应角色的定义。
 */

public class AppSecurityMetadataSource implements FilterInvocationSecurityMetadataSource {

	private static Logger log = LoggerFactory.getLogger(AppSecurityMetadataSource.class);

	/* 保存资源和权限的对应关系 key-资源url value-权限 */
	public static Map<String, Collection<ConfigAttribute>> resourceMap = null;

	private SysRoleService sysRoleService;

	public SysRoleService getSysRoleService() {
		return sysRoleService;
	}

	public void setSysRoleService(SysRoleService sysRoleService) {
		this.sysRoleService = sysRoleService;
	}

	// private SysResourceService sysResourceService;
	//
	// public SysResourceService getSysResourceService() {
	// return sysResourceService;
	// }
	//
	// public void setSysResourceService(SysResourceService sysResourceService)
	// {
	// this.sysResourceService = sysResourceService;
	// }
	//
	// public AppSecurityMetadataSource(SysResourceService sysResourceService) {
	//
	// this.sysResourceService = sysResourceService;
	//
	// loadResourceAndRoleRelation();
	// }

	public AppSecurityMetadataSource(SysRoleService sysRoleService) {

		this.sysRoleService = sysRoleService;

		loadResourceAndRoleRelation();
	}

	/**
	 * 加载资源和权限的对应关系
	 */
	private void loadResourceAndRoleRelation() {

		resourceMap = new HashMap<String, Collection<ConfigAttribute>>();

		// List<SysResource> resources = sysResourceService.getAll();
		// for (SysResource sysResource : resources) {
		//
		// Collection<ConfigAttribute> atts = new ArrayList<ConfigAttribute>();
		// List<SysRole> roles =
		// sysResourceService.getRolesByResourceId(sysResource.getId());
		// for (SysRole sysRole : roles) {
		// atts.add(new SecurityConfig(sysRole.getCode()));
		// }
		// resourceMap.put(sysResource.getUrl(), atts);
		// }

		List<SysRole> sysRoles = sysRoleService.findAll();

		Collection<ConfigAttribute> atts = new ArrayList<ConfigAttribute>();
        for (SysRole sysRole : sysRoles) {
			// atts.add(new SecurityConfig("ROLE_" +
			// Encodes.encodeBase64(sysRole.getName().getBytes())));
            System.out.println("ROLE_" + sysRole.getId().toString());
            atts.add(new SecurityConfig("ROLE_" + sysRole.getId().toString()));
		}

        atts.add(new SecurityConfig("ROLE_ALL"));
		resourceMap.put("/**", atts);
		resourceMap.put("/common.jsp", atts);
		resourceMap.put("/admin", atts);
	}

	/**
	 * 根据请求的url,获取访问该url所需的权限
	 */
	public Collection<ConfigAttribute> getAttributes(Object object) throws IllegalArgumentException {

//		loadResourceAndRoleRelation();

		// object 是一个URL，被用户请求的url。
		// 获取请求的url地址
		String requestUrl = ((FilterInvocation) object).getRequestUrl();
		log.info("请求的 requestUrl :" + requestUrl);
		if (requestUrl.indexOf("?") != -1) {
			requestUrl = requestUrl.substring(0, requestUrl.indexOf("?"));
		}
		if (resourceMap.containsKey(requestUrl)) {
			log.info("已匹配 :" + requestUrl);
			return resourceMap.get(requestUrl);
		}
		else {
			return resourceMap.get("/**");
		}

//		 return null;
	}

	public boolean supports(Class<?> arg0) {
		return true;
	}

	public Collection<ConfigAttribute> getAllConfigAttributes() {
		return null;
	}

}
