package com.lsl.action;

import org.aspectj.asm.AsmManager.ModelInfo;

import com.lsl.entity.Employee;
import com.lsl.entity.FileDetile;
import com.lsl.entity.Leave;
import com.lsl.entity.Users;

public class FileDetileAction extends BasicAction<FileDetile>{

	
				public String show(){
					if(models.getFdId()==null||models.getFdId()<=0){
						modellist= fdb.getshow(0);
					}else{
						modellist= fdb.getshow(models.getFdId());
					}
					return SUCCESS;
				}
				
				
				public String getTrList(){
					modellist= fdb.getTrList();
					return SUCCESS;
				}
				
	            public String update(){
	            	models=fdb.getById(models.getFdId());
	            	models.setFIsDelete(0);
	            	fdb.update(models);
	            	modellist= fdb.getTrList();
	            	return SUCCESS;
	            }
	
	
}
