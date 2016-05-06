package com.lemon.jee.modules.security.service;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.GrantedAuthorityImpl;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import com.lemon.jee.modules.common.model.SysRole;
import com.lemon.jee.modules.common.model.SysUser;
import com.lemon.jee.modules.common.repository.SysRoleRepository;
import com.lemon.jee.modules.common.repository.SysUserRepository;

public class MyUserDetailsService implements UserDetailsService {

	private static Logger log = LoggerFactory
			.getLogger(MyUserDetailsService.class);

	@Autowired
	private SysUserRepository sysUserRepository;

	@Autowired
	private SysRoleRepository sysRoleRepository;

	@SuppressWarnings("deprecation")
	public UserDetails loadUserByUsername(String username)
			throws UsernameNotFoundException {
		SysUser sysUser = sysUserRepository.findByAccount(username);
		if (null == sysUser) {
			log.info(username + "  不存在 ");
			throw new UsernameNotFoundException(username + "  不存在 ");
		}

		System.out.println("AAAAAAAAAAAAAAAAA : " + sysUser.getAccount());

		boolean enables = true;
		boolean accountNonExpired = true;
		boolean credentialsNonExpired = true;
		boolean accountNonLocked = true;

		List<GrantedAuthority> authsList = new ArrayList<GrantedAuthority>();

		// String roleName =
		// sysRoleRepository.findOne(Long.valueOf(sysUser.getRoleId())).getName();
		// authsList.add(new GrantedAuthorityImpl("ROLE_" +
		// Encodes.encodeBase64(roleName.getBytes())));
		List<SysRole> list = new ArrayList<SysRole>();
		list = sysUser.getRoles();
		for (int i = 0; i < list.size(); i++) {
			String roleName = list.get(i).getId().toString();
			authsList.add(new GrantedAuthorityImpl("ROLE_" + roleName));
			System.out.println("ROLE_" + roleName);
			// 目前在MultiDatabaseExample的User类中没有enabled,
			// accountNonExpired,credentialsNonExpired, accountNonLocked等属性
			// 暂时全部设为true,在需要时才添加这些属性.
			// enables = new Boolean(sysUser.getEnabled().toString());
		}
		authsList.add(new GrantedAuthorityImpl("ROLE_ALL"));
		int enable = sysUser.getEnabled();
		if (enable == 1) {
			enables = true;
		} else {
			enables = false;
		}
		// User userdetail = new User(sysUser.getAccount(),
		// sysUser.getPassword(), enables, accountNonExpired,
		// credentialsNonExpired, accountNonLocked,
		// authsList);
		User userdetails = new User(sysUser.getAccount(),
				sysUser.getPassword(), enables, accountNonExpired,
				credentialsNonExpired, accountNonLocked, authsList);
		return userdetails;
	}

}
