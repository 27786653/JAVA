package com.project.entitys;

import java.util.Date;

import com.project.common.DateFormat;

public class Notice {
    private Integer nId;

    private String nContent;

    private String nTitle;

    private Integer nUsers;

    private Date nCreatetime;

    private Integer nState;

    public Integer getnId() {
        return nId;
    }

    public void setnId(Integer nId) {
        this.nId = nId;
    }

    public String getnContent() {
        return nContent;
    }

    public void setnContent(String nContent) {
        this.nContent = nContent == null ? null : nContent.trim();
    }

    public String getnTitle() {
        return nTitle;
    }

    public void setnTitle(String nTitle) {
        this.nTitle = nTitle == null ? null : nTitle.trim();
    }

    public Integer getnUsers() {
        return nUsers;
    }

    public void setnUsers(Integer nUsers) {
        this.nUsers = nUsers;
    }

    
	public String getnCreatetimeformat(){
	return 	DateFormat.getDateFormat(nCreatetime);
	}    
    public Date getnCreatetime() {
        return nCreatetime;
    }

    public void setnCreatetime(Date nCreatetime) {
        this.nCreatetime = nCreatetime;
    }

    public Integer getnState() {
        return nState;
    }

    public void setnState(Integer nState) {
        this.nState = nState;
    }
}